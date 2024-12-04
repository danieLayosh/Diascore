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
    const [loading, setLoading] = useState(true); // Initial loading state for auth check
    const [authLoading, setAuthLoading] = useState(false); // Loading state for Google login
    const [email, setEmail] = useState(''); // User email for sign up/in
    const [password, setPassword] = useState(''); // User password for sign up/in
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate('/home');
            } else {
                setLoading(false); // Once done checking, set loading state to false
            }
        });

        // Cleanup the subscription on component unmount
        return () => unsubscribe();
    }, [navigate]);

    const handleGoogleLogin = async () => {
        setAuthLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
    
            // Check existing sign-in methods for this email
            const existingMethods = await fetchSignInMethodsForEmail(auth, user.email);
    
            if (existingMethods.length > 0 && !existingMethods.includes('google.com')) {
                // Email/password account exists but is not linked with Google
                alert(
                    'An account already exists with this email using a different method. Please sign in with your email and password, then link your Google account from the settings.'
                );
            } else {
                // Successful Google sign-in or account already linked
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
                // Sign up user
                const result = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(result.user); // Send email verification
                alert('Verification email sent! Please check your inbox.');
            } else {
                // Sign in user
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
        return <div>Loading...</div>; // Display loading state until the auth state is checked
    }

    return (
        <div>
            {/* Toggle Sign In/Sign Up */}
            <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAuth} disabled={authLoading}>
                {authLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            <button onClick={() => setIsSignUp((prev) => !prev)}>
                {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
            </button>

            <hr />

            {/* Google Login button */}
            <button onClick={handleGoogleLogin} disabled={authLoading}>
                {authLoading ? 'Processing Google Login...' : 'Sign in with Google'}
            </button>
        </div>
    );
};

export default Auth;