const Student = require('../../models/User/Student')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError} = require('../../errors')

const Studentauth = (req, res, next) =>{
    //check header

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes

        const student = Student.findById(payload.id).select('-password')
        req.user = student

        req.user = { admissionNumber: payload.admissionNumber, fullName:payload.fullName,email:payload.email, isAttached: payload.isAttached, role: payload.role, signature: payload.signature,company: payload.company, supervisor: payload.supervisor, industrialSupervisor: payload.industrialSupervisor}
      /*  if (!req.user.verified){
            console.log('Not verified')
            res.status(StatusCodes.UNAUTHORIZED).send('User not verified')
        }else{
            
        }*/
        next()
    } catch (error) {
        console.log(error)
        throw new UnauthenticatedError('Authentication invalid')
    }

}

module.exports = Studentauth