import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import Home from './components/Home';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect to home if the user is logged in */}
        <Route path='/auth' element={user ? <Navigate to='/home' /> : <Auth />} />

        {/* Home page, accessible only if user is logged in */}
        <Route path='/home' element={user ? <Home /> : <Navigate to="/auth" />} />

        {/* Default route, redirect to auth page */}
        <Route path='/' element={user ? <Navigate to="/home" /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default App;