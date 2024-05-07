const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate');

router.post('/generate', certificateController.createCertificate);

module.exports = router;