import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import PrivateRoute from './guards/PrivateRoute';
import Login from './components/Login';
import BusList from './components/Bus/BusList';
import BusDetail from './components/Bus/BusDetail';
import setupInterceptors from './services/setupInterceptor';
import PublicRoute from './guards/PublicRouter';

setupInterceptors();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/" element={<PrivateRoute><BusList /></PrivateRoute>} />
          <Route path="/bus/:id" element={<PrivateRoute><BusDetail /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
