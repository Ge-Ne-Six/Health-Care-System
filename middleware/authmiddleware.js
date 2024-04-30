const  jwt = require('jsonwebtoken');
const Patient = require('../models/pateint');
const notes = require('../models/notes');
const observation = require('../models/observationChart');
const drugChart = require('../models/drugChart');


/*---------user-middleware---------------*/
const pageAuth =  (req, res, next) =>{
  const token = req.cookies.ancopPatient;

  if(token){
    jwt.verify( token,'I dont like anime', async (err, decodedtoken) =>{
      if(err){
        console.log(err);
        res.redirect('/ANCOP/login');
        next();
      }
      else{
        console.log(decodedtoken);

        let user = await Patient.findById(decodedtoken.id);

        

        if(user){

          let patientID = user.patientID;

            let note  = await notes.find({patientID});
            let observations = await observation.find({patientID}); 

            let drugcharts  = await drugChart.find({patientID});

          res.locals = { user, note, observations, drugcharts };

          // req.user = decodedtoken.id  
        }else{
          res.redirect('/ANCOP/logout') 
        }

        next(); 
      }
    });
  }else{
    res.redirect('/ANCOP/login')
  }

};

/*--------ADMIN-MIDDLEWARE---------------*/ 

const adminPageAuth =  (req, res, next) =>{
  const token = req.cookies.ancopAdmin;

  if(token){
    jwt.verify( token,'Naruto is a bad ass', async (err, decodedtoken) =>{
      if(err){
        console.log(err);
        res.redirect('/ANCOP/admin/login');
        next();
      }
      else{
        console.log(decodedtoken);

        let users = await Patient.find();

        

        if(users){

          res.locals = { users };

          // req.user = decodedtoken.id  
        }else{
          res.redirect('/ANCOP/logout') 
        }

        next(); 
      }
    });
  }else{
    res.redirect('/ANCOP/admin/login')
  }

};


module.exports = {  pageAuth, adminPageAuth }