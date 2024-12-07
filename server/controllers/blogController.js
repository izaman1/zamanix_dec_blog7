import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import Blog from '../models/Blog.js';

// Get all blog posts
export const getBlogs = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments()
    ]);

    res.json({
      status: 'success',
      data: {
        blogs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          total,
          hasMore: skip + blogs.length < total
        }
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blogs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single blog post by slug or ID
export const getBlogBySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Try to find by slug first
    let blog = await Blog.findOne({ slug }).lean();
    
    // If not found by slug, try to find by ID
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug).lean();
    }
    
    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
    }

    res.json({
      status: 'success',
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Create blog post
export const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, content, author, category, tags } = req.body;
    let imageData = {};

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blog_images',
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        });
        
        imageData = {
          url: result.secure_url,
          publicId: result.public_id,
          ...JSON.parse(req.body.imageOptions || '{}')
        };
        
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        throw new Error('Failed to upload image');
      }
    }

    const blog = await Blog.create({
      title,
      content,
      author,
      category,
      tags: tags ? JSON.parse(tags) : [],
      image: imageData
    });

    res.status(201).json({
      status: 'success',
      data: blog
    });
  } catch (error) {
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting temporary file:', unlinkError);
      }
    }

    res.status(error.status || 500).json({
      status: 'error',
      message: error.message || 'Failed to create blog post',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Update blog post
export const updateBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
    }

    let imageData = blog.image;
    if (req.file) {
      try {
        if (blog.image?.publicId) {
          await cloudinary.uploader.destroy(blog.image.publicId);
        }
        
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blog_images',
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        });
        
        imageData = {
          url: result.secure_url,
          publicId: result.public_id,
          ...JSON.parse(req.body.imageOptions || '{}')
        };
        
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        throw new Error('Failed to upload image');
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: imageData,
        tags: req.body.tags ? JSON.parse(req.body.tags) : blog.tags
      },
      { new: true }
    );

    res.json({
      status: 'success',
      data: updatedBlog
    });
  } catch (error) {
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting temporary file:', unlinkError);
      }
    }

    res.status(error.status || 500).json({
      status: 'error',
      message: error.message || 'Failed to update blog post',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Delete blog post
export const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
    }

    if (blog.image?.publicId) {
      await cloudinary.uploader.destroy(blog.image.publicId);
    }

    await blog.deleteOne();

    res.json({
      status: 'success',
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Blog deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete blog post',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});