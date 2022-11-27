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
//const userAuthentication = require('./middleware/authentication')



//routers
const StudentAuthRouter = require('./routes/Auth/student')
const HODAuthRouter = require('./routes/Auth/hod')
const UniversityAuthRouter = require('./routes/Auth/university')
const IndustryAuthRouter = require('./routes/Auth/industry')
const AttachmentRouter = require('./routes/attachment')
const ProjectRouter = require('./routes/project')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.get('/',(req, res)=>{
    res.send('Attachment')
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