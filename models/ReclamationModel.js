const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReclamationSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true }, 
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },   
  message: { type: String, required: true },                              
  status: { type: String, enum: ['Pending', 'Resolved', 'In Progress'], default: 'Pending' }, 
  resolutionDate: { type: Date, default: null },  
  createdAt: { type: Date, default: Date.now },                            
  updatedAt: { type: Date, default: Date.now },                           
});

module.exports = mongoose.model('Reclamation', ReclamationSchema);
