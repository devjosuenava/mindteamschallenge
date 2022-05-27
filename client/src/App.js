import './App.css';
// modules
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Components
import Login from './components/Login/Login';
import useToken from './useToken';
import Dashboard from './components/Dashboard/Dashboard';

function App() {  
  const { token, setToken } = useToken();  
  if (!token) {
    return <Login setToken={ setToken } />
  }
  
  return (
    <div className='wrapper'>
      <h1>Mind Teams</h1>
      <Router>
        <Routes>
          <Route path="/" exact element={ <Dashboard/> } />
          <Route path="/dashboard" element={ <Dashboard/> } />
        </Routes>      
      </Router>
    </div>
  );
}

export default App;