// Require necessary modules
const express = require('express') // Express.js for creating web server
const mongoose = require('mongoose') // Mongoose for MongoDB interaction
const ShortUrl = require('./models/shortUrl') // Importing ShortUrl model
const app = express() // Creating Express application

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, // Specify options for MongoDB connection
  useUnifiedTopology: true
})

// Set up view engine as EJS
app.set('view engine', 'ejs')

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }))

// Route to handle GET requests to the root URL
app.get('/', async (req, res) => {
  // Retrieve all shortUrls from the database
  const shortUrls = await ShortUrl.find()
  // Render 'index' view and pass shortUrls data to it
  res.render('index', { shortUrls: shortUrls })
})

// Route to handle POST requests to create short URLs
app.post('/shortUrls', async (req, res) => {
  // Create a new ShortUrl document in the database
  await ShortUrl.create({ full: req.body.fullUrl })
  // Redirect back to the root URL after creating the short URL
  res.redirect('/')
})

// Route to handle GET requests to short URLs
app.get('/:shortUrl', async (req, res) => {
  // Find the ShortUrl document associated with the short URL
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  // If the shortUrl doesn't exist, send 404 Not Found status
  if (shortUrl == null) return res.sendStatus(404)

  // Increment the click count for the short URL
  shortUrl.clicks++
  // Save the updated shortUrl document
  shortUrl.save()

  // Redirect to the original (full) URL associated with the short URL
  res.redirect(shortUrl.full)
})

// Start the Express server, listen on port specified in environment variable or default to 5000
app.listen(process.env.PORT || 5000)