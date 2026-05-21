import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import PublicNavbar from '../components/PublicNavbar';

/**
 * LandingPage component – public landing page with hero, features, latest posts preview, and footer.
 *
 * @returns {React.ReactNode}
 */
function LandingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching latest posts
  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulated async fetch
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
            href: '/posts/welcome',
          },
          {
            id: 2,
            title: 'Getting Started Guide',
            summary: 'Learn how to create, edit, and share your first post on writespace.',
            author: 'Jane Doe',
            date: '2024-06-02',
            coverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
            href: '/posts/getting-started',
          },
          {
            id: 3,
            title: 'Collaboration Features',
            summary: 'Explore real-time collaboration and team workflows for writers.',
            author: 'John Smith',
            date: '2024-06-03',
            coverImage: 'https://images.unsplash.com/photo-1503676382389-2d6b3c9e3f36?auto=format&fit=crop&w=400&q=80',
            href: '/posts/collaboration',
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts.');
        setLoading(false);
      }
    }, 800);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <PublicNavbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-6 bg-slate-900">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          Welcome to <span className="text-sky-400">writespace</span>
        </h1>
        <p className="text-lg text-slate-400 mb-8 text-center max-w-xl">
          A modern writing space for creators, teams, and storytellers. Write, collaborate, and publish with ease.
        </p>
        <div className="flex space-x-4">
          <a
            href="/register"
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded font-semibold transition shadow"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded font-semibold transition shadow"
          >
            Login
          </a>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-700 rounded-lg p-6 flex flex-col items-center shadow hover:bg-slate-600 transition">
              <span className="text-sky-400 text-4xl mb-3">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19h16M4 5h16M4 5v14M20 5v14"></path></svg>
              </span>
              <h3 className="text-xl font-semibold mb-2">Clean Editor</h3>
              <p className="text-slate-300 text-center">Enjoy distraction-free writing with a minimalist, powerful editor.</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 flex flex-col items-center shadow hover:bg-slate-600 transition">
              <span className="text-emerald-400 text-4xl mb-3">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6M12 4v6M6 12h12"></path></svg>
              </span>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-slate-300 text-center">Invite others, share drafts, and work together in real time.</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 flex flex-col items-center shadow hover:bg-slate-600 transition">
              <span className="text-yellow-400 text-4xl mb-3">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-2 2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"></path></svg>
              </span>
              <h3 className="text-xl font-semibold mb-2">Publish & Share</h3>
              <p className="text-slate-300 text-center">Publish your work, share with the world, and grow your audience.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Posts Section */}
      <section className="py-12 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Latest Posts</h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-400 border-solid"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <span className="text-red-400 text-lg">{error}</span>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map(post => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  summary={post.summary}
                  author={post.author}
                  date={post.date}
                  coverImage={post.coverImage}
                  href={post.href}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Footer */}
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

export default LandingPage;