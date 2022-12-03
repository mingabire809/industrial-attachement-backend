const express = require('express')
const router = express.Router()

const {IndustrySupervisorRegistration, login} = require('../../controllers/Auth/IndustryAuth')

router.post('/register/:id', IndustrySupervisorRegistration)
router.post('/login', login)
module.exports = router