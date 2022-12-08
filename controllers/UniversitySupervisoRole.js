const Student = require('../models/User/Student')
const Assessment = require('../models/Assessment')
const IndustrialSupervisor = require('../models/User/IndustrySupervisor')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')
const Project = require('../models/Project')
const Log = require('../models/Log')
const Attachment = require('../models/Attachment')


const getStudentAssigned = async(req,res)=>{
    try {
        const student = await Student.find({supervisor: req.user.fullName})
        const StudentList = student.map(o => ({ _id: o._id, fullName: o.fullName, email:o.email, supervisor: o.supervisor, isAttached: o.isAttached, company: o.company, industrialSupervisor: o.industrialSupervisor }));
        res.status(StatusCodes.OK).json({StudentList})
    } catch (error) {
        console.log(error)        
    }
}

const getSingleStudentAssigned = async(req,res)=>{
    try {
        const {params:{admissionNumber:admissionNumber}} = req
        const studentId = req.params.id
        const student = await Student.findOne({admissionNumber: admissionNumber})
        const industrialSupervisor = await IndustrialSupervisor.findOne({student: studentId})
        const attachment = await Attachment.findOne({admissionNumber: studentId})
        const project = await Project.findOne({admissionNumber: studentId})
        const firstAssessment = await Assessment.findOne({admissionNumber: studentId, assessment: 'First Assessment'})
        const secondAssessment = await Assessment.findOne({admissionNumber: studentId, assessment: 'Second Assessment'})
        const log = await Log.find({admissionNumber: studentId})

        res.status(StatusCodes.OK).json({student, attachment, industrialSupervisor, project, firstAssessment, secondAssessment, log})

    } catch (error) {
        console.log(error)
    }
}

const assessmentFeedback = async(req,res)=>{
    try {
        const studentId = req.params.id
        const assessmentTitle = req.params.title
        console.log(assessmentTitle)
        const assessment = await Assessment.findOneAndUpdate({admissionNumber: studentId, assessment: assessmentTitle}, {approved: req.body.approved}, {
            new: true,
            runValidators: true
        })
        res.status(StatusCodes.OK).json({assessment})
    } catch (error) {
        console.log(error)
    }
}

const completeAssessment = async(req,res)=>{
    try {
        const studentId = req.params.id
        const assessmentTitle = req.params.title
        const assessment = await Assessment.findOneAndUpdate({admissionNumber: studentId, assessment: assessmentTitle}, {completed: req.body.completed}, {
            new: true,
            runValidators: true
        })
        res.status(StatusCodes.OK).json({assessment})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getStudentAssigned, getSingleStudentAssigned, assessmentFeedback, completeAssessment}