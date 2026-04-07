import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Blogcomponent } from '../components/Blogcomponent';
import { Loader2, BookOpen } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="relative min-h-screen">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="tag mb-4 inline-block">Writing</p>
          <h1 className="section-heading text-white mb-4">Blog & Articles</h1>
          <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">
            Thoughts, tutorials, and insights on development, technology, and everything in between.
          </p>
          <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="text-orange-400 animate-spin w-10 h-10" />
            <p className="text-white/30 text-sm">Loading articles…</p>
          </div>
        ) : blogs.length > 0 ? (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <Blogcomponent
                key={blog._id}
                id={blog._id}
                title={blog.Title}
                body={blog.Body}
                blog={blog.Blog}
                fetchData={fetchData}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="glass border border-white/8 rounded-2xl p-10 text-center">
              <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/30 text-sm">No articles yet. Come back soon!</p>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8 px-6 text-center">
        <p className="text-white/20 text-xs">© 2024 Bhuvaneshwaran. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Blogs;
