const Itinerary = require('../models/itineraryModel');
const { itinerarySchema } = require('../validation/itineraryValidation');

// Create Itinerary
exports.createItinerary = async (req, res) => {
    const { error } = itinerarySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const itinerary = new Itinerary(req.body);
        await itinerary.save();
        res.status(201).send(itinerary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while creating the itinerary.');
    }
};

// Get all Itineraries
exports.getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.send(itineraries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while fetching itineraries.');
    }
};

// Get Itinerary by ID
exports.getItineraryById = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) return res.status(404).send('Itinerary not found.');
        res.send(itinerary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while fetching the itinerary.');
    }
};

// Update Itinerary
exports.updateItinerary = async (req, res) => {
    const { error } = itinerarySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!itinerary) return res.status(404).send('Itinerary not found.');
        res.send(itinerary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while updating the itinerary.');
    }
};

// Delete Itinerary
exports.deleteItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
        if (!itinerary) return res.status(404).send('Itinerary not found.');
        res.send('Itinerary deleted successfully.');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while deleting the itinerary.');
    }
};
