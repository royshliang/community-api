const express = require('express')
const UserService = require('../services/UserService')

const router = express.Router();


router.route("/users")
    .get(UserService.getAll);
router.route("/user/id/:id")
    .get(UserService.getById);

router.route("/user/mark")
    .put(UserService.mark);
router.route("/user")
    .put(UserService.update)
    .post(UserService.insert)
router.route("/user/authenticate")
    .post(UserService.authenticate);


module.exports = router; 