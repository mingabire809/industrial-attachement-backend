const Student = require('../models/User/Student')
const UniversitySupervisor = require('../models/User/UniversitySupervisor')
const Industrysupervisor = require('../models/User/IndustrySupervisor')
const hod = require('../models/User/HOD')
const Admin = require('../models/User/Admin')
const Attachment = require('../models/Attachment')
const Assessment = require('../models/Assessment')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')
const cloudinary = require('../utils/cloudinary')
const sendEmail = require('../utils/User/HOD')

const AdminReg = async (req,res) =>{
    try {
        const admin = await Admin.create(req.body)
        res.status(StatusCodes.CREATED).json({admin})
    } catch (error) {
        console.log(error)
        return res.status(400).send("An error has occured while creating the account");
    }
}

const adminLogin = async (req, res) =>{
    try {
        const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please provide a valid email and a password')
    }
    const admin = await Admin.findOne({email})

    if (!admin){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordRight = await admin.checkPassword(password)
    if(!isPasswordRight){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = admin.createJWT();
    res.status(StatusCodes.OK).json({ admin:{_id: admin._id, fullName: admin.fullName, email: admin.email, role: admin.role}, token})
    /*if(!user.verified){
        try {
            const verificationtoken = await verificationToken.create({
                userId: user._id,
                token: crypto.randomBytes(64).toString("hex")
            })
            const url = `https://urutonde.herokuapp.com/urutonde/auth/verify/${verificationtoken.token}`
            await sendEmail(user.email, "Account not verified yet", url)
            console.log('Success')
            res.status(StatusCodes.CREATED).send("Your account is not verified. A verification email sent to your email account, please verify")
        } catch (error) {
            console.log(error)
        }
        
    }else{
    res.status(StatusCodes.OK).json({ user:{fullName: user.fullName, role: user.role, dateJoigned: user.dateJoigned, verified: user.verified}, token})
    }*/
    } catch (error) {
        console.log(error)
    }
    
}

const HODRegistration = async (req, res) =>{

    try{
        const signature = req.body.signature
        const result = await cloudinary.uploader.upload(signature,{
            folder: "signatures",
            width: 180,
            crop: 'scale'
        })
        const HOD = await hod.create({...req.body, signature:{
            public_id: result.public_id,
            url: result.secure_url,
        }})
       /* const verificationtoken = await verificationToken.create({
            userId: user._id,
            token: crypto.randomBytes(64).toString("hex")
        })*/
     //   const token = user.createJWT()
      //  const url = `https://urutonde.herokuapp.com/urutonde/auth/verify/${verificationtoken.token}`
        await sendEmail(HOD.email, "Attachment", `Welcome ${HOD.fullName} to the Attachment facilitator system`)
        console.log('Success')
        res.status(StatusCodes.CREATED).json({HOD})
        //res.status(StatusCodes.CREATED).send("verification email sent to your email account, please verify")
     
    } catch (error) {
        console.log(error)
        return res.status(400).send("An error has occured while creating the account");
        
    }
}



const UniversityRegistration = async (req, res) =>{

    try{
        const signature = req.body.signature
        const result = await cloudinary.uploader.upload(signature,{
            folder: "signatures",
            width: 180,
            crop: 'scale'
        })
        const University = await UniversitySupervisor.create({...req.body, signature:{
            public_id: result.public_id,
            url: result.secure_url,
        }})
       /* const verificationtoken = await verificationToken.create({
            userId: user._id,
            token: crypto.randomBytes(64).toString("hex")
        })*/
     //   const token = user.createJWT()
      //  const url = `https://urutonde.herokuapp.com/urutonde/auth/verify/${verificationtoken.token}`
        await sendEmail(University.email, "Attachment", `Welcome ${University.fullName} to the Attachment facilitator system`)
        console.log('Success')
        //res.status(StatusCodes.CREATED).send("verification email sent to your email account, please verify")
        res.status(StatusCodes.CREATED).json({University})
    } catch (error) {
        console.log(error)
        return res.status(400).send("An error has occured while creating the account");
        
    }
}




const getStudents = async(req,res)=>{
    try {
        const student = await Student.find({})
        res.status(StatusCodes.OK).json(student)
    } catch (error) {
        console.log(error)
    }
   
}

const getHOD = async(req,res)=>{
    try {
        
        const Hod = await hod.find({})
        res.status(StatusCodes.OK).json(Hod)
    } catch (error) {
        console.log(error)
    }
   
}

const getUniversities = async(req,res)=>{
    try {
        
        const university = await UniversitySupervisor.find({})
        res.status(StatusCodes.OK).json(university)
    } catch (error) {
        console.log(error)
    }
   
}

const getIndustrial = async(req,res)=>{
    try {
        
        const industrial = await Industrysupervisor.find({})
        res.status(StatusCodes.OK).json(industrial)
    } catch (error) {
        console.log(error)
    }
   
}

const getAttachment = async(req,res)=>{
    try {
        const attachment = await Attachment.find({})
        res.status(StatusCodes.OK).json(attachment)
    } catch (error) {
        console.log(error)
    }
}

const getAssessment = async(req,res)=>{
    try {
        const assessment = await Assessment.find({completed: true})
        res.status(StatusCodes.OK).json(assessment)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getStudents,
    getHOD,
    getIndustrial,
    getUniversities,
    getAttachment,
    getAssessment,
    HODRegistration,
    UniversityRegistration,
    AdminReg,
    adminLogin
}