const User = require('../../models/User/UniversitySupervisor')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../../errors')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text) => {
    
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,

            auth:{
                user : "urutonde22@gmail.com",
                pass: "lslkrsckjzktozxt",
            }
        })
        await transporter.sendMail({
            from: "urutonde22@gmail.com",
            to: email,
            subject: subject,
            text: text

        })
        console.log('email sent successfully!')
    } catch (error) {
        console.log('email not sent')
        console.log(error)
    }
}

module.exports = sendEmail