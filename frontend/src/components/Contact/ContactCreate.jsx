import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { contactCreate } from "../../lib/api/ContactApi.js";
import { alertError, alertSucces } from "../../lib/alert.js";
import { FormHeader } from "../common/Form/FormHeader.jsx";
import { FormContainer } from "../common/Form/FormContainer.jsx";
import { FormInput } from "../common/Form/FormInput.jsx";
import { FormActions } from "../common/Form/FormActions.jsx";

export default function ContactCreate() {
    const [token] = useLocalStorage("token", "");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await contactCreate(token, formData);
        const responseBody = await response.json();

        if (response.status === 200) {
            await alertSucces("Contact created successfully");
            navigate("/dashboard/contacts");
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            await alertError(responseBody.errors);
        }
    }

    return (
        <main className="container mx-auto px-4 py-8 flex-grow">
            <FormHeader
                title="Create New Contact"
                backLink="/dashboard/contacts"
                icon="user-plus"
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

                    <FormActions
                        cancelLink="/dashboard/contacts"
                        submitText="Create Contact"
                        submitIcon="plus-circle"
                    />
                </form>
            </FormContainer>
        </main>
    );
}