import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';
import Registration from './components/Registration';
import Submitted from './components/Submitted';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [password, setPassword] = useState(''); // State to track input value
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const verifiedPassword = process.env.REACT_APP_LOGIN_PASSWORD; 
    if (password === verifiedPassword) {
      setIsLoggedIn(true); // Set login status to true if the password is correct
      localStorage.setItem('isLoggedIn', 'true'); // Persist login status
      navigate('/home'); // Redirect to the home page
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login status
    localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
    navigate('/'); // Redirect to login page
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(); // Trigger login when Enter is pressed
    }
  };

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <div className="background">
              <div className="overlay"></div>
              <div className="login-container">
                <h1>Var med och fira vår bröllopsdag!</h1>
                <input
                  type="password"
                  placeholder="Ange lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown} // Add keydown event listener
                  className="login-input"
                />
                <button onClick={handleLogin} className="login-button">
                  Gå vidare
                </button>
              </div>
            </div>
          ) : (
            <Navigate to="/home" /> // Redirect to /home if already logged in
          )
        }
      />

      {/* Home Page */}
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <Home handleLogout={handleLogout} />
          ) : (
            <Navigate to="/" /> // Redirect to login if not logged in
          )
        }
      />

      {/* Registration Page */}
      <Route
        path="/registration"
        element={
          isLoggedIn ? (
            <Registration />
          ) : (
            <Navigate to="/" /> // Redirect to login if not logged in
          )
        }
      />

      {/* Submitted Page */}
      <Route
        path="/submitted"
        element={
          isLoggedIn ? (
            <Submitted />
          ) : (
            <Navigate to="/" /> // Redirect to login if not logged in
          )
        }
      />

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;