const express = require('express')
const router = express.Router();
const NotificationService = require('../services/NotificationService')


router.route("/notification/email")
    .post(NotificationService.notifyByStudentEmail)

module.exports = router;