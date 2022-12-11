const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UniversitySupervisorSchema = new mongoose.Schema({
    _id:{
        type:String,
        require: [true, 'Please provide your staff ID'],
   
    },
    email:{
        type:String,
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
    phoneNumber:{
        type: Number,
        require: true
    },
    role:{
        type: String,
        default: 'Univesity Supervisor'

    },
    signature:{
        public_id:{
            type:String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
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

UniversitySupervisorSchema.pre('save', async function(next){
    const hashed = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,hashed)
})

UniversitySupervisorSchema.methods.createJWT = function () {
    return jwt.sign({
        StaffId: this._id, 
        fullName: this.fullName, 
        email:this.email,
        phoneNumber: this.phoneNumber, 
        role:this.role,
        signature: this.signature,
        dateJoigned: this.dateJoigned, 
        /*verified: this.verified*/},
        process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UniversitySupervisorSchema.methods.checkPassword = async function (formalPassword) {
    const isPassword = await bcrypt.compare(formalPassword, this.password)
    return isPassword
}

module.exports = mongoose.model('University', UniversitySupervisorSchema)