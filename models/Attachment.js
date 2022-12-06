const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AttachmentSchema = new mongoose.Schema({
    admissionNumber:{
        type: String,
        require: [true, 'Student admission number is required'],
        unique: true
    },
    place:{
        type: String,
        require: [true, 'Please provide the company name']
    },
    address:{
        type: String,
        require: [true, 'Please provide the address of the company']
    },
    email:{
        type: String,
        require: true
    },
    startingDate: {
        type: Date,
        require: [true, 'Please provide a starting date']
    },
    endDate:{
        type: Date,
        require: [true, 'Please provide an ending date']
    }
})

module.exports = mongoose.model('Attachment', AttachmentSchema)