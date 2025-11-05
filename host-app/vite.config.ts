import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // Environment-based remote URLs with fallback to localhost
  const REACT_MFE_URL = env.VITE_REACT_MFE_URL || 'http://localhost:3004';

  return {
  server: {
    port: 3000,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 3000,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  plugins: [
    react(),
    federation({
      name: 'host_app',
      remotes: {
        reactMfeModule: {
          type: 'module',
          name: 'reactMfeModule',
          entry: `${REACT_MFE_URL}/remoteEntry.js`,
          entryGlobalName: 'reactMfeModule',
          shareScope: 'default',
        },
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.3.1',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.1',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.26.0',
        },
      },
    }),
  ],
  };
});
