import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // If user is logged in, redirect to home page
            if (currentUser) {
                navigate('/home');
            }else {
                setLoading(false); // Once done checking, Set loading state to false
            }
        });

        // Cleanup the subscription on component unmount
        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            }else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            console.log('Success');
            navigate('/home');
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div> // display loading state until the auth state is checked
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit'>{isLogin ? 'Login': 'Signup'}</button>
            <button type='button' onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Signup': 'Login'}
            </button>
        </form>
    );
};

export default Auth;