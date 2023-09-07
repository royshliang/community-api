// --- 1
const admin = require('firebase-admin')

var serviceAccount = require('./secret_key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const messaging = admin.messaging();

const Messaging = {
    // ---- 1 by tokens
    sendByToken: function(token, title, msg) {
        let payload = { 
            notification : { title : title, body : msg },
            token: token
        } 

        admin.messaging().send(payload)
            .then(response => {
                return true;
            })
            .catch(err => {
                return err.message;
            });
    },
    // --- 2 by topics
    subscribeToTopic: function(topic, token) {

    },
    sendByTopic: function(topic, title, mesg) {
        let payload = { 
            notification : { title : title, body : msg }
        } 

        admin.messaging().sendByTopic(topic, payload)
            .then(response => {
                return true;
            })
            .catch(err => {
                return error.message;
            });
    }
}

module.export = Messaging;