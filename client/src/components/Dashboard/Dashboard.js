import React from 'react';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <Link to='/users'>Users</Link><br/>
      <Link to='/accounts'>Accounts</Link><br/>
      <Link to='/associates'>Associates</Link><br/>
    </>
  )
}

export default Dashboard