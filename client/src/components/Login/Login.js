import React from 'react';
import './Login.css';
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
    console.log(token)
    setToken(token);
  }


  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={ handleSubmit }>
        <label>
          <p>Username</p>
          <input type="text" onChange={ e => setEmail(e.target.value) }/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={ e => setPassword(e.target.value) }/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login