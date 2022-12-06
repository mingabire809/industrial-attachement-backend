require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
//Db
const connectDB = require('./db/connect')
const studentAuthentication = require('./middleware/User/student')
const HODAuthentication = require('./middleware/User/hod')
const universitySupervisorAuthentication = require('./middleware/User/university')
const industrySupervisorAuthentication = require('./middleware/User/industry')
//const userAuthentication = require('./middleware/authentication')



//routers
const StudentAuthRouter = require('./routes/Auth/student')
const HODAuthRouter = require('./routes/Auth/hod')
const UniversityAuthRouter = require('./routes/Auth/university')
const IndustryAuthRouter = require('./routes/Auth/industry')
const AttachmentRouter = require('./routes/attachment')
const ProjectRouter = require('./routes/project')
const LogRouter = require('./routes/log')
const AssessmentRouter = require('./routes/assessment')
const studentList = require('./routes/studentlist')
const IndustrySupervisorRoleRouter = require('./routes/IndustryRoutes')
const UniversitySupervisorRoleRouter = require('./routes/universityRoutes')
const studentDetails = require('./routes/student')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/',(req, res)=>{
  //res.sendStatus(200)
  res.render('Login', {
    pageTitle: 'Login'
  })
   // res.send('Attachment')
    //res.redirect('https://attachment-facilitator.netlify.app/')
  })

  app.get('/admin',(req, res)=>{
    //res.sendStatus(200)
    res.render('Admin', {
      pageTitle: 'Admin'
    })
     // res.send('Attachment')
      //res.redirect('https://attachment-facilitator.netlify.app/')
    })

app.get('/Industry-supervisor/auth/register/19-0508',(req,res)=>{
  res.redirect('https://attachment-facilitator.netlify.app/')
})

app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
//routes
app.use('/student/auth', StudentAuthRouter)
app.use('/HOD/auth', HODAuthRouter)
app.use('/University-supervisor/auth', UniversityAuthRouter)
app.use('/Industry-supervisor/auth', IndustryAuthRouter)
app.use('/attachment', studentAuthentication, AttachmentRouter)
app.use('/project', studentAuthentication, ProjectRouter)
app.use('/log', studentAuthentication, LogRouter)
app.use('/assessment', studentAuthentication, AssessmentRouter)
app.use('/student-list', HODAuthentication, studentList)
app.use('/industry-roles', industrySupervisorAuthentication, IndustrySupervisorRoleRouter)
app.use('/university-roles', universitySupervisorAuthentication, UniversitySupervisorRoleRouter)
app.use('/student', studentAuthentication, studentDetails)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();