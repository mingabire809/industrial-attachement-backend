const Project = require('../models/Project')
const Student = require('../models/User/Student')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')



const createProject = async(req,res) =>{
   
    try{
        req.body.admissionNumber = req.user.admissionNumber
        const project = await Project.create(req.body)
        
      
        
        res.status(StatusCodes.CREATED).json({project})
    } catch(error){
        console.log(error)
    }
}

const getProject = async  (req,res) =>{
    try {
        const project = await Project.findOne({admissionNumber: req.user.admissionNumber})
        res.status(StatusCodes.OK).json({project})
    } catch (error) {
        console.log(error)
    }
}




module.exports = {createProject, getProject}