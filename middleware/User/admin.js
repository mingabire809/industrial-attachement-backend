const Admin = require('../../models/User/Admin')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError} = require('../../errors')

const AdminAuth = (req, res, next) =>{
    //check header

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes

        const admin = Admin.findById(payload.id).select('-password')
        req.user = admin

        req.user = {_id:payload._id, fullName:payload.fullName,email:payload.email, phoneNumber: payload.phoneNumber, role: payload.role}
        if (req.user.role !=='Admin'){
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

module.exports = AdminAuth