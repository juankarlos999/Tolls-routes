const Vehiculos = require('../models/vehiculos')
exports.getVehiculos = async(req, res) =>{
    const result = {Vehiculos:await Vehiculos.findVehiculos()}
    res.status(200).send(result)
};

exports.createVehiculos=(req, res)=>{
    Vehiculos.createVehiculos(req.body)
    res.status(201).send('create')
}

