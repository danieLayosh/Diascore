import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Diascore Home Page!</h1>
            <p>You are successfully logged in.</p>
            <button onClick={handleSignOut}>Logout</button> {/*Logout button*/}
        </div>
    );
};

export default Home;