const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('../middleware/all');
const { isStrongPassword } = require('validator');
const { isPhone } = require('../middleware/all');

const Schema = mongoose.Schema

const newPatient = new Schema({
  firstname:{type: String},
  lastname:{type: String},
  middletname:{type: String},
  gender:{type: String},
  email:{
    type: String,
    required: [true,'Please enter your email'],
    lowercase: true,
    validate: [isEmail],
    unique: [true, 'this email is already registered']
  },
  password:{
    type: String,
     required: [true,'Please enter your password'],
     validate: [isStrongPassword,'Please enter a valid password!']
  },
  phonenumber:{
    type: String, 
    required: [true,'Please enter your Phone number'],
    unique: [true, 'this phone number is already registered']
  },
  pic:{
    type: String
  },
  maritalstatus:{type: String},
  dob:{type: String},
  age:{type: String},
  patienttype:{type: String},
  ward:{type: String},
  patientID:{
    type: String,
  },
  createdAt:{
    type: Date,
    default: Date.now()
  }
});



newPatient.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  
  next();
});

newPatient.statics.login = async function({ patient, password }){
  
  if(patient !== ''){

    const user  = await this.findOne({$or: [{ email: patient },  { phonenumber: patient },  { patientID: patient }] });

    if(user){

      if(password !== ''){

        const auth = await bcrypt.compare(password,user.password);

        if(auth){

          return user;

        }
        throw Error('Incorrect Password')
      }
      throw Error('Please enter Your Password');
    }
    throw Error('This Patient is not registered')
  }
  throw Error('This Field cant be empty')

}




const Patients = mongoose.model('patient', newPatient);


module.exports = Patients;