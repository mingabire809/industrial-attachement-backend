const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AssessmentSchema = new mongoose.Schema({
    assessment:{
        type: String
    },
    admissionNumber:{
        type: String,
        require: true
    },
    supervisor:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        require: true
    },
    approved:{
        type: Boolean,
        require: true,
        default: false
    },
    completed: {
        type: Boolean,
        require: true,
        default: false
    }
})

module.exports = mongoose.model('Assessment', AssessmentSchema)