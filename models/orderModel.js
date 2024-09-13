const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'in transit', 'delivered', 'canceled'], required: true },
  orderItem: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true } // e.g., "tons", "kg"
    }
  ],
  estimatedDeliveryTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
