const Hod = require('../../models/User/HOD')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError} = require('../../errors')

const Hodauth = (req, res, next) =>{
    //check header

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes

        const hod = Hod.findById(payload.id).select('-password')
        req.user = hod

        req.user = {StaffId:payload.StaffId, fullName:payload.fullName,email:payload.email, role: payload.role}
        if (req.user.role !=='HOD'){
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

module.exports = Hodauth