import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { contactDetail, contactUpdate } from "../../lib/api/ContactApi.js";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSucces } from "../../lib/alert.js";
import { FormHeader } from "../common/Form/FormHeader.jsx";
import { FormContainer } from "../common/Form/FormContainer.jsx";
import { FormInput } from "../common/Form/FormInput.jsx";
import { FormActions } from "../common/Form/FormActions.jsx";


export default function ContactEdit() {
    const [token] = useLocalStorage("token", "");
    const { id } = useParams();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function fetchContact() {
        const response = await contactDetail(token, id);
        const responseBody = await response.json();

        if (response.status === 200) {
            setFormData(responseBody.data);
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            alertError(responseBody.errors);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await contactUpdate(token, { id, ...formData });
        const responseBody = await response.json();

        if (response.status === 200) {
            alertSucces("Contact Updated Successfully");
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            alertError(responseBody.errors);
        }
    }

    useEffectOnce(() => {
        fetchContact();
    });

    return (
        <>
            <FormHeader
                title="Edit Contact"
                backLink="/dashboard/contacts"
                icon="user-edit"
            />

            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <FormInput
                            id="first_name"
                            label="First Name"
                            icon="user-tag"
                            placeholder="Enter first name"
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="last_name"
                            label="Last Name"
                            icon="user-tag"
                            placeholder="Enter last name"
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <FormInput
                        id="email"
                        label="Email"
                        icon="envelope"
                        type="email"
                        placeholder="Enter email address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mb-5"
                    />

                    <FormInput
                        id="phone"
                        label="Phone"
                        icon="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="mb-6"
                    />

                    <FormActions cancelLink="/dashboard/contacts" />
                </form>
            </FormContainer>
        </>
    );
}