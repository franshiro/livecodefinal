const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

class UserController{
    
    static register(req, res){
        User.create({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password            
        })
        .then(user => {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
            to: user.email,
            from: 'franshiro@gmail.com',
            subject: 'Registration Success',
            text: `thansk for your Registration
                    `,
            html: `
                    Your Registration now is success, <br/>
                    here your data :<br/>
                    <strong>username :</string> ${user.username}<br/>
                    <strong>email :</strong> ${user.email}<br/>
                    <strong>password :</strong> ${req.body.password}<br/>
                    <br/>
                    <br/>
                    please keep your password secretly,
                    don't share your informastion to others
                    <br/>
                    <strong>Get Your Solutions Here</strong>`,
            };
            sgMail.send(msg);
            sendEmail(user.email)
            res.status(201).json({
                user,
                success : true, 
                message : "Register success"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err})
        })
    }

    static registerAdmin(req, res){
        User.create({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            role : 'admin'
        })
        .then(user => {
            res.status(201).json({
                user,
                success : true, 
                message : "Register success"
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static login(req, res){
        console.log(req.body)
        User.findOne({ email : req.body.email })
        .then(login => {
            console.log('test')
            let passIsValid = bcrypt.compareSync(req.body.password, login.password)
            if(passIsValid){
                let token = jwt.sign({
                    id : login._id,
                    email : login.email,
                    username : login.username,
                    role : login.role
                }, process.env.SECRET)

                res.status(200).json({
                    token : token,
                    username : login.username,
                    message : "login Success"
                })
            }else {
                res.status(400).json({
                    message : 'Wrong email or password'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message : 'Email and Password must be filled'
            })
        })

    }
    static showProfile(req, res){
        console.log(req.login.id)
        User.findOne({_id : req.login.id})
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static editProfile(req, res){

    }

    static deleteProfile(req, res){
        User.findOneAndDelete({_id : req.params.id})
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }
    static showAllUser(req, res){
        User.find({})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController