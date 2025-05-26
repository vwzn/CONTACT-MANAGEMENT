import { Link } from "react-router";

export function FormActions({ cancelLink, submitText = "Save", submitIcon = "save" }) {
    return (
        <div className="flex justify-end space-x-4">
            <Link
                to={cancelLink}
                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
            >
                <i className="fas fa-times mr-2" /> Cancel
            </Link>
            <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
            >
                <i className={`fas fa-${submitIcon} mr-2`} /> {submitText}
            </button>
        </div>
    );
}