'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Blog = mongoose.model('Blog'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Blog
 */
exports.create = function(req, res) {
  var blog = new Blog(req.body);
  blog.user = req.user;

  blog.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(blog);
    }
  });
};

/**
 * Show the current Blog
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var blog = req.blog ? req.blog.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  blog.isCurrentUserOwner = req.user && blog.user && blog.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(blog);
};

/**
 * Update a Blog
 */
exports.update = function(req, res) {
  var blog = req.blog ;

  blog = _.extend(blog , req.body);

  blog.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(blog);
    }
  });
};

/**
 * Delete an Blog
 */
exports.delete = function(req, res) {
  var blog = req.blog ;

  blog.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(blog);
    }
  });
};

/**
 * List of Blogs
 */
exports.list = function(req, res) { 
  Blog.find().sort('-created').populate('user', 'displayName').exec(function(err, blogs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(blogs);
    }
  });
};

/**
 * Blog middleware
 */
exports.blogByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Blog is invalid'
    });
  }

  Blog.findById(id).populate('user', 'displayName').exec(function (err, blog) {
    if (err) {
      return next(err);
    } else if (!blog) {
      return res.status(404).send({
        message: 'No Blog with that identifier has been found'
      });
    }
    req.blog = blog;
    next();
  });
};
