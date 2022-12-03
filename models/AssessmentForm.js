const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const AssessmentFormSchema = new mongoose.Schema({
    admissionNumber:{
        type:String,
        require: true
    },
    department:{
        type:String,
        require: true
    },
    
    supervisor:{
        type:String,
        require: true
    },
    supervisorEmail:{
        type:String,
        require: true
    },
    supervisorPhoneNumber:{
        type:Number,
        require: true
    },

    reporting:{
        type: Number,
        require: true
    },

    communication:{
        type: Number,
        require: true
    },
    presentation:{
        type: Number,
        require: true
    },

    teamWork:{
        type: Number,
        require: true
    },

    effort:{
        type: Number,
        require: true
    },

    dependability:{
        type: Number,
        require: true
    },
    attitude:{
        type: Number,
        require: true
    },

    problemSolving:{
        type: Number,
        require: true
    },
    itSkill:{
        type: Number,
        require: true
    },

    totalPerfomance:{
        type: Number,
        require: true
    },

    remarks:{
        type: String,
        require: true
    },

    recommandation:{
        type: String,
        require: true
    },

    benefit:{
        type: String,
        require: true
    },

    beEmployed:{
        type: String,
        require: true
    },

})

module.exports = mongoose.model('AssessmentForm', AssessmentFormSchema)