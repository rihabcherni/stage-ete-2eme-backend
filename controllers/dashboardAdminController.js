const Order = require('../models/orderModel');
const { Train, Wagon, CapteurIot } = require('../models/trainModel');
const Reclamation = require('../models/ReclamationModel');
const { User } = require('../models/userModel');
const Itinerary = require('../models/itineraryModel');

exports.getAdminStatistiques = async (req, res) => {
    try {
        const trainCount = await Train.countDocuments({});
        const wagonCount = await Wagon.countDocuments({});
        const capteurIotCount = await CapteurIot.countDocuments({});

        const userCount = await User.countDocuments({});
        const clientCount = await User.countDocuments({ role: 'client' });
        const conducteurCount = await User.countDocuments({ role: 'conducteur' });
        const administrateurCount = await User.countDocuments({ role: 'administrateur' });
        const operateurCount = await User.countDocuments({ role: 'operateur' });

        const orderCount = await Order.countDocuments({});
        const deliveryCount = await Order.countDocuments({status: 'delivered'});
        const itineraryCount = await Itinerary.countDocuments({});
        const reclamationCount = await Reclamation.countDocuments({});

        res.json({
            "Train": trainCount,
            "Wagon": wagonCount,
            "CapteurIot": capteurIotCount,
            "User": userCount,
            "Client": clientCount,
            "Conducteur": conducteurCount,
            "Administrateur": administrateurCount,
            "Operateur": operateurCount,
            "Order": orderCount,
            "Delivery": deliveryCount,
            "Route": itineraryCount,
            // "Maintenance": maintenanceCount,
            "Reclamation": reclamationCount,
        });
    } catch (error) {
        console.error('Error getting statistics:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
