const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please Provide a valid email'
        ],
    },
    fullName:{
        type: String,
        unique: true,
        required: true
    },
    phoneNumber:{
        type: Number,
        unique: true,
        required: true
    },
    role:{
        type: String,
        default: 'Admin'

    },

    password:{
        type:String,
        required: [true, 'Please provide password'],
        minlength: 10,
        maxlength: 250,
    },
})

AdminSchema.pre('save', async function(next){
    const hashed = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,hashed)
})

AdminSchema.methods.createJWT = function () {
    return jwt.sign({
        fullName: this.fullName, 
        email:this.email, 
        phoneNumber: this.phoneNumber,
        role:this.role,
        dateJoigned: this.dateJoigned, 
       /* verified: this.verified*/},
        process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

AdminSchema.methods.checkPassword = async function (formalPassword) {
    const isPassword = await bcrypt.compare(formalPassword, this.password)
    return isPassword
}

module.exports = mongoose.model('Admin', AdminSchema)