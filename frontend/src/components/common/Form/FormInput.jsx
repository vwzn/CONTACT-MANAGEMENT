export function FormInput({
    id,
    label,
    icon,
    type = "text",
    placeholder,
    required = false,
    value,
    onChange,
    className = ""
}) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-gray-300 text-sm font-medium mb-2">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className={`fas fa-${icon} text-gray-500`} />
                </div>
                <input
                    type={type}
                    id={id}
                    name={id}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}