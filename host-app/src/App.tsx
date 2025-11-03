import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LeftNavPage } from './pages/LeftNavPage';
import { DynamicAngularPage } from './pages/DynamicAngularPage';
import { ReactMFEPage } from './pages/ReactMFEPage';
import { ReactNativeMFEPage } from './pages/ReactNativeMFEPage';
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
        <li className={location.pathname === '/profile' ? 'active' : ''}>
          <Link to="/profile">Angular Profile</Link>
        </li>
        <li className={location.pathname === '/react-mfe' ? 'active' : ''}>
          <Link to="/react-mfe">React MFE</Link>
        </li>
        <li className={location.pathname === '/react-native-mfe' ? 'active' : ''}>
          <Link to="/react-native-mfe">React Native</Link>
        </li>
        <li className={location.pathname === '/dynamic-angular' ? 'active' : ''}>
          <Link to="/dynamic-angular">Angular MFE</Link>
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
            <Route path="/react-mfe" element={<ReactMFEPage />} />
            <Route path="/react-native-mfe" element={<ReactNativeMFEPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dynamic-angular" element={<DynamicAngularPage />} />
            <Route path="*" element={
              <div className="not-found">
                <h2>404 - Page Not Found</h2>
                <Link to="/">Go Home</Link>
              </div>
            } />
          </Routes>
        </main>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
