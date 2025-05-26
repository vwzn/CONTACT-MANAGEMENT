import { Link } from "react-router";
import { DetailRow } from "../Row/DetailRow";

export function AddressCard({ address, contactId, onDelete }) {
    return (
        <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover">
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <i className="fas fa-home text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white">Home Address</h4>
            </div>
            <div className="space-y-3 text-gray-300 ml-2 mb-4">
                <DetailRow icon="road" label="Street" value={address.street} />
                <DetailRow icon="city" label="City" value={address.city} />
                <DetailRow icon="map" label="Province" value={address.province} />
                <DetailRow icon="flag" label="Country" value={address.country} />
                <DetailRow icon="mail-bulk" label="Postal Code" value={address.postal_code} />
            </div>
            <div className="flex justify-end space-x-3">
                <Link
                    to={`/dashboard/contacts/${contactId}/addresses/${address.id}/edit`}
                    className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                >
                    <i className="fas fa-edit mr-2" /> Edit
                </Link>
                <button
                    onClick={() => onDelete(address.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                >
                    <i className="fas fa-trash-alt mr-2" /> Delete
                </button>
            </div>
        </div>
    );
}