import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { MusicProvider } from '../contexts/MusicContext';
import Layout from '../Layout/Layout';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Auth/Login';
import Signup from '../../Pages/Auth/Signup';
import Playlists from '../../Pages/Playlists/Playlists';
import Artists from '../../Pages/Artists/Artists';
import Albums from '../../Pages/Albums/Albums';
import Search from '../../Pages/Search/Search';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

// Auth Component that combines Login and Signup
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div className="auth-wrapper">
      {isLogin ? (
        <Login goToSignup={switchToSignup} />
      ) : (
        <Signup goToLogin={switchToLogin} />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/signup" element={<Navigate to="/auth" replace />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="playlists" element={<Playlists />} />
                <Route path="artists" element={<Artists />} />
                <Route path="albums" element={<Albums />} />
                <Route path="search" element={<Search />} />
              </Route>
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
          </div>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;
