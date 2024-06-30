import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/apiService';
import './Registration.css';

const Registration = () => {
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [age, setAge] = useState('');
  const [sexe, setSexe] = useState('male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      name,
      firstname,
      pseudo,
      age: parseInt(age, 10),
      sexe,
      password,
    };

    registerUser(userData)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        navigate('/login'); // Redirect to login page after successful registration
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
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
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pseudo">Pseudo:</label>
          <input
            type="text"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sexe">Sexe:</label>
          <select id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
