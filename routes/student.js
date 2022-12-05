const express = require('express')
const router = express.Router()

const {getDetails
    }= require('../controllers/Auth/StudentAuth')

router.route('/').get(getDetails)

module.exports = router