import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { contactDetail } from "../../lib/api/ContactApi.js";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSucces } from "../../lib/alert.js";
import { addressDetail, addressUpdate } from "../../lib/api/AddressApi.js";
import { FormHeader } from "../common/Form/FormHeader.jsx";
import { FormContainer } from "../common/Form/FormContainer.jsx";
import { FormInput } from "../common/Form/FormInput.jsx";
import { FormActions } from "../common/Form/FormActions.jsx";
import { ContactHeader } from "../common/Header/ContactHeader.jsx";
;

export default function AddressEdit() {
    const { id, addressId } = useParams();
    const [token] = useLocalStorage("token", "");
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
        const response = await addressUpdate(token, id, {
            addressId,
            ...formData
        });
        const responseBody = await response.json();

        if (response.status === 200) {
            alertSucces("Address updated successfully");
            navigate(`/dashboard/contacts/${id}`);
        } else if (response.status === 401) {
            navigate("/login");
        } else {
            alertError(responseBody.errors);
        }
    }

    async function fetchAddress() {
        const response = await addressDetail(token, id, addressId);
        const responseBody = await response.json();

        if (response.status === 200) {
            setFormData({
                street: responseBody.data.street,
                city: responseBody.data.city,
                province: responseBody.data.province,
                country: responseBody.data.country,
                postal_code: responseBody.data.postal_code
            });
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

    useEffectOnce(() => {
        fetchContact();
        fetchAddress();
    });

    return (
        <>
            <FormHeader
                backLink={`/dashboard/contacts/${id}`}
                title="Edit Address"
                icon="map-marker-alt"
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
                        submitText="Save Changes"
                        submitIcon="save"
                    />
                </form>
            </FormContainer>
        </>
    );
}