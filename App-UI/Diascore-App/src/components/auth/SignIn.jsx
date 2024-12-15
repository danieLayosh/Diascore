import { useState } from 'react';
import PropTypes from 'prop-types';
import { auth, googleProvider } from '../../firebase/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignIn = ({ onClose }) => {
    const [authLoading, setAuthLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setAuthLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const existingMethods = await fetchSignInMethodsForEmail(auth, user.email);

            if (existingMethods.length > 0 && !existingMethods.includes('google.com')) {
                alert(
                    'An account already exists with this email using a different method. Please sign in with your email and password, then link your Google account from the settings.'
                );
            } else {
                alert('Signed in successfully with Google!');
                navigate('/home');
                onClose(); // Close the popup after successful login
            }
        } catch (error) {
            console.error('Error during Google login:', error.message);

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    alert('Google login was canceled. Please try again.');
                    break;
                case 'auth/credential-already-in-use':
                    alert(
                        'This Google account is already linked with another account. Please use the correct provider to log in.'
                    );
                    break;
                case 'auth/network-request-failed':
                    alert('Network error. Please check your internet connection and try again.');
                    break;
                default:
                    alert(`An unexpected error occurred: ${error.message}`);
                    break;
            }
        } finally {
            setAuthLoading(false);
        }
    };

    const handleAuth = async () => {
        setAuthLoading(true);
        try {
            if (isSignUp) {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(result.user);
                alert('Verification email sent! Please check your inbox.');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Signed in successfully!');
                navigate('/home');
                onClose(); // Close the popup after successful login
            }
        } catch (error) {
            console.error('Error during email/password auth:', error.message);

            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('This email is already in use. Please use another email.');
                    break;
                case 'auth/invalid-email':
                    alert('Invalid email format. Please try again.');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password. Please try again.');
                    break;
                case 'auth/user-not-found':
                    alert('No user found with this email. Please sign up first.');
                    break;
                case 'auth/weak-password':
                    alert('Password is too weak. Please choose a stronger password.');
                    break;
                default:
                    alert(`An unexpected error occurred: ${error.message}`);
                    break;
            }
        } finally {
            setAuthLoading(false);
        }
    };

    return (
        <div className="max-w-sm bg-gradient-to-t from-white to-[#f4f7fb] rounded-3xl p-8 border-4 border-white shadow-xl mx-0">
            <div className="text-center text-3xl font-extrabold text-[#1089d3]">{isSignUp ? 'Sign Up' : 'Sign In'}</div>
            <form className="mt-5" onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
                <input
                    placeholder="E-mail"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border-none p-4 rounded-3xl mt-4 shadow-[0px_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-[#12b1d1] border-transparent"
                    required
                />
                <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border-none p-4 rounded-3xl mt-4 shadow-[0px_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-[#12b1d1] border-transparent"
                    required
                />
                <span className="block mt-3 ml-2">
                    <a href="#" className="text-[#0099ff] text-xs">Forgot Password ?</a>
                </span>
                <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full font-bold bg-gradient-to-br from-[#1089d3] to-[#12b1d1] text-white py-4 my-5 rounded-3xl shadow-[0px_20px_10px_-15px_rgba(133,189,215,0.8784313725)] transition-all ease-in-out hover:scale-105 active:scale-95 disabled:bg-gray-500"
                >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <div className="mt-7">
                <span className="block text-center text-xs text-[#aaa]">Or Sign in with</span>
                <div className="flex justify-center gap-4 mt-2">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={authLoading}
                        className="bg-gradient-to-br from-black to-[#707070] border-4 border-white p-1 rounded-full w-10 h-10 grid place-content-center shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)] transition-all ease-in-out hover:scale-110 active:scale-95 disabled:bg-gray-500"
                    >
                        <svg
                            viewBox="0 0 488 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-white m-auto"
                        >
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                        </svg>
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsSignUp((prev) => !prev)}
                        className="text-blue-400 hover:text-blue-500 text-sm transition-all duration-200"
                    >
                        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

SignIn.propTypes = {
    onClose: PropTypes.func.isRequired,
};