const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const PartnershipSchema = new mongoose.Schema({
    partnership:{
        type: Array,
        require: true
    },

    company:{
        type: String,
        require: true
    }

})

module.exports = mongoose.model('Partnership', PartnershipSchema)