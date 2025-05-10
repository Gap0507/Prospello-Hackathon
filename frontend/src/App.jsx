import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Clear any bad auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Protected route component with loading state
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
    }
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
          } 
        />
        <Route 
          path="/register" 
          element={
            user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        {/* Add more protected routes here */}
        <Route 
          path="/groups" 
          element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/expenses" 
          element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/expenses/new" 
          element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/groups/new" 
          element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settle" 
          element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          } 
        />
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;