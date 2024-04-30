const mongoose = require('mongoose');

const Schema = mongoose.Schema

const newNotes = new Schema({
  patientID:{ type: String},
  author:{ type: String },
  note:{ type: String },
  diagnosis:{ type: String },
  date:{ type: String }
});

const notes = mongoose.model('note', newNotes);

module.exports = notes;