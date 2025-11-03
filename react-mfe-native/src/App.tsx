import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { componentRegistry } from './services/ComponentRegistry';
import './App.css';

interface AppProps {
  componentName?: string;
  standalone?: boolean;
}

const EmbeddedMode: React.FC<{ componentName: string }> = ({ componentName }) => {
  const [CurrentComponent, setCurrentComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const meta = componentRegistry.getComponent(componentName);
    if (meta) {
      setCurrentComponent(() => meta.component);
      setError(null);
      
      // Emit custom event for host navigation tracking
      const event = new CustomEvent('react-mfe-navigation', {
        detail: { componentName, timestamp: new Date().toISOString() },
        bubbles: true,
        composed: true,
      });
      window.dispatchEvent(event);
    } else {
      setError(`Component "${componentName}" not found`);
    }
  }, [componentName]);

  if (error) {
    return (
      <div style={{ padding: '20px', color: '#d32f2f' }}>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!CurrentComponent) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  // Pass standalone=false to components that need it
  return <CurrentComponent standalone={false} />;
};

const StandaloneMode: React.FC<{ initialComponent: string }> = ({ initialComponent }) => {
  const allComponents = componentRegistry.getAllComponents();

  return (
    <div className="standalone-wrapper">
      <header className="mfe-header">
        <h1>React Native MFE</h1>
        <nav className="mfe-nav">
          {allComponents.slice(0, 5).map((meta) => (
            <NavLink key={meta.name} to={meta.route}>
              {meta.name}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mfe-content">
        <Routes>
          <Route path="/" element={<Navigate to={`/${initialComponent}`} replace />} />
          {allComponents.map((meta) => (
            <Route key={meta.name} path={meta.route} element={<meta.component />} />
          ))}
          <Route path="*" element={<Navigate to={`/${initialComponent}`} replace />} />
        </Routes>
      </main>
    </div>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)} className="nav-button">
      {children}
    </button>
  );
};

const App: React.FC<AppProps> = ({ componentName = 'home', standalone = true }) => {
  console.log('[React Native MFE] Initializing:', { componentName, standalone });

  if (standalone) {
    return (
      <BrowserRouter>
        <StandaloneMode initialComponent={componentName} />
      </BrowserRouter>
    );
  }

  return <EmbeddedMode componentName={componentName} />;
};

export default App;
