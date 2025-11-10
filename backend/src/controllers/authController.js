const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};

/**
 * Register new user
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'Registration failed',
        message: 'Email already registered'
      });
    }
    
    // Create new user
    const user = new User({
      email,
      passwordHash: password, // Will be hashed by pre-save hook
      name,
      age
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user and token
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'Registration failed',
        message: 'Email already registered'
      });
    }
    
    res.status(500).json({
      error: 'Registration failed',
      message: 'An error occurred during registration'
    });
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Invalid email or password'
      });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Invalid email or password'
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user and token
    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'An error occurred during login'
    });
  }
};

/**
 * Get current user
 * GET /api/auth/me
 */
exports.getCurrentUser = async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    res.json({
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      error: 'Failed to get user',
      message: 'An error occurred'
    });
  }
};

/**
 * Update user profile
 * PATCH /api/auth/profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, age, settings } = req.body;
    const userId = req.userId;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (age) updateData.age = age;
    if (settings) updateData.settings = { ...req.user.settings, ...settings };
    
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-passwordHash');
    
    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Update failed',
      message: 'An error occurred while updating profile'
    });
  }
};

/**
 * Change password
 * POST /api/auth/change-password
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;
    
    // Get user with password
    const user = await User.findById(userId);
    
    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Password change failed',
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.passwordHash = newPassword; // Will be hashed by pre-save hook
    await user.save();
    
    res.json({
      message: 'Password changed successfully'
    });
    
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: 'Password change failed',
      message: 'An error occurred while changing password'
    });
  }
};

/**
 * Logout (client-side token removal)
 * POST /api/auth/logout
 */
exports.logout = async (req, res) => {
  // With JWT, logout is handled client-side by removing the token
  // This endpoint exists for consistency and future token blacklisting
  res.json({
    message: 'Logout successful'
  });
};
