const express = require('express')
const AttendenceService = require('../services/AttendenceService')

const router = express.Router();


router.route("/attendencs")
    .get(AttendenceService.getAll)
router.route("/attendence/id/:id")
    .get(AttendenceService.getById)


router.route("/attendance")
    // .put(CourseService.update)
    .post(AttendenceService.insert)


module.exports = router;
