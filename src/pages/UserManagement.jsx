import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import UserRow from '../components/UserRow';
import PropTypes from 'prop-types';

/**
 * UserManagement page – admin-only user management (list, create, delete, assign roles).
 *
 * @param {object} props
 * @param {object} props.user - Authenticated user object.
 * @param {function} props.onLogout - Logout handler.
 * @returns {React.ReactNode}
 */
function UserManagement({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'writer',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [createError, setCreateError] = useState('');
  const [deletingEmail, setDeletingEmail] = useState(null);
  const [assigningRole, setAssigningRole] = useState({ email: '', role: '' });
  const [roleError, setRoleError] = useState('');

  // Simulate fetching users
  useEffect(() => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      try {
        setUsers([
          {
            name: 'Jane Doe',
            email: 'writer@writespace.com',
            role: 'writer',
            avatar: '',
            active: true,
          },
          {
            name: 'John Smith',
            email: 'john@writespace.com',
            role: 'writer',
            avatar: '',
            active: true,
          },
          {
            name: 'writespace Team',
            email: 'admin@writespace.com',
            role: 'admin',
            avatar: '',
            active: true,
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load users.');
        setLoading(false);
      }
    }, 700);
  }, []);

  /**
   * Validate create user form fields.
   * @param {object} values
   * @returns {object} errors
   */
  function validateCreate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required.';
    } else if (values.name.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }
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
    if (!['admin', 'writer'].includes(values.role)) {
      errors.role = 'Role must be admin or writer.';
    }
    return errors;
  }

  /**
   * Handle create form input changes.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e
   */
  function handleCreateChange(e) {
    const { name, value } = e.target;
    setCreateForm(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    setCreateError('');
  }

  /**
   * Handle create user form submission.
   * @param {React.FormEvent} e
   */
  async function handleCreateSubmit(e) {
    e.preventDefault();
    setCreateError('');
    setFieldErrors({});
    const errors = validateCreate(createForm);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setCreating(true);
    try {
      // Simulate async create
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            users.some(u => u.email === createForm.email)
          ) {
            reject(new Error('Email already registered.'));
            return;
          }
          resolve();
        }, 900);
      });
      setUsers(prev => [
        ...prev,
        {
          name: createForm.name,
          email: createForm.email,
          role: createForm.role,
          avatar: '',
          active: true,
        },
      ]);
      setCreateForm({
        name: '',
        email: '',
        password: '',
        role: 'writer',
      });
    } catch (err) {
      setCreateError(err.message || 'Failed to create user.');
    } finally {
      setCreating(false);
    }
  }

  /**
   * Handle delete user.
   * @param {string} email
   */
  async function handleDeleteUser(email) {
    setDeletingEmail(email);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setUsers(prev => prev.filter(u => u.email !== email));
    } catch (err) {
      setError('Failed to delete user.');
    } finally {
      setDeletingEmail(null);
    }
  }

  /**
   * Handle assign role.
   * @param {string} email
   * @param {string} role
   */
  async function handleAssignRole(email, role) {
    setAssigningRole({ email, role });
    setRoleError('');
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!['admin', 'writer'].includes(role)) {
            reject(new Error('Invalid role.'));
            return;
          }
          resolve();
        }, 600);
      });
      setUsers(prev =>
        prev.map(u =>
          u.email === email ? { ...u, role } : u
        )
      );
    } catch (err) {
      setRoleError(err.message || 'Failed to assign role.');
    } finally {
      setAssigningRole({ email: '', role: '' });
    }
  }

  /**
   * Handle edit user (assign role).
   * @param {string} email
   */
  function handleEditUser(email) {
    const userToEdit = users.find(u => u.email === email);
    if (!userToEdit) return;
    const newRole = userToEdit.role === 'admin' ? 'writer' : 'admin';
    handleAssignRole(email, newRole);
  }

  return (
    <ProtectedRoute user={user} allowedRoles={['admin']}>
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1 min-h-screen bg-slate-900 text-slate-100 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">User Management</h1>
            <a
              href="/admin"
              className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded font-semibold transition shadow"
            >
              Back to Dashboard
            </a>
          </div>
          {/* Create User Form */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Create New User</h2>
            <form
              onSubmit={handleCreateSubmit}
              className="bg-slate-800 rounded-lg shadow-md p-6 space-y-6 max-w-md"
            >
              {createError && (
                <div className="mb-2 text-red-400 text-sm text-center">{createError}</div>
              )}
              <div>
                <label
                  htmlFor="name"
                  className="block text-slate-200 font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={createForm.name}
                  onChange={handleCreateChange}
                  disabled={creating}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.name ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  required
                />
                {fieldErrors.name && (
                  <div className="mt-1 text-xs text-red-400">{fieldErrors.name}</div>
                )}
              </div>
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
                  value={createForm.email}
                  onChange={handleCreateChange}
                  disabled={creating}
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
                  autoComplete="new-password"
                  value={createForm.password}
                  onChange={handleCreateChange}
                  disabled={creating}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.password ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  required
                />
                {fieldErrors.password && (
                  <div className="mt-1 text-xs text-red-400">{fieldErrors.password}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-slate-200 font-medium mb-1"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={createForm.role}
                  onChange={handleCreateChange}
                  disabled={creating}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.role ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  required
                >
                  <option value="writer">Writer</option>
                  <option value="admin">Admin</option>
                </select>
                {fieldErrors.role && (
                  <div className="mt-1 text-xs text-red-400">{fieldErrors.role}</div>
                )}
              </div>
              <button
                type="submit"
                disabled={creating}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded transition shadow flex items-center justify-center"
              >
                {creating ? (
                  <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full mr-2"></span>
                ) : null}
                {creating ? 'Creating...' : 'Create User'}
              </button>
            </form>
          </section>
          {/* User List Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            {error && (
              <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
            )}
            {roleError && (
              <div className="mb-4 text-red-400 text-sm text-center">{roleError}</div>
            )}
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-sky-400 border-solid"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="text-slate-400 text-center py-8">No users found.</div>
            ) : (
              <div className="space-y-4">
                {users.map(u => (
                  <UserRow
                    key={u.email}
                    name={u.name}
                    email={u.email}
                    role={u.role}
                    avatar={u.avatar}
                    active={u.active}
                    onEdit={
                      assigningRole.email === u.email
                        ? undefined
                        : () => handleEditUser(u.email)
                    }
                    onDelete={
                      deletingEmail === u.email || u.email === user.email
                        ? undefined
                        : () => handleDeleteUser(u.email)
                    }
                  />
                ))}
              </div>
            )}
            <div className="mt-6 text-xs text-slate-400">
              <span>
                <strong>Role assignment:</strong> Click "Edit" to toggle between admin/writer.
              </span>
              <br />
              <span>
                <strong>Delete:</strong> You cannot delete your own account.
              </span>
            </div>
          </section>
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
    </ProtectedRoute>
  );
}

UserManagement.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default UserManagement;