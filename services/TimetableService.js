const dbConn = require('../utilities/dbConnection')
const notificationService = require('./NotificationService')

const sql = `select t1.id AS id, t1.subject_id as subjectId, t1.location_id as locationId, t1.status as status, t2.code as subjectCode, t2.subject_name AS subjectName, t2.color as color,
                t2.course_id as courseId, t3.code as courseCode, t3.course_name AS courseName, t1.class_day AS classDay, t1.start_time AS startTime, t1.end_time AS endTime, TIMEDIFF(end_time, start_time) AS duration,
                t4.code as locationCode, t4.description as locationDescription 
                from timetable t1
                    left join subjects t2 ON t1.subject_id = t2.id
                    left join courses t3 ON t2.course_id = t3.id
                    left join locations t4 on t1.location_id = t4.id`;

const TimetableService = {
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

        await dbConn.query(`${sql} where t1.id = ${id}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    getBySubjectId: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`${sql} WHERE t1.subject_id = ${id}`)
            .then(([data, fields]) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }, 
    getByCourseId: async function(req, res, next) {
        let id = req.params.id;

        await dbConn.query(`${sql} where t2.course_id = '${id}' order by t1.start_time `)
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

        await dbConn.execute(`update timetable set status = ${status} where id = ${id}`)
            .then(result => {
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    update: async function(req, res, next) {
        let model = req.body;

        model.startTime = model.startTime.toString().split('T')[1]
        model.endTime = model.endTime.toString().split('T')[1]

        await dbConn.execute(`update timetable set class_day=${model.classDay}, start_time='${model.startTime}', end_time='${model.endTime}', location_id = ${model.locationId}, subject_id = ${model.subjectId} 
                                    where id = ${model.id}`)
            .then(result => {
                // --- notifications ****
                notificationService.notifyAll("Timetable Changes", `${model.subjectName} has been moved to ${TimetableService.convertDayName(model.classDay)} ${model.startTime} (Location ${model.locationCode})`)
                res.json(result[0].changedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    insert: async function(req, res, next) {
        let model = req.body;

        model.startTime = model.startTime.toString().split('T')[1]
        model.endTime = model.endTime.toString().split('T')[1]

        await dbConn.execute(`insert timetable (subject_id, class_day, start_time, end_time, location_id) 
                                    values (${model.subjectId}, ${model.classDay}, '${model.startTime}', '${model.endTime}', ${model.locationId})`)
            .then(async (result) => {
                //
                let subjectName = '';
                await dbConn.query(`select subject_name as subjectName from subjects where id = ${model.subjectId}`)
                    .then(([data, fields]) => {
                        subjectName = data[0].subjectName;
                    })
                    .catch(err => {})
                // --- notifications ****
                notificationService.notifyAll("Timetable Additions", `${subjectName} added on ${TimetableService.convertDayName(model.classDay)} ${model.startTime}`)
                res.json(result[0].affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },
    delete: async function(req, res, next) {
        let model = req.body;

        await dbConn.execute(`delete from timetable where id = ${model.id}`)
            .then(result => {
                // --- notifications ****
                notificationService.notifyAll("Timetable Removal", `Hoooray ${model.subjectName} on ${TimetableService.convertDayName(model.classDay)} ${model.startTime} removed`)
                res.json(result[0].affectedRows);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    },

    convertDayName: function(dayNum) {
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return dayNames[dayNum - 1]
    }
}

module.exports = TimetableService;
