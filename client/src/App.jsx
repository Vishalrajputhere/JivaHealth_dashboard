import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserManagementPage from './pages/UserManagementPage';
import UserDetailPage from './pages/UserDetailPage';

/**
 * App — defines all client-side routes.
 * The root path redirects to /users so the dashboard loads immediately.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to the User Management page */}
        <Route path="/" element={<Navigate to="/users" replace />} />

        {/* Page A — User list */}
        <Route path="/users" element={<UserManagementPage />} />

        {/* Page B/C/D — User detail with tabs */}
        <Route path="/users/:id" element={<UserDetailPage />} />

        {/* Catch-all: redirect unknown paths back to users */}
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
