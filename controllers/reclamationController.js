const Reclamation = require('../models/ReclamationModel');

exports.createReclamation = async (req, res) => {
  try {
    const { clientId, orderId, message } = req.body;

    const newReclamation = new Reclamation({
      clientId,
      orderId,
      message,
    });

    const savedReclamation = await newReclamation.save();
    res.status(201).json(savedReclamation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reclamation', error });
  }
};
exports.getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find().populate('clientId').populate('orderId');
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reclamations', error });
  }
};
exports.getReclamationById = async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id).populate('clientId').populate('orderId');
    if (!reclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.status(200).json(reclamation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reclamation', error });
  }
};
exports.updateReclamation = async (req, res) => {
    try {
      const { message, status } = req.body;
      let updateFields = { message, status, updatedAt: Date.now() };
      if (status === 'Resolved') {
        updateFields.resolutionDate = Date.now();
      } else {
        updateFields.resolutionDate = null; 
      }
      const updatedReclamation = await Reclamation.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true }
      );
      if (!updatedReclamation) {
        return res.status(404).json({ message: 'Reclamation not found' });
      }
      res.status(200).json(updatedReclamation);
    } catch (error) {
      res.status(500).json({ message: 'Error updating reclamation', error });
    }
  };
exports.deleteReclamation = async (req, res) => {
  try {
    const deletedReclamation = await Reclamation.findByIdAndDelete(req.params.id);
    if (!deletedReclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.status(200).json({ message: 'Reclamation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reclamation', error });
  }
};
// Get reclamations for a specific client
exports.getClientReclamations = async (req, res) => {
    const clientId = req.params.clientId;
    
    try {
      const reclamations = await Reclamation.find({ clientId: clientId });
      
      if (!reclamations) {
        return res.status(404).json({ message: 'No reclamations found for this client' });
      }
      
      res.status(200).json(reclamations);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving reclamations', error });
    }
  };