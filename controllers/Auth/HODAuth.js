const hod = require('../../models//User/HOD')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../../errors')
const sendEmail = require('../../utils/User/HOD')
const cloudinary = require('../../utils/cloudinary')
const crypto = require('crypto')
//const VerficationToken = require('../models/verificationToken')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
//const verificationToken = require('../models/verificationToken')





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
        const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please provide a valid email and a password')
    }
    const HOD = await hod.findOne({email})

    if (!HOD){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordRight = await HOD.checkPassword(password)
    if(!isPasswordRight){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = HOD.createJWT();
    res.status(StatusCodes.OK).json({ HOD:{StaffId: HOD.StaffId, fullName: HOD.fullName, role: HOD.role, dateJoigned: HOD.dateJoigned}, token})
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
    
    login,
   
}