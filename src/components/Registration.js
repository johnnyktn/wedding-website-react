import React from 'react';
import Information from './Information';
import Register from './Register';
import '../styles/App.css';
import '../styles/Information.css';
import '../styles/Register.css';

function Registration() {
    return (
        <div className="register-background register-info-container">
            <Information />
            <Register />
        </div>
    );
}

export default Registration;