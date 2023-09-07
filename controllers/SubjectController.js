const express = require('express')
const SubjectService = require('../services/SubjectService')

const router = express.Router();


router.route("/subjects")
    .get(SubjectService.getAll)

router.route("/subject/id/:id")
    .get(SubjectService.getById);
router.route("/subject/course/id/:id")
    .get(SubjectService.getByCourse);

router.route("/subject")
    .put(SubjectService.update)
    .post(SubjectService.insert)


module.exports = router;