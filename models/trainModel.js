const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainSchema = new Schema({
  train_reference: { type: String, required: true},
  status: { type: String, enum: ['available', 'in transit', 'maintenance'], required: true },
  serviceStartDate: { type: Date, default: Date.now },
  modele_train:{type:String},
  carbonEmissions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Train = mongoose.model('Train', trainSchema);

const currentLocationSchema = new Schema({
  trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});
const conductorTrainSchema = new Schema({
  trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
  conductorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date_affectation: { type: Date, required: true },
  duree_affectation: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const wagonSchema = new Schema({
  trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
  wagon_reference: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true }, 
  currentLoad: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const capteurIotSchema = new Schema({
  wagonId: { type: Schema.Types.ObjectId, ref: 'Wagon', required: true },
  capteur_reference: { type: String, required: true, unique: true },
  type: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const detailsCapteurIotSchema = new Schema({
  capteurId: { type: Schema.Types.ObjectId, ref: 'CapteurIot', required: true },
  data: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
const DetailsCapteurIot = mongoose.model('DetailsCapteurIot', detailsCapteurIotSchema);
const CapteurIot = mongoose.model('CapteurIot', capteurIotSchema);
const Wagon = mongoose.model('Wagon', wagonSchema);
const CurrentLocation = mongoose.model('CurrentLocation', currentLocationSchema);
const ConductorTrain = mongoose.model('ConductorTrain', conductorTrainSchema);
module.exports = { Train, CurrentLocation,ConductorTrain, Wagon ,CapteurIot,DetailsCapteurIot};