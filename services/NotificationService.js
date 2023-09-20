const dbConn = require('../utilities/dbConnection')
const Messenger = require('../utilities/messenger')

const NotificationService = {   
    notifyAll: async function(title, msg) {
        await dbConn.query(`select token from students where token != null`)
            .then(([data, fields]) => {
                for(var i=0; i<data.length; i++) {
                    Messenger.sendByToken(data[i], title, msg)
                }
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }
}

module.exports = NotificationService;
