// const express = require('express');
// const bcrypt = require('bcrypt');
// const {sign, verify} = require ('jsonwebtoken');
// const db = require('../config/connection') // Import your User entity here
// const User = db.User; // Import your Token 



// module.exports = ({
// Logout,
// })

const jwt = require("jsonwebtoken")
const db = require("../config/connection");
const User = db.User;
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require('../config/token.confing')

exports.user_login = async (req, res, next) => {

    try {
        if (!req.body.email) {
            return res.status(400).json({ error: 'Please enter your email ' });
        }
        if (!req.body.password) {
            return res.status(400).json({ error: 'please enter your password' });
        }
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        //console.log(validPassword)

        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const verifyEmail = await User.findOne({
            where: {
                status: 1,
                email: req.body.email
            }
        })
        if (!verifyEmail) {
            res.status(400).json({ message: 'Please verify your email first then try to login' })
        }

        const access_token = generateAccessToken(user)
        const refresh_token = generateRefreshToken()
        const Refresh_token_expiration = Date.now() + (7 * 24 * 60*  60 * 1000);// 7 days

        user.refreshToken = refresh_token
        user.refreshToken_Expiration = Refresh_token_expiration
        await user.save()
        const { name, email, mobile } = user
        const user_data = {
            name: name,
            email: email,
            mobile: mobile
        }


        // res.cookie("access_token", access_token, { httpOnly: true })
        // res.cookie("refresh_token", refresh_token, { httpOnly: true })
        res.cookie("refresh_token", refresh_token, { httpOnly: true })

        return res.status(200).json({
            message: "Successfully login",
            data: user_data,
            access_token: access_token
        })
    }
    catch (error) {
        return next(error)
    }
}

// exports.Logout = async (req,res) => {
//     const refreshToken = req.cookies['refreshToken'];

//     await Token.delete({token: refreshToken});

//     res.cookie('refreshToken');

//     return res.status(200).json({
//         message: 'success'
//     });
// }


// login controller