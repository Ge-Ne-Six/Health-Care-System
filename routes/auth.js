const express = require('express');
const Patients = require('../models/pateint');
const  jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const { handleErrors } = require('../middleware/all')
const multer = require('multer');

const router = express.Router();


function generateRandomAlphanumeric(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}


const maxAge = 1 * 24 * 60 * 60;

function createToken(id){
  return jwt.sign({id}, 'I dont like anime', { expiresIn: maxAge })
}






router.get('/login', (req,res)=>{
  res.render('authview/login', {title: 'Login'}) 
});

router.get('/Register', (req,res)=>{
  res.render('authview/signup', {title: 'Register'})
});

router.get('/logout', (req,res)=>{
  res.cookie('ancopPatient', '', { httpOnly: true, maxAge: 1 });
  res.redirect('/ANCOP/login')
});

router.post('/login', async (req,res)=>{
  const {patient, password} = req.body;

  try{
    const log = await Patients.login({patient, password});

    
    const token = createToken(log._id);

    res.cookie('ancopPatient', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: log._id });

  }
  catch(err){
    const errors = handleErrors(err);
    
    res.status(404).json({errors});

    console.log(err.message); 
  }
});

router.post('/Register', async (req,res)=>{
  const {email, password, type, gender, dob, age, firstname, lastname, phonenumber} = req.body;

  const patientID = 'anc' + generateRandomAlphanumeric(5);

  try{

    await Patients.create({email, password, type, gender, dob, age, patientID, firstname, lastname, phonenumber});

    res.json({ message: 'Account Created!' });

  }
  catch(err){

    const errors = handleErrors(err);
    
    res.status(404).json({errors})

    console.log(err)

  }

  console.log({email, password, type, gender, dob, age, patientID});
});

module.exports = router 