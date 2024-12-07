import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';
import { useUser } from '../context/UserContext';
import RichTextEditor from '../components/RichTextEditor';
import { sanitizeContent } from '../utils/sanitize';

interface ImageOptions {
  alignment: 'left' | 'center' | 'right';
  size: 'small' | 'medium' | 'large' | 'full';
}

export default function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    tags: '',
  });
  const [imageOptions, setImageOptions] = useState<ImageOptions>({
    alignment: 'center',
    size: 'full'
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.email !== 'admin@zamanix.com') {
      navigate('/');
      return;
    }
    fetchBlog();
  }, [id, user, navigate]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      const { data } = await response.json();

      if (data) {
        setFormData({
          title: data.title || '',
          content: data.content || '',
          author: data.author || '',
          category: data.category || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
        });

        if (data.image?.url) {
          setPreview(data.image.url);
        }
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to fetch blog post');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        setImage(file);
        setError('');
      } catch (err) {
        setError('Failed to process image');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === 'tags' && formData[key]) {
          const tagsArray = formData[key].split(',').map((tag) => tag.trim());
          formDataToSend.append('tags', JSON.stringify(tagsArray));
        } else if (key === 'content') {
          formDataToSend.append('content', sanitizeContent(formData[key]));
        } else {
          formDataToSend.append(key, formData[key as keyof typeof formData]);
        }
      });

      formDataToSend.append('imageOptions', JSON.stringify(imageOptions));

      if (image) {
        formDataToSend.append('image', image);
      }

      const response = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update blog post');
      }

      navigate('/blog');
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to update blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete blog post');
      }

      navigate('/blog');
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete blog post');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user || user.email !== 'admin@zamanix.com') {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-light">Edit Blog Post</h1>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 text-white px-6 py-2 text-sm tracking-wider hover:bg-red-700 transition-colors disabled:bg-red-400"
          >
            {isDeleting ? 'Deleting...' : 'Delete Post'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Featured Image (Max 5MB)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
          </div>

          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="max-w-xl mx-auto rounded" />
            </div>
          )}

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              required
              value={formData.author}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              <option value="">Select a category</option>
              <option value="Jewelry Care">Jewelry Care</option>
              <option value="Style Guide">Style Guide</option>
              <option value="Behind the Scenes">Behind the Scenes</option>
              <option value="News">News</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g., diamonds, wedding, trends"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-black/90 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
        </form>
      </div>
    </div>
  );
}