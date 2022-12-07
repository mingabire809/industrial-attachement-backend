const express = require('express')
const router = express.Router()

const {
    getLogs,
    singleLog,
    commentLog,
    makePartnership,
    getPartnership,
    Assessment,
    getAssessment,
    studentDetails
}= require('../controllers/IndustrySupervisorRole')

router.route('/logs').get(getLogs)
router.route('/logs/:id').get(singleLog).post(commentLog)

router.route('/partnership').post(makePartnership).get(getPartnership)
router.route('/assessment-form').post(Assessment).get(getAssessment)
router.route('').get(studentDetails)

module.exports = router;