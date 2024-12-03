import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;