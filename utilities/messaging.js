// --- 1
const fbAdmin = require('firebase-admin')
var serviceAccount = require('./../secret_key.json');  // fb admin secret key in json file

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceAccount)
});

const messaging = fbAdmin.messaging();

const Messaging = {
    // ---- 1 by tokens
    sendByToken: function(token, title, msg) {
        let payload = { 
            notification : { title : title, body : msg },
            token: token
        } 

        try {
            fbAdmin.messaging().send(payload)
                .then(response => {
                    return true;
                })
                .catch(err => {
                    return err.message;
                });
        }
        catch(err) {
        }
    },
    // --- 2 by topics
    subscribeToTopic: function(topic, token) {

    },
    sendByTopic: function(topic, title, mesg) {
    }
}

module.export = Messaging;