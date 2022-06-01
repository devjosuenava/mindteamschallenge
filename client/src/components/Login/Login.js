import React from 'react';
import './Login.css';
import Logo from '../utils/Logo'
import { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials){
  return fetch('http://localhost:8080/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
}

const Login = ({ setToken }) => {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({ email, password });
    setToken(token);
  }

  return (
    <div className="login-wrapper">
      <Logo />
      <h1>Mind Teams</h1>
      <h2>Log In</h2>
      <form onSubmit={ handleSubmit }>
        <label>
          <p className="text">Username</p>
          <input className="input" type="text"  onChange={ e => setEmail(e.target.value) }/>
        </label>
        <label>
          <p className="text">Password</p>
          <input className="input" type="password" onChange={ e => setPassword(e.target.value) }/>
        </label>
        <div>
          <button className="btnLogin" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login