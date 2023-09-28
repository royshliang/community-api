const dbConn = require('../utilities/dbConnection')
const notificationService = require('./NotificationService')

const sql = `select id as id, code as code, course_name as courseName, status as status from courses`

const CourseService = {
    getAll: async function(req, res, next) {
        await dbConn.query(`${sql}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getById: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`${sql} where id = ${id}`)
            .then(([data, fields]) => {
                res.json(data[0]);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    mark: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update courses set status = ${model.status} where id = ${model.id}`)
            .then(result => {
                //notificationService.notifyAll("Courses Marked", "There is a change in the course, please check !!!")
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update courses set code = '${model.code}', course_name = '${model.courseName}' where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert courses (code, course_name) values ('${model.code}', '${model.courseName}') `)
            .then(result => {
                res.json(result[0].affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = CourseService;
