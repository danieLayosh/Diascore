import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    onAuthStateChanged,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import useAlert from '../../context/useAlert';
import { addUserDoc, updateDisplayName } from '../../firebase/firestore/users';

const SignIn = ({ onClose = () => {}, isSignUp: initialIsSignUp = false }) => {
    const [authLoading, setAuthLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const { showAlert } = useAlert(); // Use showAlert from context
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate('/Home'); 
            } else {
                navigate('/welcome'); 
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleGoogleLogin = async () => {
        setAuthLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const existingMethods = await fetchSignInMethodsForEmail(auth, user.email);

            await updateDisplayName(user);
            console.log('User data updated successfully!');

            if (existingMethods.length > 0 && !existingMethods.includes('google.com')) {
                await signInWithEmailAndPassword(auth, user.email, password);
                await user.linkWithPopup(googleProvider);
                showAlert('Google account linked successfully!', 'success'); 
            } else {
                showAlert('Signed in successfully with Google!', 'success'); 
            }

            navigate('/welcome');
        } catch (error) {
            console.error('Error during Google login:', error.message);
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    showAlert('Google login was canceled. Please try again.', 'warning'); 
                    break;
                case 'auth/credential-already-in-use':
                    showAlert('This Google account is already linked with another account. Please use the correct provider to log in.', 'error'); 
                    break;
                case 'auth/network-request-failed':
                    showAlert('Network error. Please check your internet connection and try again.', 'error'); 
                    break;
                default:
                    showAlert(`An unexpected error occurred: ${error.message}`, 'error'); 
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
                // TODO Make sure the user verifiy their email before signing up
                
                await addUserDoc(result.user);

                showAlert('Verification email sent! Please check your inbox.', 'success', 10000); 
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                showAlert('Signed in successfully!', 'success'); 
                navigate('/Home');
                onClose();
            }
        } catch (error) {
            console.error('Error during email/password auth:', error.message);

            switch (error.code) {
                case 'auth/email-already-in-use':
                    showAlert('This email is already in use. Please use another email.', 'error'); 
                    break;
                case 'auth/invalid-email':
                    showAlert('Invalid email format. Please try again.', 'warning'); 
                    break;
                case 'auth/wrong-password':
                    showAlert('Incorrect password. Please try again.', 'error'); 
                    break;
                case 'auth/user-not-found':
                    showAlert('No user found with this email. Please sign up first.', 'error'); 
                    break;
                case 'auth/weak-password':
                    showAlert('Password is too weak. Please choose a stronger one.', 'error'); 
                    break;
                default:
                    showAlert(`An unexpected error occurred: ${error.message}`, 'error'); 
                    break;
            }
        } finally {
            setAuthLoading(false);
        }
    };

    return (
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-gradient-to-t from-white to-[#f4f7fb] rounded-3xl p-8 border-4 border-white shadow-xl mx-0">
            <div className="text-center text-3xl font-extrabold text-[#1089d3]">{isSignUp ? 'Sign Up' : 'Sign In'}</div>
            <form className="mt-5" onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordInput
                    value={password}
                    onChange={handlePasswordChange}
                    showPassword={showPassword}
                    onToggleVisibility={handlePasswordVisibility}
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
                        className="bg-gradient-to-br from-black to-[#707070] border-4 border-white p-1 rounded-full w-10 h-10 grid place-content-center shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)] transition-all ease-in-out hover:scale-110 active:scale-95 disabled:bg-gray-500 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                    >
                        <svg
                            viewBox="0 0 488 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-white m-auto"
                        >
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.8 135-70.8 0 15.2-13.4 33.2-30.3 33.2-25.2 0-41.5-33.5-60.9-33.5-30.6 0-60.6 22.4-60.6 62.2 0 33.4 29.4 60.5 66.3 60.5 33.4 0 62.6-13.5 89.2-36.5-30.9 52.2-87.5 77.6-147.1 77.6-13.4 0-26.3-3-39-8-41.6 46.4-98.9 60.9-155.4 56.3 47.1-59.1 121.2-97.9 218.1-98.3 12.3 0 32.5 10 32.5 33.5z"></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsSignUp((prev) => !prev)}
                        className="text-blue-400 hover:text-blue-500 text-sm transition-all duration-200"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

SignIn.propTypes = {
    onClose: PropTypes.func,
    isSignUp: PropTypes.bool,
};

export default SignIn;
