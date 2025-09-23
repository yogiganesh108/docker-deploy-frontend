import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/styles/App';
import { AuthProvider } from './components/contexts/AuthContext';
import { MusicProvider } from './components/contexts/MusicContext';
import './components/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </AuthProvider>
  </React.StrictMode>
);