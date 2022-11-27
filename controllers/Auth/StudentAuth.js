const Student = require('../../models/User/Student')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../../errors')
const sendEmail = require('../../utils/User/student')
const crypto = require('crypto')
//const VerficationToken = require('../models/verificationToken')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
//const verificationToken = require('../models/verificationToken')

const StudentRegistration = async (req, res) =>{

    try{
        const student = await Student.create({...req.body})
       /* const verificationtoken = await verificationToken.create({
            userId: user._id,
            token: crypto.randomBytes(64).toString("hex")
        })*/
     //   const token = user.createJWT()
      //  const url = `https://urutonde.herokuapp.com/urutonde/auth/verify/${verificationtoken.token}`
        await sendEmail(student.email, "Attachment", `Welcome ${student.fullName} to the Attachment facilitator system`)
        console.log('Success')
        //res.status(StatusCodes.CREATED).send("verification email sent to your email account, please verify")
        res.status(StatusCodes.CREATED).json({student})
    } catch (error) {
        console.log(error)
        return res.status(400).send("An error has occured while creating the account");
        
    }
}


/*const AccountVerification = async (req, res) =>{
     try {
        const user = await User.findOne({id:req.params._id});
        if(!user) return res.status(400).send('Invalid link')
        const token = await verificationToken.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send('Invalid token')

        await User.updateOne({_id:user._id, verified:true})
        await verificationToken.findByIdAndRemove(token._id)
        res.send("Account verified successfully! Welcome to our platform")
    } catch (error) {
        res.status(400).send("An error occured while verifying the account")
    }
}*/

const login = async (req, res) =>{
    try {
        const {admissionNumber, password} = req.body

    if(!admissionNumber || !password){
        throw new BadRequestError('Please provide a valid admission number and a password')
    }
    const student = await Student.findOne({admissionNumber})

    if (!student){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordRight = await student.checkPassword(password)
    if(!isPasswordRight){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = student.createJWT();
    res.status(StatusCodes.OK).json({ student:{admissionNumber: student.admissionNumber, fullName: student.fullName, role: student.role, dateJoigned: student.dateJoigned, isAttached: student.isAttached, company: student.company, supervisor: student.supervisor, industrialSupervisor: student.industrialSupervisor}, token})
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



module.exports = {
    StudentRegistration,
    login,
   
}