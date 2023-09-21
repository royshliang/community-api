const dbConn = require('../utilities/dbConnection')

const sql = `select id, email, token from students`

const StudentService = {
    getAll: async function(req, res, next) {
        await dbConn.query(`${sql}`)
            .then(result => {
                res.json(result[0]);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getById: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`${sql} where id = ${id} `)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getByEmail: async function(req, res, next) {
        let email = req.params.id;

        await dbConn.query(`${sql} where email = '${email}' `)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getByToken: async function(req, res, next) {
        let token = req.params.token;

        await dbConn.query(`${sql} where token = '${token}' `)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update students set email='${model.email}', token='${model.token}' where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert into students (email, token) values ('${model.email}', '${model.token}') `)
            .then((result) => {
                res.json(result[0].affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    upsert: async function(req, res, next) {
        let model = req.body;

        await dbConn.query(`select * from students where email = '${model.email}' `)
            .then(async ([data, fields]) => {
                if(data.length == 0) {
                    await dbConn.execute(`insert into students (email, token) values ('${model.email}', '${model.token}') `)
                        .then(result => {
                            res.json(result[0].affectedRows)
                        })
                        .catch(err => {
                            res.status(500).json(err.message);
                        })
                }
                else {
                    await dbConn.execute(`update students set token = '${model.token}' where email = '${model.email}' `)
                        .then(result => {
                            return res.json(result[0].changedRows || result[0].affectedRows)
                        })
                        .catch(err => {
                            res.status(500).json(err.message);
                        })
                }
            })
            .catch(err => {
                throw err
            })
    }
}

module.exports = StudentService;

