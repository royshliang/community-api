const dbConn = require('../utilities/dbConnection')

const CourseService = {
    getAll: async function(req, res, next) {
        await dbConn.query(`select * from courses`)
            .then(([data, fields]) => {
              res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getById: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`select * from courses where id = ${id}`)
            .then(([data, fields]) => {
                res.json(data[0]);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update courses set name = '${model.name}', status = ${model.status} where id = ${model.id}`)
            .then(([data, fields]) => {
                res.json(data.changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    // --- can use the update methods instead
    mark: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`update courses set status = ${model.status} where id = ${model.id}`)
            .then(([data, fields]) => {
                res.json(data.changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`insert courses (name) values ('${model.name}')`)
            .then(([data, fields]) => {
                res.json(data.affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = CourseService;
