const express = require('express')
const router = express.Router()

const {createProject, getProject} = require('../controllers/project')

router.route('/').post(createProject).get(getProject)

module.exports = router;