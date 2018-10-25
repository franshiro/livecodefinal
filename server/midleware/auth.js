const User  = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Midleware{
    static isLogin ( req, res , next){
        try {
            let decoded = jwt.verify(req.headers.token, process.env.SECRET)
            User.findOne({ email : decoded.email})
            .then(user => {
                if(user){
                    req.login = decoded
                    next()
                } else {
                    req.status(401).json({
                        message : 'You dont have authorize for this actions'
                    })
                }
            })
        }
        catch(error){
            res.status(401).json({
                message : `You must login first`
            })
        }
    }

    static isYou(req, res, next){
        try {
            User.findById(req.login.id)
            .then(user => {
                if(user){
                    next()
                }
                else{
                    res.status(401).json({
                        message : 'You must login first'
                    })
                }
            })
        }
        catch(error){
            res.status(401).json({
                message : 'its Not YOu'
            })
        }
    }

    static isAdmin(req, res, next){
        try {
            User.findById(req.login.id)
            .then(user => {
                if(user){
                    if(req.login.role === 'admin'){
                        next()
                    }
                    else{
                        res.status(401).json({
                            message : 'you dont have permission for this action'
                        })
                    }
                }else {
                    res.status(401).json({
                        message : 'you must login first'
                    })
                }
            })
        }
        catch(error){
            res.status(401).json({
                message : "You dont have permission for this action"
            })
        }
    }

}

module.exports = Midleware
