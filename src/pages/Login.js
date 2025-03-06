// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('https://bank-api-dixj.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // important for cookies
      });
      
      if (response.ok) {
        // Login successful: show success popup and redirect after delay
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="chase-heading">Chase</h2>
        <h3>Sign in</h3>
        {error && <div className="error-message">{error}</div>}
        {showSuccess && <div className="success-popup">Login successful!</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Sign in</button>
          <div className="links">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <p><Link to="/reset-password">Forgot Password?</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
