import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { contactDetail } from "../../lib/api/ContactApi.js";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertConfirm, alertError, alertSucces } from "../../lib/alert.js";
import { addressDelete, addressList } from "../../lib/api/AddressApi.js";
import { DetailHeader } from "../common/Header/DetailHeader.jsx";
import { DetailCard } from "../common/Card/DetailCard.jsx";
import { AddCard } from "../common/Card/AddCard.jsx";
import { AddressCard } from "../common/Card/AddressCard.jsx";


export default function ContactDetail() {
    const [token] = useLocalStorage("token", "");
    const { id } = useParams();
    const [contact, setContact] = useState({});
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    async function fetchAddresses() {
        const response = await addressList(token, id);
        const responseBody = await response.json();

        if (response.status === 200) {
            setAddresses(responseBody.data);
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            alertError(responseBody.errors);
        }
    }

    async function fetchContact() {
        const response = await contactDetail(token, id);
        const responseBody = await response.json();

        if (response.status === 200) {
            setContact(responseBody.data);
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            alertError(responseBody.errors);
        }
    }

    async function handleDeleteAddress(addressId) {
        if (!await alertConfirm("Are you sure you want to delete this address?")) {
            return;
        }
        const response = await addressDelete(token, id, addressId);
        const responseBody = await response.json();

        if (response.status === 200) {
            alertSucces("Address deleted successfully");
            fetchAddresses();
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            alertError(responseBody.errors);
        }
    }

    useEffectOnce(() => {
        fetchContact();
        fetchAddresses();
    });

    return (
        <>
            <DetailHeader
                backLink="/dashboard/contacts"
                title="Contact Details"
                icon="id-card"
            />

            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                <div className="p-8">
                    {/* Contact Header */}
                    <div className="mb-8 text-center">
                        <div className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
                            <i className="fas fa-user text-3xl text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {contact.first_name} {contact.last_name}
                        </h2>
                        <div className="w-24 h-1 bg-gradient mx-auto rounded-full" />
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-5 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <DetailCard
                                icon="user-tag"
                                label="First Name"
                                value={contact.first_name}
                            />
                            <DetailCard
                                icon="user-tag"
                                label="Last Name"
                                value={contact.last_name}
                            />
                        </div>
                        <DetailCard
                            icon="envelope"
                            label="Email"
                            value={contact.email}
                        />
                        <DetailCard
                            icon="phone"
                            label="Phone"
                            value={contact.phone}
                        />
                    </div>

                    {/* Addresses Section */}
                    <div className="mb-8">
                        <div className="flex items-center mb-5">
                            <i className="fas fa-map-marker-alt text-blue-400 mr-3" />
                            <h3 className="text-xl font-semibold text-white">Addresses</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <AddCard
                                to={`/dashboard/contacts/${id}/addresses/create`}
                                title="Add Address"
                                icon="plus"
                            />
                            {addresses.map(address => (
                                <AddressCard
                                    key={address.id}
                                    address={address}
                                    contactId={id}
                                    onDelete={handleDeleteAddress}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Link
                            to="/dashboard/contacts"
                            className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
                        >
                            <i className="fas fa-arrow-left mr-2" /> Back
                        </Link>
                        <Link
                            to={`/dashboard/contacts/${id}/edit`}
                            className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
                        >
                            <i className="fas fa-user-edit mr-2" /> Edit Contact
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}