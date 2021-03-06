'use strict';

const mongoose = require('mongoose');

const fishingLogSchema = new mongoose.Schema({
  place_name: {
    type: String,
    required: true,
  },
  location: {
    lat: Number,
    lng: Number,
    address: String,
    required: false,
  },
  species: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date, 
    default: Date.now,
    required: true,
  },
  end_date: {
    type: Date, 
    default: Date.now,
    required: true,
  },
  weather: {
     type: String,
     required: false
  },
  bait: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  comments: {
    type: String, 
    required: false
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
});

const FishingLog = mongoose.model('FishingLog', fishingLogSchema);

module.exports = FishingLog;
