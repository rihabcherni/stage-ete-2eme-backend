const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
    wagon: { type: mongoose.Schema.Types.ObjectId, ref: 'Wagon', required: true },
    arrival_time: Date,
    tracking: [
        {
            location_name: { type: String, required: true },
            location_latitude: { type: Number, required: true },
            location_longitude: { type: Number, required: true },
            timestamp: { type: Date, required: true },
        }
      ],
    carbon_emissions: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Shipment', ShipmentSchema);