import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM from 'react-dom/client' for React 18
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Registration from './components/Registration';
import Submitted from './components/Submitted';
import './index.css';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/registration"
          element={
            <div>
              <Registration />
            </div>
          }
        />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </Router>
  );
}

// Use ReactDOM.createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
