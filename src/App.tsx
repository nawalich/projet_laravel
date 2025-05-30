import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserForm from './pages/UserForm';
import UserFormResult from './pages/UserFormResult';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import UserView from './pages/UserView';
import ExportData from './pages/ExportData';

// Auth context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="form" element={<UserForm />} />
            <Route path="form/result" element={<UserFormResult />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserView />} />
            <Route path="users/:id/edit" element={<UserEdit />} />
            <Route path="export" element={<ExportData />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;