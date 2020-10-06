const express = require('express');
const router = express.Router();
const vehiculos = require('./vehiculos');
router.use('/vehiculos', vehiculos);
module.exports = router;