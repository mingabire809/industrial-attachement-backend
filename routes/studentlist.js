const express = require('express')
const router = express.Router()

const getStudentList = require('../controllers/studentList')

router.route('/').get(getStudentList)

module.exports = router;