const Log = require('../models/Log')
const Student = require('../models/User/Student')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')


const createLog = async(req,res) =>{
    try {
        req.body.admissionNumber = req.user.admissionNumber
        const log = await Log.create(req.body)
        res.status(StatusCodes.CREATED).json({log})
    } catch (error) {
        console.log(error)
    }
}

const getLog = async(req,res)=>{
    try {
        
        const log = await Log.find({admissionNumber: req.user.admissionNumber})
        res.status(StatusCodes.OK).json({log, number: log.length})
    } catch (error) {
        console.log(error)
    }
}

const singleLog = async(req,res)=>{
    try {
        const {user:{admissionNumber}, params:{id:weekNumber}} = req
        const log = await Log.findOne({_id:weekNumber, admissionNumber: admissionNumber})

        if(!log){
           // throw new NotFoundError(`Week number ${weekNumber} does not exist!!!`)
            res.status(StatusCodes.NOT_FOUND).send(`Week number ${weekNumber} does not exist!!!`)
        }else{
        res.status(StatusCodes.OK).json({log})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createLog,
    getLog,
    singleLog
}