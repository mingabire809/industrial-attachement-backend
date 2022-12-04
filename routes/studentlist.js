const express = require('express')
const router = express.Router()

const {getStudent,
     singleStudent, 
     assignSupervisor,
    getLogs,
    getProject,
    projectStatus,
    getSupervisor
    }= require('../controllers/studentList')

router.route('/student').get(getStudent)
router.route('/student/:id').get(singleStudent).post(assignSupervisor)
router.route('/student-logs/:id').get(getLogs)

router.route('/student-project/:id').get(getProject).patch(projectStatus)
router.route('/supervisors').get(getSupervisor)

module.exports = router;