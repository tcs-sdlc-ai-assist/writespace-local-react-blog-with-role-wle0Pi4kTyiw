import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Example placeholder pages
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">writespace</h1>
      <p className="text-lg text-slate-400">A modern writing space built with React and Tailwind CSS.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-2">404 – Not Found</h2>
      <p className="text-slate-400">The page you are looking for does not exist.</p>
    </div>
  );
}

// Example Navbar, conditionally rendered
function Navbar() {
  return (
    <nav className="w-full bg-slate-800 py-4 px-6 flex items-center justify-between shadow-md">
      <span className="text-xl font-bold text-slate-100">writespace</span>
      <div className="space-x-4">
        <a href="/" className="text-slate-100 hover:text-sky-400 transition">Home</a>
      </div>
    </nav>
  );
}

Navbar.propTypes = {};

function RouteGuard({ children }) {
  // Example guard: always allow for now
  // Replace with real auth logic as needed
  return children;
}

RouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  // Example: show navbar only on certain routes
  // For now, always show
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <RouteGuard>
                  <Home />
                </RouteGuard>
              }
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}