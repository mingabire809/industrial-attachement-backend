const express = require('express')
const router = express.Router()

const {
    getStudentAssigned,
    getSingleStudentAssigned,
    assessmentFeedback,
    completeAssessment
}= require('../controllers/UniversitySupervisoRole')

router.route('/student').get(getStudentAssigned)
router.route('/student/:id').get(getSingleStudentAssigned)
router.route('/student/:id/:title').post(assessmentFeedback).patch(completeAssessment)



module.exports = router;