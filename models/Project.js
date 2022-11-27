const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ProjectSchema = new mongoose.Schema({
    admissionNumber:{
        type: String,
        require: [true, 'Student admission number is required'],
    },
    projectName:{
        type: String,
        require: [true, 'Please provide the project name']
    },
    projectDescription:{
        type: String,
        require: [true, 'Please provide the description of the project']
    },
    approvalStatus:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Project', ProjectSchema)