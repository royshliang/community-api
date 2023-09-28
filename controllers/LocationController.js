const express = require('express')
const LocationService = require('../services/LocationService')

const router = express.Router();


router.route("/locations")
    .get(LocationService.getAll)
router.route("/location/id/:id")
    .get(LocationService.getById);

router.route("/location/mark")
    .put(LocationService.mark)
router.route("/location")
    .put(LocationService.update)
    .post(LocationService.insert)


module.exports = router;