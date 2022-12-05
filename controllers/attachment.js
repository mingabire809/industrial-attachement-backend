const Attachment = require('../models/Attachment')
const Student = require('../models/User/Student')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')
const sendEmail = require('../utils/User/student')



const createAttachment = async(req,res) =>{
    console.log(req.user.admissionNumber)
    try{
        req.body.admissionNumber = req.user.admissionNumber
        const attachment = await Attachment.create(req.body)
        
        const student = await Student.findByIdAndUpdate({_id: req.user.admissionNumber}, {company: req.body.place, isAttached: true}, {
            new: true,
            runValidators: true
        })
        if (!student){
            throw new NotFoundError(`No student with ID ${req.user.admissionNumber}`)
        }
        const registrationLink = `http://localhost:3000/Industry-supervisor/auth/register/${req.user.admissionNumber}`
        await sendEmail(req.body.email, "Attachment", `Here is the link ${registrationLink} to the Attachment facilitator system`)
        res.status(StatusCodes.CREATED).json({attachment})
    } catch(error){
        console.log(error)
    }
}

const getAttachment = async  (req,res) =>{
    try {
        const attachment = await Attachment.findOne({admissionNumber: req.user.admissionNumber, place: req.user.company})
        res.status(StatusCodes.OK).json({attachment})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {createAttachment, getAttachment}