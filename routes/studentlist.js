const express = require('express')
const router = express.Router()

const {getStudent,
     singleStudent, 
     assignSupervisor,
    getLogs,
    getProject,
    projectStatus
    }= require('../controllers/studentList')

router.route('/').get(getStudent)
router.route('/:id').get(singleStudent).post(assignSupervisor)
router.route('/student-logs/:id').get(getLogs)

router.route('/student-project/:id').get(getProject).patch(projectStatus)

module.exports = router;