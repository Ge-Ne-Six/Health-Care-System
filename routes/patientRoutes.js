const express = require('express');
// const User = require('../models/user');
const path = require('path');
const  jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const multer = require('multer');
const {  pageAuth } = require('../middleware/authmiddleware');
const Patients = require('../models/pateint');
const notes = require('../models/notes');
const observation = require('../models/observationChart');
const drugChart = require('../models/drugChart');

const router = express.Router();



router.get('/patients/dashboard', pageAuth, async (req,res)=>{

 res.render('patients/userDashboard', { title: 'Dashboard' });
  
});

router.get('/patients/observationChart', pageAuth,  (req,res)=>{
  res.render('patients/observationChart', {title: 'Observation Chart'});
});


router.get('/patients/drugChart', pageAuth,  (req,res)=>{
             
 res.render('patients/drugChart', { title: 'Dashboard' });

});



module.exports = router;