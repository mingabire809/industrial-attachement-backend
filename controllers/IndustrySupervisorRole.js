const Log = require('../models/Log')
const Student = require('../models/User/Student')
const PartnerShip = require("../models/Partnership")
const Project = require('../models/Project')
const AssessmentForm = require('../models/AssessmentForm')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')


const getLogs = async(req,res)=>{
    try {
        const log = await Log.find({admissionNumber: req.user.student})
        res.status(StatusCodes.OK).json({log})
    } catch (error) {
        console.log(error)
    }
    
}

const singleLog = async(req,res)=>{
    try {
        const {params:{id:weekNumber}} = req
        const log = await Log.findOne({_id:weekNumber, admissionNumber: req.user.student})

        if(!log){
            res.status(StatusCodes.NOT_FOUND).send(`Week number ${weekNumber} does not exist!!!`)
        }else{
        res.status(StatusCodes.OK).json({log})
        }
    } catch (error) {
        console.log(error)
    }
}

const commentLog = async(req,res)=>{
    try {
        const {params:{id:weekNumber}} = req
        const log = await Log.findOneAndUpdate({_id:weekNumber, admissionNumber: req.user.student}, {comment: req.body.comment, date: new Date(+new Date() + 7*24*60*60*1000)}, {
            new: true,
            runValidators: true
        })

        if(!log){
            res.status(StatusCodes.NOT_FOUND).send(`Week number ${weekNumber} does not exist!!!`)
        }else{
        res.status(StatusCodes.OK).json({log})
        }
    } catch (error) {
        console.log(error)
    }
}

const makePartnership = async(req,res)=>{
    try {
        
        req.body.company = req.user.company
        const partnership = await PartnerShip.create(req.body)
        res.status(StatusCodes.CREATED).json({partnership})
    } catch (error) {
        console.log(error)
    }
}

const getPartnership = async(req,res)=>{
    try {
        const partnership = await PartnerShip.find({company: req.user.company})
        res.status(StatusCodes.CREATED).json({partnership})
    } catch (error) {
        console.log(error)
    }
}

const Assessment = async(req,res)=>{
    try {
        req.body.admissionNumber = req.user.student
        req.body.department = req.user.department
        req.body.supervisor = req.user.fullName
        req.body.supervisorEmail = req.user.email
        req.body.supervisorPhoneNumber = req.user.phoneNumber


        const assessment = await AssessmentForm.create(req.body)
        res.status(StatusCodes.CREATED).json({assessment})
    } catch (error) {
        console.log(error)
    }
}

const getAssessment = async(req,res)=>{
    try {
        const assessment = await AssessmentForm.find({admissionNumber: req.user.student})
        res.status(StatusCodes.OK).json({assessment})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getLogs, singleLog, commentLog, makePartnership, getPartnership, Assessment, getAssessment}