import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LeftNavPage } from './pages/LeftNavPage';
import { DynamicAngularPage } from './pages/DynamicAngularPage';
import './App.css';
import { Profile } from './pages/Profile';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <h1>MFE Host</h1>
      </div>
      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/left-nav' ? 'active' : ''}>
          <Link to="/left-nav">Left Nav MFE</Link>
        </li>
        <li className={location.pathname === '/dynamic-angular' ? 'active' : ''}>
          <Link to="/dynamic-angular">Dynamic Angular MFE</Link>
        </li>
        <li className={location.pathname === '/profile' ? 'active' : ''}>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/left-nav" element={<LeftNavPage />} />
            <Route path="/dynamic-angular" element={<DynamicAngularPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={
              <div className="not-found">
                <h2>404 - Page Not Found</h2>
                <Link to="/">Go Home</Link>
              </div>
            } />
          </Routes>
        </main>
        <footer className="main-footer">
          <p>MFE Host Application - Micro Frontend Integration Platform</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
