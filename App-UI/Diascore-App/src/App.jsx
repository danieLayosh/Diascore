import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';


const App = () => {
 
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* <Route path='/home' element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route path='/' element={user ? <Navigate to="/home" /> : <Auth />} /> */}
      </Routes>
    </Router>
  );
};

export default App;