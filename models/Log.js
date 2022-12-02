const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const LogSchema = new mongoose.Schema({
    _id:{
        type: Number,
        require: [true, "Week number is required"]
    },
    admissionNumber:{
        type:String,
        require: [true, 'student is required']
    },

    mondayWork:{
        type: String,
        require: [true, 'Work description is required']
    },
    mondaySkill:{
        type: String,
        require: [true, 'Skill learnt is required']
    },

    tuesdayWork:{
        type: String,
        require: [true, 'Work description is required']
    },
    tuesdaySkill:{
        type: String,
        require: [true, 'Skill learnt is required']
    },

    wednesdayWork:{
        type: String,
        require: [true, 'Work description is required']
    },
    wednwsdaySkill:{
        type: String,
        require: [true, 'Skill learnt is required']
    },

    thursdayWork:{
        type: String,
        require: [true, 'Work description is required']
    },
    thursdaySkill:{
        type: String,
        require: [true, 'Skill learnt is required']
    },

    fridayWork:{
        type: String,
        require: [true, 'Work description is required']
    },
    fridaySkill:{
        type: String,
        require: [true, 'Skill learnt is required']
    },
    summary:{
        type:String,
        require: [true, "please provide a summary of the week"]
    },
    comment:{
        type: String,
        require: [true, 'Comment is required'],
        default: "Not yet commented"
    },
    date:{
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000)
    }
})

module.exports = mongoose.model('Log', LogSchema)