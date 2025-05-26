import { Link } from "react-router";

export function FormHeader({ title, backLink, icon }) {
    return (
        <div className="flex items-center mb-6">
            <Link to={backLink} className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2" /> Back
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center">
                <i className={`fas fa-${icon} text-blue-400 mr-3`} /> {title}
            </h1>
        </div>
    );
}