const express = require('express');
const observation = require('../models/observationChart');
const notes = require('../models/notes');
const drugs = require('../models/drugChart');
const cookie = require('cookie-parser');
const { adminPageAuth } = require('../middleware/authmiddleware');
const patient = require('../models/pateint');




const router = express.Router();


router.get('/admin/dash', adminPageAuth, async (req,res) => {


    res.render('admindash.ejs');
}); 

router.get('/adminView/:id', adminPageAuth, async (req,res)=>{
  const id = req.params.id;

  try{
    const user = await patient.findById(id);

    res.render('adminUser-view', { user } )
  }
  catch(err){
    console.log(err.message)
  }

});


router.post('/admindash/observation', async (req,res)=>{

  const {date,time,temperature,pulse,bloodpressure,registration,remark,patientID} = req.body;

  try{

    let chart = await observation.create({date,time,temperature,pulse,bloodpressure,registration,remark,patientID});

    res.status(200).json({result: 'upload was successful'});

  }
  catch(err){
    console.log(err); 
  }

});


router.post('/admindash/note', async (req,res)=>{
  const {patientID, author, note, diagnosis, date} = req.body;

  try{

    await notes.create({patientID, author, note, diagnosis, date});

    res.status(200).json({ result: 'upload successful' })

  }
  catch(err){
    console.log(err.message)
    res.status(500).json({ result: 'upload not successful' })
  }
});

router.post('/admindash/drugchart', async (req,res)=>{

  const { drug, dose, frequency, route, duration, time, prescriber, date, patientID } = req.body;

  try{

    await drugs.create({ drug, dose, frequency, route, duration, time, prescriber, date, patientID });

    res.status(200).json({ result: 'upload successful' })

  }
  catch(err){
    console.log(err.message)
    res.status(500).json({ result: 'upload not successful' })
  }

});

















module.exports = router