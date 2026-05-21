import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

/**
 * LoginPage component – handles login form, validation, error display, and redirects.
 *
 * @returns {React.ReactNode}
 */
function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

  /**
   * Validate form fields.
   * @param {object} values
   * @returns {object} errors
   */
  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email address.';
    }
    if (!values.password) {
      errors.password = 'Password is required.';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    return errors;
  }

  /**
   * Handle form input changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    setError('');
  }

  /**
   * Handle form submission.
   * @param {React.FormEvent} e
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setLoading(true);
    try {
      // Simulate async login
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            form.email === 'admin@writespace.com' &&
            form.password === 'admin123'
          ) {
            resolve();
          } else if (
            form.email === 'writer@writespace.com' &&
            form.password === 'writer123'
          ) {
            resolve();
          } else {
            reject(new Error('Invalid email or password.'));
          }
        }, 900);
      });
      // Redirect to home/dashboard after login
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="bg-slate-800 rounded-lg shadow-md p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          {error && (
            <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-slate-200 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.email ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                required
              />
              {fieldErrors.email && (
                <div className="mt-1 text-xs text-red-400">{fieldErrors.email}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-slate-200 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.password ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                required
              />
              {fieldErrors.password && (
                <div className="mt-1 text-xs text-red-400">{fieldErrors.password}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded transition shadow flex items-center justify-center"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full mr-2"></span>
              ) : null}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-sky-400 hover:underline"
            >
              Register
            </a>
          </div>
        </div>
      </main>
      <footer className="w-full bg-slate-800 py-6 px-6 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <span className="text-slate-400 text-sm">&copy; 2024 writespace. All rights reserved.</span>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="/" className="text-slate-100 hover:text-sky-400 transition text-sm">Home</a>
            <a href="/login" className="text-slate-100 hover:text-sky-400 transition text-sm">Login</a>
            <a href="/register" className="text-slate-100 hover:text-sky-400 transition text-sm">Register</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;