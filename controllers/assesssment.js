const Assessment = require('../models/Assessment')
const Student = require('../models/User/Student')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')


const createAssessment = async(req,res) =>{
    try {
        req.body.admissionNumber = req.user.admissionNumber
        req.body.supervisor = req.user.supervisor
        const assessment = await Assessment.create(req.body)
        res.status(StatusCodes.CREATED).json({assessment})
    } catch (error) {
        console.log(error)
    }
   
}

const getAssessment = async(req,res) =>{
    try {
        const title = req.params.id
        const assessment = await Assessment.findOne({admissionNumber: req.user.admissionNumber, assessment: title})
        res.status(StatusCodes.OK).json({assessment})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createAssessment,
    getAssessment
}