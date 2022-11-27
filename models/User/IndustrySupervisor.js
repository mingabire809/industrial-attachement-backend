const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const IndustrySupervisorSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please provide an address email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please Provide a valid email'
        ],
        unique: true
    },
    fullName:{
        type:String,
        require: [true, 'Please provide your full name'],
        minlength: 3,
        maxlength: 100,
    },
    role:{
        type: String,
        default: 'Industry Supervisor'

    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minlength: 10,
        maxlength: 250,
    },
    company:{
        type:String,
        required: [true, 'Please provide the name of the company'],
        minlength: 10,
        maxlength: 250,
    },
    dateJoigned:{
        type:Date,
        default:Date.now,
    },
    /*verified:{
        type:Boolean,
        default: false
    }*/
})

IndustrySupervisorSchema.pre('save', async function(next){
    const hashed = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,hashed)
})

IndustrySupervisorSchema.methods.createJWT = function () {
    return jwt.sign({
        email:this.email, 
        fullName: this.fullName, 
        role:this.role,
        dateJoigned: this.dateJoigned,
        company: this.company, 
       /* verified: this.verified*/},
        process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

IndustrySupervisorSchema.methods.checkPassword = async function (formalPassword) {
    const isPassword = await bcrypt.compare(formalPassword, this.password)
    return isPassword
}

module.exports = mongoose.model('Industry', IndustrySupervisorSchema)