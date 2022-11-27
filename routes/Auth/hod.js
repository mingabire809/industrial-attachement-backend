const express = require('express')
const router = express.Router()

const {HODRegistration, login} = require('../../controllers/Auth/HODAuth')

router.post('/register', HODRegistration)
router.post('/login', login)
module.exports = router