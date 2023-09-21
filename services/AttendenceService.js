const dbConn = require('../utilities/dbConnection')

const sql = `select t1.subject_id as sujectId, t3.subject_name as subjectName, t2.id as studentId, t2.email as studentEmail,
                t1.scan_time as scanTime
                from attendences t1
                    left join students t2 on t1.student_id = t2.id
                    left join subjects t3 on t1.subject_id = t3.id `

const AttendenceService = {
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
    // update: async function(req, res, next) {
    //     let model = req.body;

    //     await dbConn.execute(`update courses set code = '${model.code}', course_name = '${model.courseName}' where id = ${model.id}`)
    //         .then(result => {
    //             res.json(result[0].changedRows);
    //         })
    //         .catch(err => {
    //             res.status(500).json(err.message);
    //         })
    // },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert attendances (student_id, subject_id) select id, ${model.subjectId} from students where email='${model.email}' `)
            .then(result => {
                res.json(result[0].affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = AttendenceService;
