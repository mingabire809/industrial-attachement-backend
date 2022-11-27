const express = require('express')
const router = express.Router()

const {StudentRegistration, login} = require('../../controllers/Auth/StudentAuth')

router.post('/register', StudentRegistration)
router.post('/login', login)
module.exports = router