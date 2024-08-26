const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in transit', 'delivered', 'canceled'], required: true },
  materials: [
    {
      type: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true } // e.g., "tons", "kg"
    }
  ],
  estimatedDeliveryTime: { type: Date },
  tracking: [
    {
      location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
      timestamp: { type: Date, required: true },
      status: { type: String, required: true } // "loaded", "in transit", "unloaded"
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
