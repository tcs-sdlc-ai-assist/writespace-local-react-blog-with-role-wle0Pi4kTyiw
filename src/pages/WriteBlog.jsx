import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import PropTypes from 'prop-types';

/**
 * WriteBlog page – create/edit blog post form, ownership checks, CRUD logic.
 *
 * @param {object} props
 * @param {object} props.user - Authenticated user object.
 * @param {function} props.onLogout - Logout handler.
 * @returns {React.ReactNode}
 */
function WriteBlog({ user, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    coverImage: '',
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [ownerEmail, setOwnerEmail] = useState('');
  const [notAllowed, setNotAllowed] = useState(false);

  // Simulate fetching post for edit
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    setError('');
    setNotAllowed(false);
    setTimeout(() => {
      try {
        // Simulated post data
        const allPosts = [
          {
            id: 1,
            title: 'Welcome to writespace',
            summary: 'Discover a modern writing platform for creators, writers, and teams.',
            content:
              'writespace is a modern writing platform designed for creators, writers, and teams. Enjoy a distraction-free editor, real-time collaboration, and easy publishing. Start your journey today!',
            coverImage: 'https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=800&q=80',
            ownerEmail: 'admin@writespace.com',
          },
          {
            id: 2,
            title: 'Getting Started Guide',
            summary: 'Learn how to create, edit, and share your first post on writespace.',
            content:
              'To get started, register an account, log in, and create your first post. Use the editor to write, format, and collaborate. When ready, publish and share your work with the world!',
            coverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
            ownerEmail: 'writer@writespace.com',
          },
          {
            id: 3,
            title: 'Collaboration Features',
            summary: 'Explore real-time collaboration and team workflows for writers.',
            content:
              'writespace enables real-time collaboration. Invite teammates, share drafts, and work together seamlessly. Manage roles and permissions for effective team workflows.',
            coverImage: 'https://images.unsplash.com/photo-1503676382389-2d6b3c9e3f36?auto=format&fit=crop&w=800&q=80',
            ownerEmail: 'writer@writespace.com',
          },
        ];
        const found = allPosts.find(p => String(p.id) === String(id));
        if (!found) {
          setError('Post not found.');
          setLoading(false);
          return;
        }
        setForm({
          title: found.title,
          summary: found.summary,
          content: found.content,
          coverImage: found.coverImage || '',
        });
        setOwnerEmail(found.ownerEmail);
        // Ownership check: admin or owner
        if (
          !user ||
          (user.role !== 'admin' &&
            (!user.email || user.email !== found.ownerEmail))
        ) {
          setNotAllowed(true);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load post.');
        setLoading(false);
      }
    }, 700);
  }, [id, isEdit, user]);

  /**
   * Validate form fields.
   * @param {object} values
   * @returns {object} errors
   */
  function validate(values) {
    const errors = {};
    if (!values.title) {
      errors.title = 'Title is required.';
    } else if (values.title.length < 3) {
      errors.title = 'Title must be at least 3 characters.';
    }
    if (!values.summary) {
      errors.summary = 'Summary is required.';
    } else if (values.summary.length < 10) {
      errors.summary = 'Summary must be at least 10 characters.';
    }
    if (!values.content) {
      errors.content = 'Content is required.';
    } else if (values.content.length < 20) {
      errors.content = 'Content must be at least 20 characters.';
    }
    if (values.coverImage && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff|ico)/i.test(values.coverImage)) {
      errors.coverImage = 'Cover image must be a valid image URL.';
    }
    return errors;
  }

  /**
   * Handle form input changes.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e
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
    setSaving(true);
    try {
      // Simulate async save
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate duplicate title error
          if (
            !isEdit &&
            ['Welcome to writespace', 'Getting Started Guide', 'Collaboration Features'].includes(form.title)
          ) {
            reject(new Error('A post with this title already exists.'));
            return;
          }
          resolve();
        }, 900);
      });
      // On success, redirect to home or post page
      if (isEdit) {
        navigate(`/posts/${id}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Failed to save post.');
    } finally {
      setSaving(false);
    }
  }

  /**
   * Handle cancel button.
   */
  function handleCancel() {
    if (isEdit) {
      navigate(`/posts/${id}`);
    } else {
      navigate('/');
    }
  }

  // Ownership check for edit
  if (isEdit && notAllowed) {
    return (
      <ProtectedRoute user={user}>
        <Navbar user={user} onLogout={onLogout} />
        <main className="flex-1 min-h-screen bg-slate-900 text-slate-100 px-6 py-12">
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
            <p className="text-slate-400 mb-4">You do not have permission to edit this post.</p>
            <a
              href="/"
              className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded transition"
            >
              Back to Home
            </a>
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute user={user}>
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1 min-h-screen bg-slate-900 text-slate-100 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{isEdit ? 'Edit Post' : 'Create New Post'}</h1>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-400 border-solid"></div>
            </div>
          ) : error && !saving ? (
            <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-slate-200 font-medium mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  disabled={saving}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.title ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  required
                />
                {fieldErrors.title && (
                  <div className="mt-1 text-xs text-red-400">{fieldErrors.title}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="summary"
                  className="block text-slate-200 font-medium mb-1"
                >
                  Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  disabled={saving}
                  rows={3}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.summary ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  required
                />
                {fieldErrors.summary && (
                  <div className="mt-1 text-xs text-red-400">{fieldErrors.summary}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-slate-200 font-medium mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  disabled={saving}
                  rows={8}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.content ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  required
                />
                {fieldErrors.content && (
                  <div className="mt-1 text-xs text-red-400">{fieldErrors.content}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="coverImage"
                  className="block text-slate-200 font-medium mb-1"
                >
                  Cover Image URL (optional)
                </label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={form.coverImage}
                  onChange={handleChange}
                  disabled={saving}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-slate-100 border ${fieldErrors.coverImage ? 'border-red-500' : 'border-slate-700'} focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  placeholder="https://..."
                />
                {fieldErrors.coverImage && (
                  <div className="mt-1 text-xs text-red-400">{fieldErrors.coverImage}</div>
                )}
                {form.coverImage && !fieldErrors.coverImage && (
                  <div className="mt-3">
                    <img
                      src={form.coverImage}
                      alt="Cover preview"
                      className="w-full h-48 object-cover rounded border border-slate-700"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-8">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded transition shadow flex items-center justify-center"
                >
                  {saving ? (
                    <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full mr-2"></span>
                  ) : null}
                  {saving ? (isEdit ? 'Saving...' : 'Creating...') : (isEdit ? 'Save Changes' : 'Create Post')}
                </button>
                <button
                  type="button"
                  disabled={saving}
                  className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded transition shadow"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <footer className="w-full bg-slate-800 py-6 px-6 mt-auto">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between">
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

WriteBlog.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default WriteBlog;