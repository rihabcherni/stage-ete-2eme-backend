const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
    route: [
        {
            station: { type: String, required: true },
            arrivalTime: { type: Date, required: true },
            departureTime: { type: Date, required: true }
        }
    ],
    optimized: { type: Boolean, default: false },
    carbonEmissions: { type: Number, required: true }, // in kilograms
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
