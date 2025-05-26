import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { contactList, contactDelete } from "../../lib/api/ContactApi.js";
import { alertConfirm, alertError, alertSucces } from "../../lib/alert.js";
import { useNavigate } from "react-router";
import { SearchForm } from "../common/Search/SearchForm.jsx";
import { CreateContactCard } from "../common/Card/CreateContactCard.jsx";
import { Pagination } from "../common/Pagination/Pagination.jsx";
import { ContactCard } from "../common/Card/ContactCard.jsx";


export default function ContactList() {
    const [token] = useLocalStorage("token", "");
    const [searchParams, setSearchParams] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [contacts, setContacts] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (params) => {
        setSearchParams(params);
        setPage(1);
        setReload(!reload);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setReload(!reload);
    };

    async function fetchContacts() {
        const response = await contactList(token, { ...searchParams, page });
        const responseBody = await response.json();

        if (response.status === 200) {
            setContacts(responseBody.data);
            setTotalPage(responseBody.paging.total_page);
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            alertError(responseBody.errors);
        }
    }

    async function handleContactDelete(id) {
        if (!await alertConfirm("Are you sure you want to delete this contact?")) {
            return;
        }

        const response = await contactDelete(token, id);
        const responseBody = await response.json();

        if (response.status === 200) {
            await alertSucces("Contact deleted successfully");
            setReload(!reload);
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            alertError(responseBody.errors);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, [reload]);

    return (
        <>
            <div className="flex items-center mb-6">
                <i className="fas fa-users text-blue-400 text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-white">My Contacts</h1>
            </div>

            <SearchForm 
                onSearch={handleSearch} 
                initialValues={searchParams}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CreateContactCard />
                
                {contacts.map((contact) => (
                    <ContactCard 
                        key={contact.id} 
                        contact={contact} 
                        onDelete={handleContactDelete}
                    />
                ))}
            </div>

            <Pagination 
                currentPage={page}
                totalPages={totalPage}
                onPageChange={handlePageChange}
            />
        </>
    );
}