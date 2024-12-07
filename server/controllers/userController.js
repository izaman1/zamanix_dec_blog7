import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { generatePassphrase } from '../utils/generatePassphrase.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Special case for admin
    if (email === 'admin@zamanix.com') {
      return res.status(400).json({
        status: 'error',
        message: 'This email cannot be used for registration'
      });
    }

    // Generate unique passphrase
    const passphrase = generatePassphrase();

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      passphrase
    });

    res.status(201).json({
      status: 'success',
      message: 'Account created successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        passphrase: passphrase,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to create account'
    });
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, passphrase } = req.body;

    // Special case for admin
    if (email === 'admin@zamanix.com' && password === 'zamanix_admin') {
      return res.json({
        status: 'success',
        data: {
          _id: 'admin',
          name: 'Admin',
          email: 'admin@zamanix.com',
          token: 'admin_token'
        }
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check passphrase if provided
    if (passphrase && !user.verifyPassphrase(passphrase)) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid passphrase'
      });
    }

    res.json({
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error occurred'
    });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  }
});