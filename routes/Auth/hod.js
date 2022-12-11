const express = require('express')
const router = express.Router()

const {login} = require('../../controllers/Auth/HODAuth')


router.post('/login', login)
module.exports = router