import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import OfflineBanner from './components/common/OfflineBanner';

// Pages (lazy-loaded for performance)
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';

const LoginPage        = lazy(() => import('./pages/LoginPage'));
const OTPPage          = lazy(() => import('./pages/OTPPage'));
const HomePage         = lazy(() => import('./pages/HomePage'));
const BuyPage          = lazy(() => import('./pages/BuyPage'));
const SellPage         = lazy(() => import('./pages/SellPage'));
const ListingDetail    = lazy(() => import('./pages/ListingDetailPage'));
const MyListingsPage   = lazy(() => import('./pages/MyListingsPage'));
const ProfilePage      = lazy(() => import('./pages/ProfilePage'));
const EditProfilePage  = lazy(() => import('./pages/EditProfilePage'));

// Guard: redirect to /login if not authenticated
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Global offline indicator */}
      <OfflineBanner />

      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '16px',
            fontFamily: 'Noto Sans Devanagari, Noto Sans, sans-serif',
            fontWeight: '600',
          },
        }}
      />

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-green-50"><LoadingSpinner size="lg" /></div>}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp"   element={<OTPPage />} />

          {/* Protected */}
          <Route path="/"             element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/buy"          element={<ProtectedRoute><BuyPage /></ProtectedRoute>} />
          <Route path="/buy/:id"      element={<ProtectedRoute><ListingDetail /></ProtectedRoute>} />
          <Route path="/sell"         element={<ProtectedRoute><SellPage /></ProtectedRoute>} />
          <Route path="/my-listings"  element={<ProtectedRoute><MyListingsPage /></ProtectedRoute>} />
          <Route path="/profile"      element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
