// Dependencies/Modules
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

// Create express app
const app = express();

// Import models
const Galleries = require('./models/gallery.js');
const Subscribers = require('./models/subscriber.js');
const Members = require('./models/member.js');

// Set view engine
app.set('view engine', 'ejs');

// Express middleware to render static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse all requests for url encoded form data.
app.use(express.urlencoded({ extended: true }));

// Set up mongoose connection
mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true,useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('Connected to DB...');
});


// PAGES ENDPOINTS

// Home/index page end-point
app.get('/', (req, res) => {
  res.render('pages/index', {
    title: "Home", 
    tagline: "Welcome To Happy Travel",
    current: "pg-index"});
});

// Gallery end-point
app.get('/gallery', (req, res) => {
  res.render('pages/gallery', {
    title: "Gallery", 
    tagline: "Browse Through Our Destinations",
    current: "pg-gallery"});
});

// Subscribe end-point
app.get('/subscribe', (req, res) => {
  res.render('pages/subscribe', {
    title: "Subscribe - TOUR GUIDES", 
    tagline: "Sign-up To Our Newsletter",
    current: "pg-subscribe"});
});

// Gallery-item end-point
app.get('/gallery/:id', (req, res) => {
  Galleries.find({id: req.params.id}, (err,data) => {
    if (err || data.length===0) {
      res.send('Could not find ID');
    }
    else {
      res.render('pages/gallery-item', {
        title: "Location", 
        tagline: "Take A Closer Look",
        current: "pg-location"});
      console.log(req);
    }
  });  
});

// Admin end-point
app.get('/admin', (req, res) => {
  res.render('pages/admin', {
    title: "Subscribers", 
    tagline: "Our Subscribers",
    current: "pg-admin"});
});

// Team end-point
app.get('/team', (req, res) => {
  res.render('pages/team', {
    title: "Team - TOUR GUIDES", 
    tagline: "Meet The Team",
    current: "pg-team"})
});


// JSON ENDPOINTS

// Gallery 
app.get('/api/v0/gallery', (req, res) => {
  Galleries.find((err, data) => {
    if (err || data.length===0) {
      res.send('Could not retrieve gallery');
    }
    else {
      res.json(data);
    }
  });
});

// Gallery item
app.get('/api/v0/gallery/:id', (req, res) => {
  Galleries.find({id: req.params.id}, (err,data) => {
    if (err || data.length===0) {
      res.send('Could not find ID');
      console.log(err);
    }
    else {
      console.log(data);
      res.json(data);
    }
  });  
});

// Subscribers
app.get('/api/v0/subscribers', (req, res) => {
  Subscribers.find((err, data) => {
    if (err || data.length===0) {
      res.send('Could not retrieve subscribers');
    }
    else {
      res.json(data);
      console.log(data);
    }
  });
});

// Members. We are a group of 3 but i just made this JSON endpoint regardless even if we're not fetching from it
app.get('/api/v0/members', (req, res) => {
  Members.find((err, data) => {
    if (err || data.length===0) {
      res.send('Could not retrieve members');
    }
    else {
      res.json(data);
    }
  });
});

// Do something with form data
app.post('/subscribers', (req, res) => {
  const subscriber = new Subscribers(req.body);
  console.log(req.body);
  subscriber.save(error => {
    if (error) {
      res.status(500).send(error);
    }
    else {
      res.status(200).send(`<p>Thanks, ${req.body.usersName}! We'll send subscriber updates to ${req.body.email}.</p>`);
    }
  });  
});

// Return 404 when/if file is not found
app.use(function(req, res) {
  res.status(404);
  res.send('404: File Not Found');
});

// Set PORT variable with 3000 fallback if local variable is not found
const PORT = process.env.PORT || 3000;

// Listen on PORT and console.log PORT value
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});

