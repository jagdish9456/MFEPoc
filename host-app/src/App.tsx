import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LeftNavPage } from './pages/LeftNavPage';
import { DynamicAngularPage } from './pages/DynamicAngularPage';
import { ReactMFEPage } from './pages/ReactMFEPage';
import { ReactNativeMFEPage } from './pages/ReactNativeMFEPage';
import './App.css';
import { Profile } from './pages/Profile';
import { useEventBus } from './hooks/useEventBus';
import { NavigationEventDetail, DataEventDetail } from './types/mfe.types';

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

function HostApp() {
  const bus = useEventBus();
  const navigate = useNavigate();

  React.useEffect(() => {
    const offNav = bus.on('mfe:navigate', (e) => {
      const nav = e.detail.detail as NavigationEventDetail;
      const to = nav.toRoute;
      const state = nav.state;
      const replace = nav.replace ?? nav.method === 'replace';
      const search = nav.query
        ? '?' + new URLSearchParams(Object.entries(nav.query).reduce((acc, [k, v]) => {
            acc[k] = String(v);
            return acc;
          }, {} as Record<string, string>)).toString()
        : undefined;

      navigate(search ? to + search : to, { state, replace });
    });

    const offData = bus.on('mfe:data', (e) => {
      const data = e.detail.detail as DataEventDetail<any>;
      console.log('[Host] Data event received:', data);
    });

    return () => {
      offNav();
      offData();
    };
  }, [bus, navigate]);

  return (
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <HostApp />
    </BrowserRouter>
  );
}

export default App;
