import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [password, setPassword] = useState(''); // State to track input value
  const [showHome, setShowHome] = useState(false); // State to trigger scroll animation
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    if (password === 'w') {
      setIsLoggedIn(true); // Set login status to true if the password is correct
      setTimeout(() => {
        setShowHome(true); // Trigger the Home view after animation
        navigate('/home'); // Redirect to the new URL
      }, 1000);
    } else {
      alert('Incorrect password!'); // Show an alert for incorrect password
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(); // Trigger login when Enter is pressed
    }
  };

  if (!isLoggedIn) {
    return (
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
    );
  }

  return (
    <div className="background">
      <div className={`overlay ${showHome ? 'fade-out' : ''}`}></div>
      {!showHome && <div className="scroll-animation">Välkommen till firandet!</div>}
      {showHome && <Home />}
    </div>
  );
}

export default App;