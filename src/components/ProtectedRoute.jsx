import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProtectedRoute component for route guarding.
 * Enforces authentication and optional role-based access.
 *
 * @param {object} props
 * @param {object|null} props.user - Authenticated user object or null if not authenticated.
 * @param {string[]} [props.allowedRoles] - Array of allowed roles (optional).
 * @param {React.ReactNode} props.children - Route content to render if access is granted.
 * @returns {React.ReactNode}
 */
function ProtectedRoute({ user, allowedRoles, children }) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
        <p className="text-slate-400 mb-4">You must be logged in to access this page.</p>
        <a
          href="/login"
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  if (
    allowedRoles &&
    Array.isArray(allowedRoles) &&
    allowedRoles.length > 0 &&
    (!user.role || !allowedRoles.includes(user.role))
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="text-slate-400 mb-4">You do not have permission to view this page.</p>
        <a
          href="/"
          className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded transition"
        >
          Back to Home
        </a>
      </div>
    );
  }

  return children;
}

ProtectedRoute.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;