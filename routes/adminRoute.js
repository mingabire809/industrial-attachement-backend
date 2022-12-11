const express = require('express')
const router = express.Router()

const {getHOD,getIndustrial, getStudents, getUniversities, getAttachment, getAssessment, HODRegistration, UniversityRegistration, AdminReg} = require('../controllers/admin')

router.route('/hod').get(getHOD)
router.route('/industrial').get(getIndustrial)
router.route('/students').get(getStudents)
router.route('/universities').get(getUniversities)
router.route('/attachment').get(getAttachment)
router.route('/assessment').get(getAssessment)
router.route('/registration/hod').post(HODRegistration)
router.route('/registration/universities').post(UniversityRegistration)
router.route('/reg').post(AdminReg)

module.exports = router;