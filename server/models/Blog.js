import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    url: String,
    publicId: String,
    alignment: {
      type: String,
      enum: ['left', 'center', 'right'],
      default: 'center'
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large', 'full'],
      default: 'full'
    }
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Jewelry Care', 'Style Guide', 'Behind the Scenes', 'News']
  },
  tags: [{
    type: String,
    trim: true
  }],
  slug: {
    type: String,
    unique: true
  },
  comments: [{
    userId: String,
    userName: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    likes: [String] // Array of user IDs who liked the comment
  }]
}, {
  timestamps: true
});

// Create URL-friendly slug from title
blogSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('title')) {
    this.slug = `${this._id.toString().slice(0, 6)}-${this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')}`;
  }
  next();
});

export default mongoose.model('Blog', blogSchema);