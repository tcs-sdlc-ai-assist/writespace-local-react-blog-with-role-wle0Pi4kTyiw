import React from 'react';
import PropTypes from 'prop-types';

function PublicNavbar() {
  return (
    <nav className="w-full bg-slate-800 py-4 px-6 flex items-center justify-between shadow-md">
      <span className="text-xl font-bold text-slate-100">writespace</span>
      <div className="space-x-4">
        <a href="/" className="text-slate-100 hover:text-sky-400 transition">Home</a>
        <a href="/login" className="text-slate-100 hover:text-sky-400 transition">Login</a>
        <a href="/register" className="text-slate-100 hover:text-sky-400 transition">Register</a>
      </div>
    </nav>
  );
}

PublicNavbar.propTypes = {};

export default PublicNavbar;