import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Common.css';
import '../styles/Submitted.css';
import '../styles/Register.css';

function Submitted() {
    const navigate = useNavigate();

    return (
        <div className="submitted-background register-info-container">
            <div className="submitted-container shared-container">
                <h1>Tack för din anmälan!</h1>
                <button
                    className="btn"
                    onClick={() => navigate('/home')}
                >
                    Tillbaka till startsidan
                </button>
            </div>
        </div>
    );
}

export default Submitted;