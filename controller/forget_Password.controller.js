const jwt = require("jsonwebtoken");
const db = require("../config/connection");
const User = db.User;
const { generateAccessToken } =require('../config/token.confing');
const bcrypt = require("bcrypt");
const sendEmail = require('./sendMail.controller');
const Randomstring = require('randomstring'); // You need to import the 'randomstring' modul
const url = 'http://localhost:3001';
const forget_password = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Assuming you're using Sequelize or a similar library
        const user_data = await User.findOne({ where: { email:email } }); // Use 'findOne' to find a single user

        if (!user_data) {
            return res.status(500).json({ status: false, msg: "This Email does not exist....!" });
        } else {
            
            const resetToken = await generateAccessToken(user_data);
            user_data.resetToken = resetToken;
            await user_data.save();
           const subject = 'Forget password Verify Email'

const html = `<h1>Verify Email</h1>
    <p>Hi</p>
    <p>Please click the link below to verify your mail:</p>
            <p><a href="${url}/reset-email/${resetToken  }">forget email</a></p>
    <p>Thank you,</p> 
    <p>Dear</p>`

            sendEmail(email, subject, html)
            return res.status(200).json({ status: true, msg: "Please check your inbox..!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Error in reset password" });
    }
};

const change_password = async (req, res) => {
  try{
    const { email, newPassword ,confirmPassword} = req.body; // Assuming you also receive the new password
    console.log(email);
    const data = await User.findOne({ where:{ email: email }});
    if (!data) {
      return res.status(400).json({status : false, msg : "pls Enter a valid Email" })
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
          success: false,
          message: "password or confirmPassword are not matched"
      })
  }  
  const hashedPassword = await bcrypt.hash(confirmPassword, 10)

      data.password = hashedPassword; // Update the user's password
      await data.save(); // Save the updated user
 return res.status(200).json({status : true , msg : "password change's successfully....!"})
 }catch(error){
  console.log(error)
  return res.status(500).json({error});
 }
}
        
  module.exports = {
    change_password,
    forget_password
  };
  
