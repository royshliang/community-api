const express = require('express')
const CourseService = require('../services/CourseService')

const router = express.Router();


router.route("/courses")
    .get(CourseService.getAll)
router.route("/course/id/:id")
    .get(CourseService.getById)

// router.route("/course/mark")
//     .put(CourseService.mark)
router.route("/course")
    .put(CourseService.update)
    .post(CourseService.insert)


module.exports = router;
