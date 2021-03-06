var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
    unique: false
  },

  photoId: {
    type: String,
    required: true,
    unique: false
  },

  timestamp: {
    type: Number,
    required: true,
    unique: true
  },

  TTL: {
    type: Number,
    required: true,
    unique: false
  },

  radius: {
    type: Number,
    required: true,
    unique: false
  },

  x: {
    type: Number,
    required: true,
    unique: false
  },

  y: {
    type: Number,
    required: true,
    unique: false
  },

  recipientList: {
    type: Array,
    required: false,
    unique: false
  }

});

module.exports = mongoose.model('Event', EventSchema);


