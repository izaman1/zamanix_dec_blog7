import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { MessageSquare, ThumbsUp, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: string[]; // Array of user IDs who liked the comment
}

interface BlogCommentsProps {
  blogId: string;
  comments: Comment[];
  onAddComment: (content: string) => void;
  onDeleteComment: (commentId: string) => void;
  onLikeComment: (commentId: string) => void;
}

export default function BlogComments({ 
  blogId, 
  comments, 
  onAddComment, 
  onDeleteComment,
  onLikeComment 
}: BlogCommentsProps) {
  const { user } = useUser();
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    onAddComment(newComment.trim());
    setNewComment('');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <MessageSquare className="h-8 w-8 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 mb-2">Please login to join the discussion</p>
        <p className="text-sm text-gray-500">Share your thoughts with our community</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Add a Comment
          </label>
          <textarea
            id="comment"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="bg-black text-white px-6 py-2 text-sm tracking-wider hover:bg-black/90 transition-colors disabled:bg-gray-300"
        >
          POST COMMENT
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">
          Comments ({comments.length})
        </h3>
        
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Be the first to comment on this post
          </p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{comment.userName}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                  {user.email === comment.userId && (
                    <button
                      onClick={() => onDeleteComment(comment.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="text-gray-800 mb-4">{comment.content}</p>
                <button
                  onClick={() => onLikeComment(comment.id)}
                  className={`flex items-center space-x-1 text-sm ${
                    comment.likes.includes(user.email)
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.likes.length}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}