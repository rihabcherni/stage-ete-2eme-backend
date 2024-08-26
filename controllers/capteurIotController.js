const CapteurIot = require('../models/trainModel');
const DetailsCapteurIot = require('../models/trainModel');

// Add a new IoT sensor (Capteur)
exports.addCapteurIot = async (req, res) => {
  try {
    const capteurIot = new CapteurIot(req.body);
    await capteurIot.save();
    res.status(201).json(capteurIot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all IoT sensors (Capteurs)
exports.getAllCapteurIots = async (req, res) => {
  try {
    const capteurIots = await CapteurIot.find().populate('trainId');
    res.status(200).json(capteurIots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get IoT sensor (Capteur) by ID
exports.getCapteurIotById = async (req, res) => {
  try {
    const capteurIot = await CapteurIot.findById(req.params.id).populate('trainId');
    if (!capteurIot) {
      return res.status(404).json({ error: 'Capteur not found' });
    }
    res.status(200).json(capteurIot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update IoT sensor (Capteur) by ID
exports.updateCapteurIot = async (req, res) => {
  try {
    const capteurIot = await CapteurIot.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!capteurIot) {
      return res.status(404).json({ error: 'Capteur not found' });
    }
    res.status(200).json(capteurIot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete IoT sensor (Capteur) by ID
exports.deleteCapteurIot = async (req, res) => {
  try {
    const capteurIot = await CapteurIot.findByIdAndDelete(req.params.id);
    if (!capteurIot) {
      return res.status(404).json({ error: 'Capteur not found' });
    }
    res.status(200).json({ message: 'Capteur deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Add new details for IoT sensor (Capteur)
exports.addDetailsCapteurIot = async (req, res) => {
  try {
    const detailsCapteurIot = new DetailsCapteurIot(req.body);
    await detailsCapteurIot.save();
    res.status(201).json(detailsCapteurIot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all details for IoT sensors (Capteurs)
exports.getAllDetailsCapteurIots = async (req, res) => {
  try {
    const detailsCapteurIots = await DetailsCapteurIot.find().populate('capteurId');
    res.status(200).json(detailsCapteurIots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get details for IoT sensor (Capteur) by ID
exports.getDetailsCapteurIotById = async (req, res) => {
  try {
    const detailsCapteurIot = await DetailsCapteurIot.findById(req.params.id).populate('capteurId');
    if (!detailsCapteurIot) {
      return res.status(404).json({ error: 'Details not found' });
    }
    res.status(200).json(detailsCapteurIot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update details for IoT sensor (Capteur) by ID
exports.updateDetailsCapteurIot = async (req, res) => {
  try {
    const detailsCapteurIot = await DetailsCapteurIot.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!detailsCapteurIot) {
      return res.status(404).json({ error: 'Details not found' });
    }
    res.status(200).json(detailsCapteurIot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete details for IoT sensor (Capteur) by ID
exports.deleteDetailsCapteurIot = async (req, res) => {
  try {
    const detailsCapteurIot = await DetailsCapteurIot.findByIdAndDelete(req.params.id);
    if (!detailsCapteurIot) {
      return res.status(404).json({ error: 'Details not found' });
    }
    res.status(200).json({ message: 'Details deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
