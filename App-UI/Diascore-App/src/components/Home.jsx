import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [user, setUser] = useState(null); // State to store user data
    const navigate = useNavigate();

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set user data when logged in
            } else {
                navigate('/'); // Redirect to login if not authenticated
            }
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, [navigate]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to the login page after sign out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Diascore Home Page!</h1>
            {user ? (
                <div>
                    <p>You are successfully logged in as:</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Display Name:</strong> {user.displayName || 'N/A'}</p> {/* Display name may not always be available */}
                </div>
            ) : (
                <p>Loading user data...</p> // Show loading state if user data is not yet fetched
            )}
            <button onClick={handleSignOut}>Logout</button> {/* Logout button */}
        </div>
    );
};

export default Home;
