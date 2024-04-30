const mongoose = require('mongoose');

const Schema = mongoose.Schema

const observationChart = new Schema({
  patientID:{ type: String },
  time:{ type: String },
  temperature:{ type: String },
  pulse:{ type: String },
  bloodpressure:{ type: String },
  registration:{ type: String },
  remark:{ type: String },
  date:{
    type: String,
  }
});

const observation = mongoose.model('observation', observationChart);

module.exports = observation;