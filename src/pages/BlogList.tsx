import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { fetchBlogs, type Blog } from '../services/api';

export default function BlogList() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isAdmin = user?.email === 'admin@zamanix.com';

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const { data, error: apiError } = await fetchBlogs();

      if (apiError) {
        throw new Error(apiError);
      }

      if (data?.data.blogs) {
        setBlogs(data.data.blogs);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadBlogs}
              className="bg-black text-white px-6 py-3 text-sm tracking-wider hover:bg-black/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-semibold">Blog</h1>
          {isAdmin && (
            <Link
              to="/admin/blog"
              className="bg-black text-white px-4 py-2 md:px-6 md:py-3 text-sm tracking-wider hover:bg-black/90 transition-colors"
            >
              CREATE POST
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog._id} className="group">
              <Link to={`/blog/${blog.slug}`}>
                {blog.image?.url && (
                  <div className="overflow-hidden">
                    <img
                      src={blog.image.url}
                      alt={blog.title}
                      className="w-full h-48 md:h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-1 md:mb-2">
                    {new Date(blog.createdAt).toLocaleDateString()} •{' '}
                    {blog.category}
                  </div>
                  <h2 className="text-lg md:text-xl font-light mb-1 md:mb-2 group-hover:text-gray-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 md:line-clamp-3">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              {isAdmin && (
                <div className="mt-4">
                  <Link
                    to={`/admin/blog/edit/${blog._id}`}
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    Edit Post
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
