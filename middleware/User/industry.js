const Industry = require('../../models/User/IndustrySupervisor')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError} = require('../../errors')

const Industryauth = (req, res, next) =>{
    //check header

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes

        const industry = Industry.findById(payload.id).select('-password')
        req.user = industry

        req.user = {_id: payload._id,fullName:payload.fullName,email:payload.email, company: payload.company, role: payload.role, position: payload.position, student: payload.student, phoneNumber: payload.phoneNumber, department: payload.department}
        if (req.user.role !=='Industry Supervisor'){
            console.log('Not accessible')
            res.status(StatusCodes.UNAUTHORIZED).send('Ressource not accessible')
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
        throw new UnauthenticatedError('Authentication invalid')
    }

}

module.exports = Industryauth