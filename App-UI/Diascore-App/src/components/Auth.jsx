import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase/firebase';
import {
    onAuthStateChanged,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    linkWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [loading, setLoading] = useState(true); // Initial loading state for auth check
    const [authLoading, setAuthLoading] = useState(false); // Loading state for Google login
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
            // Step 1: Sign in with Google popup
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Step 2: Check if account needs linking
            const existingMethods = await fetchSignInMethodsForEmail(auth, user.email);
            console.log('Sign-in methods for this email:', existingMethods);

            if (existingMethods.includes('password')) {
                // If email/password account exists, link with Google
                await linkWithPopup(user, googleProvider);
                alert('Google account linked successfully with your existing email account!');
            } else {
                console.log('User signed in with Google:', user);
                alert('Signed in successfully with Google!');
            }

            // Navigate to home after successful login
            navigate('/home');
        } catch (error) {
            console.error('Error during Google login:', error.message);

            // Handle error cases with proper alerts
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

    if (loading) {
        return <div>Loading...</div>; // Display loading state until the auth state is checked
    }

    return (
        <div>
            {/* Google Login button */}
            <button onClick={handleGoogleLogin} disabled={authLoading}>
                {authLoading ? 'Processing Google Login...' : 'Sign in with Google'}
            </button>
        </div>
    );
};

export default Auth;
