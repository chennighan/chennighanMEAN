'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Blog Schema
 */
var BlogSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please enter a Blog name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: 'Please enter a Blog description'
  },
});

mongoose.model('Blog', BlogSchema);
