const dbConn = require('../utilities/dbConnection')

const TimetableService = {
    getAll: async function(req, res, next) {
        await dbConn.query(`select t1.id AS id, t1.subject_id as subjectId, t2.code as subjectCode, t2.subject_name AS subjectName, 
                                t2.course_id as courseId, t3.code as courseCode, t3.course_name AS courseName, t1.class_day AS classDay, t1.start_time AS startTime, t1.end_time AS endTime, TIMEDIFF(end_time, start_time) AS duration
                                from timetable t1
                                    left join subjects t2 ON t1.subject_id = t2.id
                                    left join courses t3 ON t2.course_id = t3.id`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getById: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select t1.id AS id, t2.subject_name AS subjectName, t3.course_name AS courseName, t1.class_day AS classDay, t1.start_time AS startTime, t1.end_time AS endTime, TIMEDIFF(end_time, start_time) AS duration
                                from timetable t1
                                    left join subjects t2 ON t1.subject_id = t2.id
                                    left join courses t3 ON t2.course_id = t3.id where t1.id = ${id}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getBySubjectId: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select t1.id AS id, t2.subject_name AS subjectName, t3.course_name AS courseName, t1.class_day AS classDay, t1.start_time AS startTime, t1.end_time AS endTime, TIMEDIFF(end_time, start_time) AS duration
                                from timetable t1
                                    left join subjects t2 ON t1.subject_id = t2.id
                                    left join courses t3 ON t2.course_id = t3.id WHERE t1.subject_id = ${id}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }, 
    getByCourseId: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select t1.id AS id, t2.subject_name AS subjectName, t3.course_name AS courseName, t1.class_day AS classDay, t1.start_time AS startTime, t1.end_time AS endTime, TIMEDIFF(end_time, start_time) AS duration
                                from timetable t1
                                    left join subjects t2 ON t1.subject_id = t2.id
                                    left join courses t3 ON t2.course_id = t3.id where t2.course_id = '${id}'`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },

    mark: async function(req, res, next) {
        let id = req.params.id;
        let status = req.params.status;

        await dbConn.execute(`update timetable set status = ${status} where id = ${id}`)
            .then((data) => {
                res.json(data.changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        model.startTime = model.classStart.toString().split('T')[1]
        model.classEnd = model.classEnd.toString().split('T')[1]

        await dbConn.execute(`update timetable set class_day=${model.classDay}, start_time='${model.startTime}', end_time='${model.endTime}' 
                                    where id = ${model.id}`)
            .then((data) => {
                res.json(data.changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        model.startTime = model.startTime.toString().split('T')[1]
        model.endTime = model.endTime.toString().split('T')[1]

        await dbConn.execute(`insert timetable (subject_id, class_day, start_time, end_time) 
                                    values (${model.subjectId}, ${model.classDay}, '${model.startTime}', '${model.endTime}')`)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    delete: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`delete from timetable where id = ${model.id}`)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = TimetableService;
