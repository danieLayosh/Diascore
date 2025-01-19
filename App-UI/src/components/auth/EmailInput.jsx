import PropTypes from 'prop-types';

const EmailInput = ({ value, onChange }) => {
    return (
        <div className="relative mt-4">
            <input
                placeholder="E-mail"
                id="email"
                name="email"
                type="email"
                value={value}
                onChange={onChange}
                className="w-full bg-white border-none p-4 pr-12 rounded-3xl shadow-[0px_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-[#12b1d1] border-transparent"
                required
                autoComplete="email"
            />
            <button
                type="button"
                className="absolute top-0 bottom-0 right-0 flex items-center pr-4 focus:outline-none"
                disabled
            >
                <svg
                    className="text-gray-400 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
};

EmailInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default EmailInput;