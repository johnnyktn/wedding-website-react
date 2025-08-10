import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import Registration from './Registration';
import '../styles/App.css';
import '../styles/Home.css';
import '../styles/Common.css';

function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const targetDate = new Date('2026-02-14T00:00:00').getTime();
  const navigate = useNavigate(); // Initialize useNavigate

  const renderer = ({ days, hours, minutes, seconds }) => {
    const pluralize = (value, singular, plural) => (value === 1 ? singular : plural);

    return (
      <div className="countdown-boxes">
        <div className="countdown-box">
          <span className="countdown-value">{days}</span>
          <span className="countdown-label">{pluralize(days, 'Dag', 'Dagar')}</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-value">{hours}</span>
          <span className="countdown-label">{pluralize(hours, 'Timme', 'Timmar')}</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-value">{minutes}</span>
          <span className="countdown-label">{pluralize(minutes, 'Minut', 'Minuter')}</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-value">{seconds}</span>
          <span className="countdown-label">{pluralize(seconds, 'Sekund', 'Sekunder')}</span>
        </div>
      </div>
    );
  };

  const handleRegisterClick = () => {
    setShowRegister(true); // Show the registration view
    navigate('/registration'); // Redirect to /registration
  };

  if (showRegister) {
    return (
      <div>
        <Registration/>
      </div>
    );
  }

  return (
    <div className="home-background">
      <header id="main-header" className="main-cover" role="banner" data-stellar-background-ratio="0.5">
        <div className="container">
          <div className="row">
            <div className="hero-container">
              <div className="hero-content animate-box" data-animate-effect="fadeIn">
                <h1>Wilma &amp; Johnny</h1>
                <br />
                <img src="/fprint.png" alt="Wilma + Johnny" />
                <h2>14.02.2026</h2>
                <div className="countdown">
                  <Countdown date={targetDate} renderer={renderer} />
                </div>
                <div>
                  <h3>OSA senast 15:e Oktober</h3>
                </div>
                <p>
                  <button
                    onClick={handleRegisterClick} // Call the handleRegisterClick function
                    className="btn"
                  >
                    Info & Anmälan
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;