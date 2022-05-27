import React from 'react';

import '../styles/App.css'
// modules
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Login from '../components/Login/Login'
import useToken from './useToken'
import Dashboard from '../components/Dashboard/Dashboard'
import { NavBar } from '../components'
import { CreateUser, ListUsers } from '../pages'


function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className='wrapper'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/create" element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;