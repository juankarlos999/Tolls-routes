const express = require('express');
const router = express.Router();
const controllersVehiculo = require('../controllers/vehiculos')
router.get('/', controllersVehiculo.getVehiculos);
router.post('/', controllersVehiculo.createVehiculos);
module.exports = router;

