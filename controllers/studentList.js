const UniversitySupervisor = require('../models/User/UniversitySupervisor')
const Student = require('../models/User/Student')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')
const Project = require('../models/Project')
const Log = require('../models/Log')
const Partnership = require('../models/Partnership')
const Attachment = require('../models/Attachment')
const Assessment = require('../models/Assessment')
const IndustrialSupervisor = require('../models/User/IndustrySupervisor')
const AssessmentForm = require('../models/AssessmentForm')


const getStudent = async (req,res) =>{
    try {
        const student = await Student.find({})
        const StudentList = student.map(o => ({ _id: o._id, fullName: o.fullName, email:o.email, supervisor: o.supervisor, isAttached: o.isAttached, company: o.company, industrialSupervisor: o.industrialSupervisor }));
        const nonAttached = await Student.find({company: 'none'})
        const partnership = await Partnership.find({})
        res.status(StatusCodes.OK).json({StudentList, totalStudent: student.length, attached: student.length - nonAttached.length, partnership, totalPartnership: partnership.length})
    } catch (error) {
        console.log(error)
    }
}


const singleStudent = async(req,res) =>{
    try {

        const admissionNumber = req.params.id
        const student = await Student.findOne({_id: admissionNumber})
        const attachment = await Attachment.findOne({admissionNumber: admissionNumber})
        const industrialSupervisor = await IndustrialSupervisor.findOne({student: admissionNumber})
        const firstAssessment = await Assessment.findOne({assessment: 'First Assessment', admissionNumber: admissionNumber})
        const secondAssessment = await Assessment.findOne({assessment: 'Second Assessment', admissionNumber: admissionNumber})
        const assessmentForm = await AssessmentForm.findOne({admissionNumber: admissionNumber})
        //const StudentList = student.map(({_id, fullName, email, supervisor, isAttached, company, industrialSupervisor }) => ({ _id, fullName, email, supervisor, isAttached, company, industrialSupervisor }));
        res.status(StatusCodes.OK).json({student, attachment, firstAssessment, secondAssessment, industrialSupervisor, assessmentForm})
    } catch (error) {
        console.log(error)
    }
}


const assignSupervisor = async(req,res)=>{
    try {
        
        const admissionNumber = req.params.id
        const student = await Student.findByIdAndUpdate({_id: admissionNumber}, {supervisor: req.body.supervisor}, {
            new: true,
            runValidators: true
        })
        if (!student){
            throw new NotFoundError(`No student with ID ${req.user.admissionNumber}`)
        }
        //const StudentList = student.map(({_id, fullName, email, supervisor, isAttached, company, industrialSupervisor }) => ({ _id, fullName, email, supervisor, isAttached, company, industrialSupervisor }));
        res.status(StatusCodes.OK).json({student})
    } catch (error) {
        console.log(error)
    }
}

const getLogs = async(req,res)=>{
    try {
        const admissionNumber = req.params.id
        const studentLogs = await Log.find({admissionNumber: admissionNumber})
        res.status(StatusCodes.OK).json({studentLogs})
    } catch (error) {
        console.log(error)
    }
}

const getProject = async(req,res)=>{
    try {
        const admissionNumber = req.params.id
        const studentProject = await Project.findOne({admissionNumber: admissionNumber})
        res.status(StatusCodes.OK).json({studentProject})
    } catch (error) {
        console.log(error)
    }
}

const projectStatus = async(req,res)=>{
    try {
        const admissionNumber = req.params.id
        const studentProject = await Project.findOneAndUpdate({admissionNumber: admissionNumber}, {approvalStatus: req.body.approvalStatus}, {
            new: true,
            runValidators: true
        })
        if (!studentProject){
            throw new NotFoundError(`No project with ID ${req.user.admissionNumber}`)
        }
        //const StudentList = student.map(({_id, fullName, email, supervisor, isAttached, company, industrialSupervisor }) => ({ _id, fullName, email, supervisor, isAttached, company, industrialSupervisor }));
        res.status(StatusCodes.OK).json({studentProject})
    } catch (error) {
        console.log(error)
    }
}

const getSupervisor = async(req,res)=>{
    try {
        const supervisor = await UniversitySupervisor.find({})
        const supervisorList = supervisor.map(o => ({ email: o.email, fullName: o.fullName }));
        res.status(StatusCodes.OK).json({supervisorList})
    } catch (error) {
        console.log(error)
    }
}



module.exports = {getStudent,singleStudent, assignSupervisor, getLogs, getProject, projectStatus, getSupervisor}