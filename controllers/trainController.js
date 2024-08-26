const { Train, CurrentLocation, ConductorTrain } = require('../models/trainModel');

// Add a new train
exports.addTrain = async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ error: 'Duplicate key error. Ensure that train_reference is unique.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Get all trains
exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a train
exports.updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a train
exports.deleteTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    res.status(200).json({ message: 'Train deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a new current location
exports.addCurrentLocation = async (req, res) => {
  try {
    const location = new CurrentLocation(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all current locations
exports.getAllCurrentLocations = async (req, res) => {
  try {
    const locations = await CurrentLocation.find().populate('trainId');
    res.status(200).json(locations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get current location by ID
exports.getCurrentLocationById = async (req, res) => {
  try {
    const location = await CurrentLocation.findById(req.params.id).populate('trainId');
    if (!location) {
      return res.status(404).json({ error: 'Current location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update current location by ID
exports.updateCurrentLocation = async (req, res) => {
  try {
    const location = await CurrentLocation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!location) {
      return res.status(404).json({ error: 'Current location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete current location by ID
exports.deleteCurrentLocation = async (req, res) => {
  try {
    const location = await CurrentLocation.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Current location not found' });
    }
    res.status(200).json({ message: 'Current location deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Add a new conductor train assignment
exports.addConductorTrain = async (req, res) => {
  try {
    const conductorTrain = new ConductorTrain(req.body);
    await conductorTrain.save();
    res.status(201).json(conductorTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all conductor train assignments
exports.getAllConductorTrains = async (req, res) => {
  try {
    const conductorTrains = await ConductorTrain.find().populate('trainId').populate('conductorId');
    res.status(200).json(conductorTrains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get conductor train assignment by ID
exports.getConductorTrainById = async (req, res) => {
  try {
    const conductorTrain = await ConductorTrain.findById(req.params.id).populate('trainId').populate('conductorId');
    if (!conductorTrain) {
      return res.status(404).json({ error: 'Conductor train assignment not found' });
    }
    res.status(200).json(conductorTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update conductor train assignment by ID
exports.updateConductorTrain = async (req, res) => {
  try {
    const conductorTrain = await ConductorTrain.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!conductorTrain) {
      return res.status(404).json({ error: 'Conductor train assignment not found' });
    }
    res.status(200).json(conductorTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete conductor train assignment by ID
exports.deleteConductorTrain = async (req, res) => {
  try {
    const conductorTrain = await ConductorTrain.findByIdAndDelete(req.params.id);
    if (!conductorTrain) {
      return res.status(404).json({ error: 'Conductor train assignment not found' });
    }
    res.status(200).json({ message: 'Conductor train assignment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
