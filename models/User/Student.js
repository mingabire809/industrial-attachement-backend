const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const StudentSchema = new mongoose.Schema({
    _id:{
        type:String,
        require: [true, 'Please provide your admission number'],
        minlength: 6,
        maxlength: 8,
        
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
    role:{
        type: String,
        default: 'student'

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
    isAttached:{
        type:Boolean,
        default: false
    },
    company:{
        type: String,
        default: 'none'
    },
    supervisor:{
        type: String,
        default: 'none'
    },
    industrialSupervisor:{
        type: String,
        default: 'none'
    }

    /*verified:{
        type:Boolean,
        default: false
    }*/
})

StudentSchema.pre('save', async function(next){
    const hashed = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,hashed)
})

StudentSchema.methods.createJWT = function () {
    return jwt.sign({
        admissionNumber: this._id, 
        fullName: this.fullName, 
        email:this.email, 
        role:this.role,
        dateJoigned: this.dateJoigned,
        company: this.company,
        industrialSupervisor: this.industrialSupervisor,
        supervisor: this.supervisor 
        /*verified: this.verified*/},
        process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

StudentSchema.methods.checkPassword = async function (formalPassword) {
    const isPassword = await bcrypt.compare(formalPassword, this.password)
    return isPassword
}

module.exports = mongoose.model('Student', StudentSchema)