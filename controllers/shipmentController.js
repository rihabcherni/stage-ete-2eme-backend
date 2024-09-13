const Shipment = require('../models/shipmentModel');

// Create a new shipment
exports.createShipment = async (req, res) => {
    try {
        const shipment = new Shipment(req.body);
        await shipment.save();
        res.status(201).json(shipment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all shipments
exports.getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find()
            .populate('order')
            .populate('train')
            .populate('wagon');
        res.status(200).json(shipments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a single shipment by ID
exports.getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id)
            .populate('order')
            .populate('train')
            .populate('wagon');
        if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
        res.status(200).json(shipment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a shipment by ID
exports.updateShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
        res.status(200).json(shipment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a shipment by ID
exports.deleteShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndDelete(req.params.id);
        if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
        res.status(200).json({ message: 'Shipment deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
