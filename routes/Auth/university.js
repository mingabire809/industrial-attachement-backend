const express = require('express')
const router = express.Router()

const {UniversityRegistration, login} = require('../../controllers/Auth/UniversityAuth')

router.post('/register', UniversityRegistration)
router.post('/login', login)
module.exports = router