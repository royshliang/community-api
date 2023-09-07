const dbConn = require('../utilities/dbConnection')

const StudentService = {
    getAll: async function(req, res, next) {
        await dbConn.query(`select * from student`)
            .then(result => {
                res.json(result[0]);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getById: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select * from student where id = ${id}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getByEmail: async function(req, res, next) {
        let email = req.params.id;

        await dbConn.query(`select * from student where email = '${email}'`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getByToken: async function(req, res, next) {
        let token = req.params.token;

        await dbConn.query(`select * from student where token = '${token}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update student set name='${model.name}', email='${model.email}', token='${model.token}', status=${model.status} where id = ${model.id}`)
            .then(([data, fields]) => {
                res.json(data.changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert into student (name, email, token) values ('${model.name}', '${model.email}', '${model.token}')`)
            .then(([data, fields]) => {
                res.json(data.affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = StudentService;

