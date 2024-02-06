// Require necessary modules
const mongoose = require('mongoose') // Mongoose for MongoDB interaction
const shortId = require('shortid') // shortid for generating short IDs

// Define the schema for ShortUrl documents
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String, // Field for the original (full) URL
    required: true // It's required for each ShortUrl document
  },
  short: {
    type: String, // Field for the short URL
    required: true, // It's required for each ShortUrl document
    default: shortId.generate // Generate a short ID using shortid package by default
  },
  clicks: {
    type: Number, // Field for the number of clicks on the short URL
    required: true, // It's required for each ShortUrl document
    default: 0 // Default value for clicks is 0
  }
})

// Export the model, which represents ShortUrl documents
module.exports = mongoose.model('ShortUrl', shortUrlSchema)