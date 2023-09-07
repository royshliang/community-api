const dbConn = require('../utilities/dbConnection')

const TimetableService = {
    getAll: async function(req, res, next) {
        await dbConn.query(`select t1.id AS id, t2.name AS subjectName, t3.name AS courseName, t1.class_day AS classDay, t1.class_start AS classStart, t1.class_end AS classEnd, TIMEDIFF(class_end, class_start) AS duration
                                from timetables t1
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

        await dbConn.query(`select t1.id AS id, t2.name AS subjectName, t3.name AS courseName, t1.class_day AS classDay, t1.class_start AS classStart, t1.class_end AS classEnd, TIMEDIFF(class_end, class_start) AS duration
                                from timetables t1
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

        await dbConn.query(`select t1.id AS id, t2.name AS subjectName, t3.name AS courseName, t1.class_day AS classDay, t1.class_start AS classStart, t1.class_end AS classEnd, TIMEDIFF(class_end, class_start) AS duration
                                from timetables t1
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

        await dbConn.query(`select t1.id AS id, t2.name AS subjectName, t3.name AS courseName, t1.class_day AS classDay, t1.class_start AS classStart, t1.class_end AS classEnd, TIMEDIFF(class_end, class_start) AS duration
                                from timetables t1
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

        await dbConn.execute(`update timetables set status = ${status} where id = ${id}`)
            .then((data) => {
                res.json(data.changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update timetables set class_day=${model.classDay}, class_start='${model.classStart}', class_end='${model.classEnd}' 
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

        await dbConn.execute(`insert timetables (subject_id, class_day, class_start, class_end) 
                                    values (${model.subjectId}, ${model.classDay}, '${model.classStart}', '${model.classEnd}')`)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    delete: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`delete from timetables where id = ${model.id}`)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = TimetableService;
