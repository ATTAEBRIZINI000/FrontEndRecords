import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = { name, password };

    loginUser(credentials)
      .then((response) => {
        console.log('Login successful:', response.data);
        login(response.data.user); // Set user information
        navigate('/'); // Redirect to home page after successful login
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
