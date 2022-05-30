import React from 'react';
import '../styles/App.css'
// modules
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Login from '../components/Login/Login'
import useToken from './useToken'
import Dashboard from '../components/Dashboard/Dashboard'
import { NavBar } from '../components'
import { CreateUser, ListUsers, EditUser } from '../pages'
import { ListAccounts, CreateAccount, EditAccount } from '../pages'

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className='wrapper'>
      <Router>
        <NavBar />
        <div className='container'>
        <Routes>
          {/* Home */}
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Users */}
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/edit" element={<EditUser />} />
          {/* Accounts */}
          <Route path="/accounts" element={<ListAccounts />} />
          <Route path="/accounts/create" element={<CreateAccount />} />
          <Route path="/accounts/edit" element={<EditAccount />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;