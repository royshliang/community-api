const dbConn = require('../utilities/dbConnection')
const messaging = require('../utilities/messenger')

const SubjectService = {
    getAll: async function(req, res, next) {
        await dbConn.query(`select t1.id as subjectId, t1.code as subjectCode, t1.name as subjectName, t2.id as courseID, t2.code as courseCode, t2.course_name as courseName, t1.status as status  
                                from subjects t1 
                                    left join courses t2 on t1.course_id = t2.id`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getById: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select t1.id as subjectId, t1.code as subjectCode, t1.subject_name as subjectName, t2.id as courseID, t2.code as courseCode, t2.course_name as courseName, t1.status as status  
                                from subjects t1 
                                    left join courses t2 on t1.course_id = t2.id where t1.id = '${id}' `)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getByCourse: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select t1.id as subjectId, t1.code as subjectCode, t1.subject_name as subjectName, t2.id as courseID, t2.code as courseCode, t2.course_name as courseName, t1.status as status
                                from subjects t1
                                    left join courses t2 on t1.course_id = t2.id where t1.course_id = '${id}' `)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    mark: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update subjects set status = ${model.status} where id = ${model.subjectId}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update subjects set subject_name='${model.subjectName}', course_id = ${mode.courseId} where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert subjects (code, subject_name) values ('${model.code}', '${model.subjectName}')`)
            .then(result => {
                res.json(result[0].affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = SubjectService;
