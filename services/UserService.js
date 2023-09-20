const dbConn = require('../utilities/dbConnection')

const sql = `select id, name, email, password, status from users`

const UserService = {
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

        await dbConn.execute(`update users set status = ${model.status} where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update users set name = '${model.name}', email = '${model.email}', password = '${model.password}' where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert users (name, email, password) values ('${model.name}', '${model.email}', '${model.password}') `)
            .then(result => {
                res.json(result[0].affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    authenticate: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`${sql} where email = '${model.email}' and password = '${model.password}' and status = 1 `)
            .then(([data, fields]) => {
                res.json(data[0]);
            })  
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = UserService;
