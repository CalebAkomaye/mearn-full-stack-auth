import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from './components/pages/auth/SignupPage';
import LoginPage from './components/pages/auth/LoginPage';
import VerifyEmailPage from './components/pages/auth/VerifyEmailPage';

import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/AuthStore';
import { useEffect } from 'react';

import DashBoard from './components/pages/main/DashBoard';
import Loading from './components/ui/Loading';
import DemoPage from './components/pages/main/DemoPage';
import DocsPage from './components/pages/main/DocsPage';
import ForgotPassword from './components/pages/main/ForgotPassword';
import ResetPasswordPage from './components/pages/auth/ResetPasswordPage';

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('isAuthenticated: ', isAuthenticated);

  if (isCheckingAuth) return <Loading />;

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/demo'
          element={
            <ProtectedRoute>
              <DemoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/docs'
          element={
            <ProtectedRoute>
              <DocsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path='/verify-email' element={<VerifyEmailPage />} />
        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
