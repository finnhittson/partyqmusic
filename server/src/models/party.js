// Party model
const mongoose = require('mongoose');

const a = {}

const PartySchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['local', 'remote'],
    required: true,
  },
  host: String,
  attendees: {
    type: [String],
    default: []
  },
});

const PartyModel = mongoose.model('Party', PartySchema);
 
module.exports = { PartyModel };