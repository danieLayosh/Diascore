import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Home = () => {
    const { user, loading } = useAuth(); // State to store user data
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/auth'); // Redirect to the login page after sign out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (loading) {
        return <div>Loading user data...</div>
    }

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
