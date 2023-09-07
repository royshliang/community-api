const dbConn = require('../utilities/dbConnection')

const SubjectService = {
    getAll: async function(req, res, next) {
        await dbConn.query(`select * from subjects`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getById: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select * from subjects where id = ${id}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getByCourse: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select * from subjects where course_id = ${id}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update subjects set name = '${model.name}', status = '${model.status}' where id = ${model.id}`)
            .then(([data, fields]) => {
                res.json(data.changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert subjects (name) values ('${model.name}')`)
            .then(([data, fields]) => {
                res.json(data.affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = SubjectService;
