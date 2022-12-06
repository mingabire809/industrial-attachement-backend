const express = require('express')
const router = express.Router()
const verifyRoles = require ('../middleware/roles')
const ROLES_LIST = require('../config/roles_list')

const {createAssessment, getAssessment} = require('../controllers/assesssment')

router.route('/').post(createAssessment)
router.route('/:id').get(getAssessment)


module.exports = router;