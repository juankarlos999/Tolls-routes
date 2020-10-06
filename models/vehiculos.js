const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vehiculos = new Schema({
    id:Number,
    brand:{type:String,required:true},
    model:{type:Number,required:true,min:1960,max:2050},
    fuel_type:{type:String, required:true,enum:['Disel', 'Gas']},
    features:mongoose.SchemaTypes.Mixed
});

Vehiculos.statics.createVehiculos = (vehiculo) => {
    this.create(vehiculo, (error)=> console.error(error))
}

Vehiculos.statics.findVehiculos = async() => {
    return await this.find()
}

Vehiculos.statics.findById = async(id) => {
    if(mongoose.isValidObjectId(id)) return await this.findById(id).exec()
    return null;  
}

Vehiculos.statics.updateVehiculos = async(id,vehiculo) => {
    if(mongoose.isValidObjectId(id)) return await this.findByIdAndUpdate(id,vehiculo)
    return null;
}

Vehiculos.statics.deleteVehiculos = async(id) => {
    if(mongoose.isValidObjectId(id)) return await this.findByIdAndDelete(id)
    return null;
}
module.exports = mongoose.model('Vehiculos', Vehiculos)