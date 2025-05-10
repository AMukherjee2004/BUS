import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Bus } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-4 py-12">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center text-white bg-blue-600 p-3 rounded-full mb-4">
          <Bus size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KolkataBus</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
          Find your bus routes and schedules in Kolkata
        </p>
      </div>

      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onToggleForm={() => setIsLogin(false)} />
        ) : (
          <SignupForm onToggleForm={() => setIsLogin(true)} />
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© 2025 KolkataBus. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthPage;