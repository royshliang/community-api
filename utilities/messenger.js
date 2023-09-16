
const fbAdmin = require('firebase-admin')
var serviceAccount = require('../secret_key.json');  // fb admin secret key in json file

fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert(serviceAccount)
});

// const messaging = fbAdmin.messaging();

const Messenger = {
    sendMultipleByToken: function(tokenList, title, msg) {
        for(var i=0; i<tokenList.length;  i++) {
            try {
                this.sendByToken(tokenList[i], title, msg);
            }
            catch(ex) {
            }
        }
    },    
    sendByToken: function(token, title, msg) {
        if(!token) token = "cb341eq0kSrpxFqVgr9CZ2:APA91bEFj74n1muFzUgxdu8xndgM8owwUNsexuFhwr6yns0atsg4VSVOWa90VA_W8DZxnvR688ko0NY3lJ0h4UKY8pNgJHflnl_1c2RxyckNMzTtXwPih1azCX5W4tiNXE-Lz5FkF6G-";
        //if(!token) token = "fVBrXemNEtnQXAWyzBIdsM:APA91bFHKwZMT2m_5NrmZLV8PC_jngXnFAoGR2a64EZtwtlF0dqI4YgvkM1H1jsN37yp5g0pCU3hoXfjtFiXclBv4NPvSpm3ylX5hYHvJGKN4qfrt6TpEpKdpy-7cCuTmDOaG1vI9Msc";
        console.log(token);

        let payload = { 
            notification : { title : title, body : msg },
            token: token
        } 

        // let tokens = [
        //     "cb341eq0kSrpxFqVgr9CZ2:APA91bEFj74n1muFzUgxdu8xndgM8owwUNsexuFhwr6yns0atsg4VSVOWa90VA_W8DZxnvR688ko0NY3lJ0h4UKY8pNgJHflnl_1c2RxyckNMzTtXwPih1azCX5W4tiNXE-Lz5FkF6G-",
        //     "fVBrXemNEtnQXAWyzBIdsM:APA91bFHKwZMT2m_5NrmZLV8PC_jngXnFAoGR2a64EZtwtlF0dqI4YgvkM1H1jsN37yp5g0pCU3hoXfjtFiXclBv4NPvSpm3ylX5hYHvJGKN4qfrt6TpEpKdpy-7cCuTmDOaG1vI9Msc"    
        // ];
        let dataload = {
            "token": token,
            //"registration_ids": tokens,
            //registration_ids: ["token1", "token2"], // for Multiple device
            //"notification": {},
            "data": {
                "title": title,
                "body": msg,
                "sound": "default"
            },
            // "android": {
            //     "priority": "high"
            // },
        };


        try {
            fbAdmin.messaging().send(dataload)
                .then(response => {
                    return true;
                })
                .catch(err => {
                    console.log(JSON.stringify(err))
                    return err.message;
                });
        }
        catch(err) {
            console.log(JSON.stringify(err))
        }
    }
}

module.exports = Messenger;