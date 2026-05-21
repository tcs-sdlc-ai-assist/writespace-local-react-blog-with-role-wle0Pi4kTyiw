import React from 'react';
import PropTypes from 'prop-types';

function Navbar({ user, onLogout }) {
  return (
    <nav className="w-full bg-slate-800 py-4 px-6 flex items-center justify-between shadow-md">
      <span className="text-xl font-bold text-slate-100">writespace</span>
      <div className="flex items-center space-x-4">
        <a href="/" className="text-slate-100 hover:text-sky-400 transition">Home</a>
        {user && (
          <div className="flex items-center space-x-3">
            <span className="text-slate-100 font-medium">{user.name}</span>
            <button
              type="button"
              className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded transition"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;