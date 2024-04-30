const mongoose = require('mongoose');

const Schema = mongoose.Schema

const drugChart = new Schema({
  patientID:{ type: String},
  drug:{ type: String },
  dose:{ type: String },
  frequency:{ type: String },
  route:{ type: String },
  duration:{ type: String },
  time:{ type: String },
  prescriber:{ type: String },
  date:{ type: String }
});

const drugs = mongoose.model('drugChart', drugChart);

module.exports = drugs;