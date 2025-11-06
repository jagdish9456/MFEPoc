/**
 * Shared Externals - Runtime singleton loader
 * This module provides runtime access to shared dependencies from the host
 */

import * as ReactBundled from 'react';
import * as ReactDOMBundled from 'react-dom/client';
import * as ReactRouterDOMBundled from 'react-router-dom';
import { getSharedDependency } from './utils/sharedDependencies';

// Export shared versions (with fallback to bundled)
export const React = getSharedDependency('react', ReactBundled);
export const ReactDOM = getSharedDependency('react-dom', ReactDOMBundled);
export const ReactRouterDOM = getSharedDependency('react-router-dom', ReactRouterDOMBundled);

// Re-export commonly used items for convenience
export const {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
  createContext,
  createElement,
  StrictMode,
} = React;

export const { createRoot } = ReactDOM;

export const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Link,
} = ReactRouterDOM;

export default React;
