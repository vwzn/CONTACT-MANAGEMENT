import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { contactDetail } from "../../lib/api/ContactApi.js";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSucces } from "../../lib/alert.js";
import { addressCreate } from "../../lib/api/AddressApi.js";
import { FormHeader } from './../common/Form/FormHeader';
import { FormContainer } from './../common/Form/FormContainer';
import { FormInput } from './../common/Form/FormInput';
import { FormActions } from './../common/Form/FormActions';
import { ContactHeader } from "../common/Header/ContactHeader.jsx";


export default function AddressCreate() {
    const [token] = useLocalStorage("token", "");
    const { id } = useParams();
    const [contact, setContact] = useState({});
    const [formData, setFormData] = useState({
        street: "",
        city: "",
        province: "",
        country: "",
        postal_code: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await addressCreate(token, id, formData);
        const responseBody = await response.json();

        if (response.status === 200) {
            await alertSucces("Address created successfully");
            navigate(`/dashboard/contacts/${id}`);
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            await alertError(responseBody.errors);
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
            await alertError(responseBody.errors);
        }
    }

    useEffectOnce(() => {
        fetchContact();
    });

    return (
        <>
            <FormHeader
                backLink={`/dashboard/contacts/${id}`}
                title="Add New Address"
                icon="plus-circle"
            />

            <FormContainer>
                <ContactHeader contact={contact} backLink={`/dashboard/contacts/${id}`} />

                <form onSubmit={handleSubmit}>
                    <FormInput
                        id="street"
                        label="Street"
                        icon="road"
                        placeholder="Enter street address"
                        required
                        value={formData.street}
                        onChange={handleChange}
                        className="mb-5"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <FormInput
                            id="city"
                            label="City"
                            icon="city"
                            placeholder="Enter city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="province"
                            label="Province/State"
                            icon="map"
                            placeholder="Enter province or state"
                            required
                            value={formData.province}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <FormInput
                            id="country"
                            label="Country"
                            icon="flag"
                            placeholder="Enter country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                        />
                        <FormInput
                            id="postal_code"
                            label="Postal Code"
                            icon="mail-bulk"
                            placeholder="Enter postal code"
                            required
                            value={formData.postal_code}
                            onChange={handleChange}
                        />
                    </div>

                    <FormActions
                        cancelLink={`/dashboard/contacts/${id}`}
                        submitText="Add Address"
                        submitIcon="plus-circle"
                    />
                </form>
            </FormContainer>
        </>
    );
}