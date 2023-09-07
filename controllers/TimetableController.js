const express = require('express')
const TimetableService = require('../services/TimetableService')

const router = express.Router();


router.route("/timetables")
    .get(TimetableService.getAll)

router.route("/timetable/id/:id")
    .get(TimetableService.getById);
router.route("/timetable/course/:id")
    .get(TimetableService.getByCourseId);
router.route("/timetable/subject/:id")
    .get(TimetableService.getBySubjectId);


router.route("/timetable/mark/id/:id/status/:status")
    .put(TimetableService.mark)
router.route("/timetable")
    .put(TimetableService.update);


router.route("/timetable")
    .post(TimetableService.insert);
router.route("/timetable")
    .delete(TimetableService.delete);


module.exports = router;
