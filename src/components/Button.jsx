// This file is a reusable button component for the project.

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                px-4 py-2 rounded-lg font-medium
                shadow-md transition-all duration-200
                hover:scale-105 hover:brightness-110
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
                ${bgColor} ${textColor} ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
