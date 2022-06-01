import React from 'react';
import '../styles/App.css'
// modules
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

// Components
import Login from '../components/Login/Login'
import useAuth from './useAuth'
import Dashboard from '../components/Dashboard/Dashboard'
import { Sidebar, ProtectedRoute } from '../components'
import { CreateUser, ListUsers, EditUser } from '../pages'
import { ListAccounts, ListAccountsTeam, CreateAccount, EditAccount, CreateAccountAssociate } from '../pages'
import { ListTransfers } from '../pages'

function App() {
  const { auth, setAuth } = useAuth()

  if (!auth) {
    return <Login setToken={setAuth} />
  }

  return (
    <div className='wrapper'>
      <Router>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} lg={10}>
          <div className='container'>
            <Routes>
              {/* Home */}
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Users */}
              <Route path="/users"
                element={
                <ProtectedRoute auth={auth} protectedComponent={<ListUsers />} redirect={<Dashboard />} />
              } />
              <Route path="/users/create" element={
                <ProtectedRoute auth={auth} protectedComponent={<CreateUser />} redirect={<Dashboard />} />
              } />
              <Route path="/users/edit" element={
                <ProtectedRoute auth={auth} protectedComponent={<EditUser />} redirect={<Dashboard />} />
              } />
              {/* Accounts */}
              <Route path="/accounts" element={
                <ProtectedRoute auth={auth} protectedComponent={<ListAccounts />} redirect={<Dashboard />} />
              } />
              <Route path="/accounts/create" element={
                <ProtectedRoute auth={auth} protectedComponent={<CreateAccount />} redirect={<Dashboard />} />
              } />
              <Route path="/accounts/edit" element={
                <ProtectedRoute auth={auth} protectedComponent={<EditAccount />} redirect={<Dashboard />} />
              } />
              <Route path="/accounts/team" element={
                <ProtectedRoute auth={auth} protectedComponent={<ListAccountsTeam />} redirect={<Dashboard />} />
              } />
              <Route path="/accounts/team/create" element={
                <ProtectedRoute auth={auth} protectedComponent={<CreateAccountAssociate />} redirect={<Dashboard />} />
              } />
              {/* Transfers */}
              <Route path="/transfers" element={
                <ProtectedRoute auth={auth} protectedComponent={<ListTransfers />} redirect={<Dashboard />} />
              } />
            </Routes>
            </div>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
}

export default App;