const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const bcrypt = require('bcrypt')
const validate = require('mongoose-validator')

const isValidPass = [
    validate({
        validator: 'isLength',
        arguments:[8,500],
        message : 'Password must be more than 8 character'
    })
]

const userSchema = new Schema({
    username : {
        type : String,
        required : ['true', 'Username must be filled'],
        unique : [true, 'username already use']
    },
    email : {
        type : String,
        required : ['true', 'Email must be filled'],
        unique : [true, 'Email already use']
    },
    password : {
        type : String, 
        validate : isValidPass,
        required : ['true', 'password must be filled']

    },
    role : {
        type : String,
        default : 'user'
    }

})

// userSchema.pre('save', function(next) {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(this.password, salt);
//     this.password = hash
//     next()
// })

const User = mongoose.model('User', userSchema)
module.exports = User