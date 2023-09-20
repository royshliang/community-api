const dbConn = require('../utilities/dbConnection')

const sql = `select id, code, description, status from locations`

const LocationService = {
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

        await dbConn.execute(`update locations set status = ${model.status} where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update locations set code = '${model.code}', description = '${model.description}' where id = ${model.id}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert locations (code, description) values ('${model.code}', '${model.description}') `)
            .then(result => {
                res.json(result[0].affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = LocationService;
