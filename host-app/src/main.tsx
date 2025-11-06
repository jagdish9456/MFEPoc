import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { sharedDepsRegistry } from './utils/sharedDependencies';

// Initialize shared dependencies registry before rendering
sharedDepsRegistry.initialize();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
