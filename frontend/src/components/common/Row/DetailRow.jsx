export function DetailRow({ icon, label, value }) {
    return (
        <p className="flex items-center">
            <i className={`fas fa-${icon} text-gray-500 w-6`} />
            <span className="font-medium w-24">{label}:</span>
            <span>{value}</span>
        </p>
    );
}