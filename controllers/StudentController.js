const express = require('express')
const StudentService = require('../services/StudentService')

const router = express.Router();


router.route("/students")
    .get(StudentService.getAll)

router.route("/student/id/:id")
    .get(StudentService.getById);
router.route("/student/email/:email")
    .get(StudentService.getByEmail);
router.route("/student/token/:token")
    .get(StudentService.getByToken);

router.route("/student")
    .put(StudentService.update)
    .post(StudentService.insert)

router.route("/student/authenticate")
    .post(StudentService.upsert)


module.exports = router;
