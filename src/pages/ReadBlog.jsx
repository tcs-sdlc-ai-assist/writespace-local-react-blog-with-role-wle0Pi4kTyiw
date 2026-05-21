import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import Avatar from '../components/Avatar';
import PropTypes from 'prop-types';

/**
 * ReadBlog page – shows blog post details, author info, edit/delete if permitted.
 *
 * @param {object} props
 * @param {object} props.user - Authenticated user object.
 * @param {function} props.onLogout - Logout handler.
 * @returns {React.ReactNode}
 */
function ReadBlog({ user, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Simulate fetching post by id
  useEffect(() => {
    setLoading(true);
    setError('');
    setPost(null);
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
            author: 'writespace Team',
            authorRole: 'admin',
            authorAvatar: '',
            date: '2024-06-01',
            coverImage: 'https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=800&q=80',
            ownerEmail: 'admin@writespace.com',
          },
          {
            id: 2,
            title: 'Getting Started Guide',
            summary: 'Learn how to create, edit, and share your first post on writespace.',
            content:
              'To get started, register an account, log in, and create your first post. Use the editor to write, format, and collaborate. When ready, publish and share your work with the world!',
            author: 'Jane Doe',
            authorRole: 'writer',
            authorAvatar: '',
            date: '2024-06-02',
            coverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
            ownerEmail: 'writer@writespace.com',
          },
          {
            id: 3,
            title: 'Collaboration Features',
            summary: 'Explore real-time collaboration and team workflows for writers.',
            content:
              'writespace enables real-time collaboration. Invite teammates, share drafts, and work together seamlessly. Manage roles and permissions for effective team workflows.',
            author: 'John Smith',
            authorRole: 'writer',
            authorAvatar: '',
            date: '2024-06-03',
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
        setPost(found);
        setLoading(false);
      } catch (err) {
        setError('Failed to load post.');
        setLoading(false);
      }
    }, 700);
  }, [id]);

  /**
   * Determine if user can edit/delete the post.
   * @returns {boolean}
   */
  function canEditOrDelete() {
    if (!user || !post) return false;
    if (user.role === 'admin') return true;
    if (user.email && post.ownerEmail && user.email === post.ownerEmail) return true;
    return false;
  }

  /**
   * Handle delete post.
   */
  async function handleDelete() {
    setDeleting(true);
    setError('');
    try {
      // Simulate async delete
      await new Promise(resolve => setTimeout(resolve, 700));
      navigate('/');
    } catch (err) {
      setError('Failed to delete post.');
    } finally {
      setDeleting(false);
    }
  }

  /**
   * Handle edit post.
   */
  function handleEdit() {
    navigate(`/posts/${post.id}/edit`);
  }

  return (
    <ProtectedRoute user={user}>
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1 min-h-screen bg-slate-900 text-slate-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-400 border-solid"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="text-red-400 text-lg">{error}</span>
              <a
                href="/"
                className="mt-6 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded transition"
              >
                Back to Home
              </a>
            </div>
          ) : (
            <article className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-4xl font-bold">{post.title}</h1>
                  {canEditOrDelete() && (
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded transition text-sm"
                        onClick={handleEdit}
                        aria-label="Edit post"
                        disabled={deleting}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleDelete}
                        disabled={deleting}
                        aria-label="Delete post"
                      >
                        {deleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-4 text-slate-400">{post.summary}</div>
                <div className="mb-8 text-slate-200 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
                <div className="flex items-center space-x-4 mt-8">
                  <Avatar
                    name={post.author}
                    avatar={post.authorAvatar}
                    role={post.authorRole}
                    size="sm"
                  />
                  <div>
                    <div className="font-semibold text-slate-100">{post.author}</div>
                    <div className="text-xs text-slate-400">{post.date}</div>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
      <footer className="w-full bg-slate-800 py-6 px-6 mt-auto">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between">
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

ReadBlog.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default ReadBlog;