const UniversitySupervisor = require('../../models/User/UniversitySupervisor')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../../errors')
const sendEmail = require('../../utils/User/University')
const crypto = require('crypto')
//const VerficationToken = require('../models/verificationToken')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
//const verificationToken = require('../models/verificationToken')


const UniversityRegistration = async (req, res) =>{

    try{
        const University = await UniversitySupervisor.create({...req.body})
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
        throw new BadRequestError('Please provide a valid emal and a password')
    }
    const university = await UniversitySupervisor.findOne({email})

    if (!university){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordRight = await university.checkPassword(password)
    if(!isPasswordRight){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = university.createJWT();
    res.status(StatusCodes.OK).json({ university:{_id: university._id, fullName: university.fullName, role: university.role, dateJoigned: university.dateJoigned}, token})
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
    UniversityRegistration,
    login,
   
}