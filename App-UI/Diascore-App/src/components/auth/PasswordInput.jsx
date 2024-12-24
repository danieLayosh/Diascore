import PropTypes from 'prop-types';

const PasswordInput = ({ value, onChange, showPassword, onToggleVisibility }) => {
    return (
        <div className="relative mt-4">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={value}
                onChange={onChange}
                className="w-full bg-white border-none p-4 pr-12 rounded-3xl shadow-[0px_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-[#12b1d1] border-transparent"
                required
                autoComplete="current-password"
            />
            <button
                type="button"
                onClick={onToggleVisibility}
                className="absolute top-0 bottom-0 right-0 flex items-center pr-4 focus:outline-none"
            >
                <svg
                    className="text-gray-400 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {showPassword ? (
                        <path
                            d="M12 6c-3.5 0-6.6 1.5-8.7 4.1-1.1 1.5-1.1 3.5 0 5 2.1 2.6 5.2 4.1 8.7 4.1s6.6-1.5 8.7-4.1c1.1-1.5 1.1-3.5 0-5C18.6 7.5 15.5 6 12 6zm0 7.6c-1.7 0-3.2-1.3-3.2-3s1.3-3 3.2-3 3.2 1.3 3.2 3-1.4 3-3.2 3z"
                            strokeWidth={2}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    ) : (
                        <path
                            d="M12 6c-3.5 0-6.6 1.5-8.7 4.1-1.1 1.5-1.1 3.5 0 5 2.1 2.6 5.2 4.1 8.7 4.1s6.6-1.5 8.7-4.1c1.1-1.5 1.1-3.5 0-5C18.6 7.5 15.5 6 12 6zm0 7.6c-1.7 0-3.2-1.3-3.2-3s1.3-3 3.2-3 3.2 1.3 3.2 3-1.4 3-3.2 3z"
                            strokeWidth={2}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    )}
                </svg>
            </button>
        </div>
    );
};

PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    showPassword: PropTypes.bool.isRequired,
    onToggleVisibility: PropTypes.func.isRequired,
};

export default PasswordInput;