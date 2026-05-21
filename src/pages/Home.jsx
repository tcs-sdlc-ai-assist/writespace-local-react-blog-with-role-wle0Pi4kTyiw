import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import PropTypes from 'prop-types';

/**
 * HomePage component – authenticated blog list page.
 * Shows all posts, allows CRUD per role/ownership.
 *
 * @param {object} props
 * @param {object} props.user - Authenticated user object.
 * @param {function} props.onLogout - Logout handler.
 * @returns {React.ReactNode}
 */
function Home({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Simulate fetching all posts
  useEffect(() => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      try {
        setPosts([
          {
            id: 1,
            title: 'Welcome to writespace',
            summary: 'Discover a modern writing platform for creators, writers, and teams.',
            author: 'writespace Team',
            date: '2024-06-01',
            coverImage: 'https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=400&q=80',
            ownerEmail: 'admin@writespace.com',
          },
          {
            id: 2,
            title: 'Getting Started Guide',
            summary: 'Learn how to create, edit, and share your first post on writespace.',
            author: 'Jane Doe',
            date: '2024-06-02',
            coverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
            ownerEmail: 'writer@writespace.com',
          },
          {
            id: 3,
            title: 'Collaboration Features',
            summary: 'Explore real-time collaboration and team workflows for writers.',
            author: 'John Smith',
            date: '2024-06-03',
            coverImage: 'https://images.unsplash.com/photo-1503676382389-2d6b3c9e3f36?auto=format&fit=crop&w=400&q=80',
            ownerEmail: 'writer@writespace.com',
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts.');
        setLoading(false);
      }
    }, 800);
  }, []);

  /**
   * Determine if user can edit/delete a post.
   * @param {object} post
   * @returns {boolean}
   */
  function canEditOrDelete(post) {
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (user.email && post.ownerEmail && user.email === post.ownerEmail) return true;
    return false;
  }

  /**
   * Handle delete post.
   * @param {number} id
   */
  async function handleDelete(id) {
    setDeletingId(id);
    setError('');
    try {
      // Simulate async delete
      await new Promise((resolve) => setTimeout(resolve, 700));
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError('Failed to delete post.');
    } finally {
      setDeletingId(null);
    }
  }

  /**
   * Handle edit post.
   * @param {number} id
   */
  function handleEdit(id) {
    // Simulate navigation to edit page
    window.location.href = `/posts/${id}/edit`;
  }

  /**
   * Handle create new post.
   */
  function handleCreate() {
    window.location.href = '/posts/new';
  }

  return (
    <ProtectedRoute user={user}>
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1 min-h-screen bg-slate-900 text-slate-100 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">All Posts</h1>
            <button
              type="button"
              className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded font-semibold transition shadow"
              onClick={handleCreate}
            >
              Create New Post
            </button>
          </div>
          {error && (
            <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
          )}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-400 border-solid"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="text-slate-400 text-lg">No posts found.</span>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map(post => (
                <div key={post.id} className="relative">
                  <BlogCard
                    title={post.title}
                    summary={post.summary}
                    author={post.author}
                    date={post.date}
                    coverImage={post.coverImage}
                    href={`/posts/${post.id}`}
                  />
                  {canEditOrDelete(post) && (
                    <div className="absolute top-6 right-6 flex space-x-2">
                      <button
                        type="button"
                        className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded transition text-sm"
                        onClick={() => handleEdit(post.id)}
                        aria-label="Edit post"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm ${deletingId === post.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        aria-label="Delete post"
                      >
                        {deletingId === post.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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

Home.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Home;