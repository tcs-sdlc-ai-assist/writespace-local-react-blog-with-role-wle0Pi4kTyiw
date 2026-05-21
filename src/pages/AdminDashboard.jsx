import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import BlogCard from '../components/BlogCard';
import UserRow from '../components/UserRow';
import PropTypes from 'prop-types';

/**
 * AdminDashboard page – admin-only dashboard with stats, recent posts, and quick actions.
 *
 * @param {object} props
 * @param {object} props.user - Authenticated user object.
 * @param {function} props.onLogout - Logout handler.
 * @returns {React.ReactNode}
 */
function AdminDashboard({ user, onLogout }) {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    activeWriters: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState('');

  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState('');

  const [recentUsers, setRecentUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState('');

  // Simulate fetching stats
  useEffect(() => {
    setLoadingStats(true);
    setStatsError('');
    setTimeout(() => {
      try {
        setStats({
          totalPosts: 42,
          totalUsers: 17,
          activeWriters: 12,
        });
        setLoadingStats(false);
      } catch (err) {
        setStatsError('Failed to load stats.');
        setLoadingStats(false);
      }
    }, 600);
  }, []);

  // Simulate fetching recent posts
  useEffect(() => {
    setLoadingPosts(true);
    setPostsError('');
    setTimeout(() => {
      try {
        setRecentPosts([
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
        setLoadingPosts(false);
      } catch (err) {
        setPostsError('Failed to load recent posts.');
        setLoadingPosts(false);
      }
    }, 700);
  }, []);

  // Simulate fetching recent users
  useEffect(() => {
    setLoadingUsers(true);
    setUsersError('');
    setTimeout(() => {
      try {
        setRecentUsers([
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
        setLoadingUsers(false);
      } catch (err) {
        setUsersError('Failed to load recent users.');
        setLoadingUsers(false);
      }
    }, 700);
  }, []);

  /**
   * Handle create new post action.
   */
  function handleCreatePost() {
    window.location.href = '/posts/new';
  }

  /**
   * Handle manage users action.
   */
  function handleManageUsers() {
    window.location.href = '/admin/users';
  }

  /**
   * Handle edit user (simulate navigation).
   * @param {string} email
   */
  function handleEditUser(email) {
    window.location.href = `/admin/users/${encodeURIComponent(email)}/edit`;
  }

  /**
   * Handle delete user (simulate async).
   * @param {string} email
   */
  async function handleDeleteUser(email) {
    // Simulate async delete
    setRecentUsers(prev =>
      prev.map(u =>
        u.email === email ? { ...u, deleting: true } : u
      )
    );
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setRecentUsers(prev =>
        prev.filter(u => u.email !== email)
      );
    } catch (err) {
      // Error handling: show error in usersError
      setUsersError('Failed to delete user.');
      setRecentUsers(prev =>
        prev.map(u =>
          u.email === email ? { ...u, deleting: false } : u
        )
      );
    }
  }

  return (
    <ProtectedRoute user={user} allowedRoles={['admin']}>
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1 min-h-screen bg-slate-900 text-slate-100 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <button
                type="button"
                className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded font-semibold transition shadow"
                onClick={handleCreatePost}
              >
                Create New Post
              </button>
              <button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded font-semibold transition shadow"
                onClick={handleManageUsers}
              >
                Manage Users
              </button>
            </div>
          </div>
          {/* Stats Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
            {loadingStats ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-sky-400 border-solid"></div>
              </div>
            ) : statsError ? (
              <div className="text-red-400 text-sm text-center mb-4">{statsError}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                  label="Total Posts"
                  value={stats.totalPosts}
                  icon={
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19h16M4 5h16M4 5v14M20 5v14"></path></svg>
                  }
                  color="sky"
                />
                <StatCard
                  label="Total Users"
                  value={stats.totalUsers}
                  icon={
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M7 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"></path></svg>
                  }
                  color="emerald"
                />
                <StatCard
                  label="Active Writers"
                  value={stats.activeWriters}
                  icon={
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6M12 4v6M6 12h12"></path></svg>
                  }
                  color="yellow"
                />
              </div>
            )}
          </section>
          {/* Recent Posts Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
            {loadingPosts ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-sky-400 border-solid"></div>
              </div>
            ) : postsError ? (
              <div className="text-red-400 text-sm text-center mb-4">{postsError}</div>
            ) : recentPosts.length === 0 ? (
              <div className="text-slate-400 text-center py-8">No recent posts found.</div>
            ) : (
              <div className="space-y-6">
                {recentPosts.map(post => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    summary={post.summary}
                    author={post.author}
                    date={post.date}
                    coverImage={post.coverImage}
                    href={`/posts/${post.id}`}
                  />
                ))}
              </div>
            )}
          </section>
          {/* Recent Users Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
            {loadingUsers ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-emerald-400 border-solid"></div>
              </div>
            ) : usersError ? (
              <div className="text-red-400 text-sm text-center mb-4">{usersError}</div>
            ) : recentUsers.length === 0 ? (
              <div className="text-slate-400 text-center py-8">No recent users found.</div>
            ) : (
              <div className="space-y-4">
                {recentUsers.map(userRow => (
                  <UserRow
                    key={userRow.email}
                    name={userRow.name}
                    email={userRow.email}
                    role={userRow.role}
                    avatar={userRow.avatar}
                    active={userRow.active}
                    onEdit={() => handleEditUser(userRow.email)}
                    onDelete={
                      userRow.deleting
                        ? undefined
                        : () => handleDeleteUser(userRow.email)
                    }
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="w-full bg-slate-800 py-6 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
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

AdminDashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default AdminDashboard;