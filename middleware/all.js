const  jwt = require('jsonwebtoken');
const Patients = require('../models/pateint');
// const path = require('path');

function isPhone(){

  const regex = /^(\+234|234|0)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907)([0-9]{7})$/;

  if(regex.test(this.phonenumber)){
    return this.phonenumber;
  }
  throw Error('Invalid Phone Number')
}



function isEmail(){

  const regex = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/;

  if(regex.test(this.email)){
    return this.email;
  }
  throw Error('Please enter a valid email!')
}



function handleErrors(err) {
  let errors = { email: '', phonenumber: '',  password: ''}

  

  if(err.message === 'Incorrect Password'){
    errors.password = 'Incorrect Password';
  }

  if(err.message === 'Please enter Your Password'){
    errors.password = 'Please enter Your Password';
  }


  if(err.message === 'This Patient is not registered'){
    errors.email = 'This Patient is not registered';
  }

  if(err.message === 'This Field cant be empty'){
    errors.email = 'This Field cant be empty';
  }

  if(err.message === 'Please enter your email'){
    errors.email = 'Please enter your email';
  }
  if(err.message === 'Please enter your password'){
    errors.password = 'Please enter your password';
  }
  if(err.code === 11000){
    if(err.message.includes('email_1 dup key')){
      errors.email = 'This Email is Already Registered!'
    }
    if(err.message.includes('phonenumber_1 dup key')){
      errors.phonenumber = 'This PhoneNumber is Already Registered!'
    }
  }

  if(err.message.includes('admin validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {

      errors[properties.path] = properties.message;

    })
  }  

  return errors;
}




module.exports = { isPhone, isEmail, handleErrors }