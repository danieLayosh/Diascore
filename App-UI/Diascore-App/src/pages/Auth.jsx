import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    signInWithPopup,
    fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (window.location.pathname !== '/home') {
                    navigate('/home');
                }
            } else {
                setLoading(false);
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

            if (existingMethods.length > 0 && !existingMethods.includes('google.com')) {
                alert(
                    'An account already exists with this email using a different method. Please sign in with your email and password, then link your Google account from the settings.'
                );
            } else {
                alert('Signed in successfully with Google!');
                navigate('/home');
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

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl text-white">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 transform transition-all duration-300 hover:scale-105 my-6">
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </h1>
                <div className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <hr className="my-6 border-gray-600" />
                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleAuth}
                            disabled={authLoading}
                            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transform transition-all duration-300 disabled:bg-gray-500"
                        >
                            {authLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                        <button
                            onClick={() => setIsSignUp((prev) => !prev)}
                            className="text-blue-400 hover:text-blue-500 text-sm transition-all duration-200"
                        >
                            {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                        </button>
                    </div>
                </div>
                <hr className="my-6 border-gray-600" />
                <button
                    onClick={handleGoogleLogin}
                    disabled={authLoading}
                    className="bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transform transition-all duration-300 disabled:bg-gray-500"
                >
                    {authLoading ? 'Processing Google Login...' : 'Sign in with Google'}
                </button>
            </div>
        </div>
    );
    
};

export default Auth;
