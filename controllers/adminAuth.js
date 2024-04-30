const patient = require('../models/pateint');
const Admin = require('../models/adminmodel');
const { handleErrors } = require('../middleware/all');
const  jwt = require('jsonwebtoken');


const maxAge = 2 * 24 * 60 * 60 ;


function createToken(id){
  return jwt.sign({id}, 'Naruto is a bad ass', { expiresIn: maxAge })
}

module.exports.login_get = (req,res)=>{
  res.render('adminlogin', { title : 'ADMIN/Login' })
};

module.exports.Register_get = (req,res)=>{
  res.render('adminsignup', { title : 'ADMIN/SignUp' })
};

module.exports.login_post = async (req,res)=>{
  const {admin, password} = req.body;

  try{
    const log = await Admin.login({admin, password});

    
    const token = createToken(log._id);

    res.cookie('ancopAdmin', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: log._id });

  }
  catch(err){
    const errors = handleErrors(err);
    
    res.status(404).json({errors});

    console.log(err.message); 
  }
};

module.exports.Register_post = async (req,res)=>{

  const { email, password, type, gender, dob, age, firstname, lastname, phonenumber } = req.body;

  console.log({ email, password, type, gender, dob, age, firstname, lastname, phonenumber });


  try{

    let admin = await Admin.create({ email, password, type, gender, dob, age, firstname, lastname, phonenumber });

    res.status(200).json({ result: 'Admin created!' });



  }
  catch(err){
    const errors = handleErrors(err);
    
    res.status(404).json({errors})

    console.log(err)
    console.log(errors)

  }

};

module.exports.logout = (req,res)=>{
  res.cookie('ancopAdmin', '', { httpOnly: true, maxAge: 1 });
  res.redirect('/ANCOP/admin/login');

}
