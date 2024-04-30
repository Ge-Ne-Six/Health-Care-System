const express  = require('express')
const adminAuth = require('../controllers/adminAuth');


const router = express.Router()


router.get('/admin/login', adminAuth.login_get);

router.get('/admin/register', adminAuth.Register_get);

router.get('/admin/logout', adminAuth.logout);

router.post('/admin/Register', adminAuth.Register_post);

router.post('/admin/login', adminAuth.login_post);


module.exports = router;