
const Student = require('../models/User/Student')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getStudent = async(req,res) =>{
    try {
        const student = await Student.find({})
        const StudentList = student.map(o => ({ _id: o._id, fullName: o.fullName, email:o.email, supervisor: o.supervisor, isAttached: o.isAttached, company: o.company, industrialSupervisor: o.industrialSupervisor }));
        res.status(StatusCodes.OK).json({StudentList})
    } catch (error) {
        console.log(error)
    }
}

module.exports = getStudent