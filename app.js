const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes')


const app = express();

// const myDB = 'mongodb://127.0.0.1:27017/ANCOP';
const myDB = 'mongodb+srv://GX-movie-admin:Amaga2003@genesix.yplxhqc.mongodb.net/';

mongoose.connect(myDB)
.then(result => {
  app.listen(2000);
  console.log('Connected to the DB!');
})
.catch(err => {
  console.log(err.message);
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use(morgan('dev')); 

app.get('/ANCOP', (req,res)=>{
  res.render('index', {title: 'Home'})
});

app.use('/ANCOP', patientRoutes);

app.use('/ANCOP', adminRoutes);

app.use('/ANCOP', adminAuthRoutes);
 
app.use('/ANCOP' , authRoutes); 


app.use((req,res)=>{
  res.status(404).render('404'); 
  console.log(error.message); 
});