const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seeds data
const dbGallerySeed = require(`./seeds/galleries.js`);
const dbMemberSeed = require(`./seeds/members.js`);
const dbSubscriberSeed = require(`./seeds/subscribers.js`);

// Define models
const Gallery = require(`./models/gallery.js`);
const Member = require(`./models/member.js`);
const Subscriber = require(`./models/subscriber.js`);

/*******************************/
/* Mongoose/MongoDB Connection */
/*******************************/

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to DB...');

});

// Create/insert Gallery
// Gallery.insertMany(dbGallerySeed, (error, member) => {
//   console.log('Data import completed.')
//   mongoose.connection.close();
// });

// Create/insert members
// Member.insertMany(dbMemberSeed, (error, member) => {
//   console.log('Data import completed.')
//   mongoose.connection.close();
// });

//Create/insert subscribers
Subscriber.insertMany(dbSubscriberSeed, (error, subscriber) => {
  console.log('Data import completed.')
  mongoose.connection.close();
});