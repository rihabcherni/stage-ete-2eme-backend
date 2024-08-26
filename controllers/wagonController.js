const { Wagon } = require('../models/trainModel');

// Add a new wagon
exports.addWagon = async (req, res) => {
  try {
    const wagon = new Wagon(req.body);
    await wagon.save();
    res.status(201).json(wagon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWagonByTrainId = async (req, res) => {
  try {
    const wagons = await Wagon.find({ trainId: req.params.trainId });
    res.json(wagons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all wagons
exports.getAllWagons = async (req, res) => {
  try {
    const wagons = await Wagon.find().populate('trainId');
    res.status(200).json(wagons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get wagon by ID
exports.getWagonById = async (req, res) => {
  try {
    const wagon = await Wagon.findById(req.params.id).populate('trainId');
    if (!wagon) {
      return res.status(404).json({ error: 'Wagon not found' });
    }
    res.status(200).json(wagon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update wagon by ID
exports.updateWagon = async (req, res) => {
  try {
    const wagon = await Wagon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!wagon) {
      return res.status(404).json({ error: 'Wagon not found' });
    }
    res.status(200).json(wagon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete wagon by ID
exports.deleteWagon = async (req, res) => {
  try {
    const wagon = await Wagon.findByIdAndDelete(req.params.id);
    if (!wagon) {
      return res.status(404).json({ error: 'Wagon not found' });
    }
    res.status(200).json({ message: 'Wagon deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
