const express = require('express');
const url = 'http://localhost:3001'

// const userController=require('../controller/user.controller');

const {createUser,verifyUser} = require('../controller/register.controller');
const {user_login}=require('../controller/login.controller');
const { forget_password, change_password } = require('../controller/forget_Password.controller');
const { update_profile_details } =require('../controller/updateProfile.controller');
 const router = express.Router();
//User Routes
router.post('/register',createUser);
router.post('/login',user_login);
router.get("/verify-email/:remember_token",verifyUser);// this route run when click on verify email link on email

router.post('/forget_password',forget_password);
router.get('/reset-email/:resetToken',change_password);


router.post('/update_profile',update_profile_details);  // this is update profile routes
module.exports = router;


