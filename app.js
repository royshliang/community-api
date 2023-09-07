const express = require('express');
const cors = require('cors')

var app = express();
app.use(cors());
app.use(express.json());


// =================================================================================================================== //
// --- setup controllers
const StudentController    = require('./controllers/StudentController')
const SubjectController    = require('./controllers/SubjectController')
const CourseController     = require('./controllers/CourseController')
const TimetableController  = require('./controllers/TimetableController')

app
    .use(StudentController)
    .use(SubjectController)
    .use(CourseController)
    .use(TimetableController)
    

// ========================= S T A R T   E X P R E S S   S E R V I C E =============== //
const port = process.env.port || 3333;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
