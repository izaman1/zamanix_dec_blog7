import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogBySlug } from '../services/api';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import BlogComments from '../components/BlogComments';
import { useUser } from '../context/UserContext';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: string[];
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: {
    url: string;
    publicId?: string;
    alignment?: 'left' | 'center' | 'right';
    size?: 'small' | 'medium' | 'large' | 'full';
  };
  author: string;
  category: string;
  tags: string[];
  createdAt: string;
  comments: Comment[];
}

export default function BlogPost() {
  const { slug } = useParams();
  const { user } = useUser();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBlog = async () => {
    if (!slug) return;

    setLoading(true);
    const { data, error } = await fetchBlogBySlug(slug);

    if (error) {
      setError(error);
    } else if (data?.data) {
      setBlog({
        ...data.data,
        comments: data.data.comments || [],
        tags: data.data.tags || [],
      });
      setError('');
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBlog();
  }, [slug]);

  const handleAddComment = async (content: string) => {
    if (!blog || !user) return;

    const newComment = {
      id: Date.now().toString(),
      userId: user.email,
      userName: user.name,
      content,
      createdAt: new Date().toISOString(),
      likes: [],
    };

    setBlog({
      ...blog,
      comments: [...blog.comments, newComment],
    });
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!blog || !user) return;

    setBlog({
      ...blog,
      comments: blog.comments.filter((comment) => comment.id !== commentId),
    });
  };

  const handleLikeComment = async (commentId: string) => {
    if (!blog || !user) return;

    setBlog({
      ...blog,
      comments: blog.comments.map((comment) => {
        if (comment.id === commentId) {
          const hasLiked = comment.likes.includes(user.email);
          return {
            ...comment,
            likes: hasLiked
              ? comment.likes.filter((id) => id !== user.email)
              : [...comment.likes, user.email],
          };
        }
        return comment;
      }),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="h-[200px] md:h-[500px] bg-gray-200 rounded"></div>
            <div className="space-y-2 md:space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-8 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <div className="space-x-4">
              <button
                onClick={loadBlog}
                className="bg-black text-white px-6 py-2 md:py-3 text-sm tracking-wider hover:bg-black/90 transition-colors"
              >
                Try Again
              </button>
              <Link
                to="/blog"
                className="inline-block bg-gray-100 text-gray-800 px-6 py-2 md:py-3 text-sm tracking-wider hover:bg-gray-200 transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const getImageClassName = () => {
    const alignmentClasses = {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto',
    };

    const sizeClasses = {
      small: 'max-w-md',
      medium: 'max-w-2xl',
      large: 'max-w-4xl',
      full: 'w-full',
    };

    return `${alignmentClasses[blog.image?.alignment || 'center']} ${
      sizeClasses[blog.image?.size || 'full']
    }`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="md:hidden bg-white sticky top-0 z-10 border-b">
        <div className="px-4 py-3 flex items-center">
          <Link to="/blog" className="text-gray-600 hover:text-black">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <span className="ml-3 text-sm font-medium">{blog.category}</span>
        </div>
      </div>

      <article className="py-6 md:py-24">
        {/* Desktop Category & Back Link */}
        <div className="hidden md:block max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Link to="/blog" className="hover:text-black flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>
            <span>•</span>
            <span>{blog.category}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title & Meta */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-4xl font-light mb-4 md:mb-6">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {blog.author}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image?.url && (
            <div className="mb-6 md:mb-12">
              <div className={getImageClassName()}>
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  className="w-full h-[200px] md:h-[500px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ 
              __html: blog.content
            }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-6 md:mt-12 pt-8 border-t">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="h-4 w-4 text-gray-600" />
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-8 md:mt-12 pt-8 border-t">
            <BlogComments
              blogId={blog._id}
              comments={blog.comments}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              onLikeComment={handleLikeComment}
            />
          </div>

          {/* Share & Actions */}
          <div className="mt-8 md:mt-12 pt-8 border-t">
            <div className="flex justify-between items-center">
              <Link
                to="/blog"
                className="text-sm text-gray-600 hover:text-black transition-colors flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}