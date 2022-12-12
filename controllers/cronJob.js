const CronJob = require('node-cron')
const Assessment = require('../models/Assessment')
const Project = require('../models/Project')
const {StatusCodes} = require('http-status-codes')

exports.initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule("* * * */7 * *", () => {
      
        const assessment = Assessment.findOneAndDelete({approved: false})
        const project = Project.findOneAndDelete({approvalStatus: false})
        res.status(StatusCodes.OK).json({assessment, project})
        console.log("I'm executed on a schedule!");
      // Add your custom logic here
    });
  
    scheduledJobFunction.start();
  }