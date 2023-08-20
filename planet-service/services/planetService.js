const Planet = require('../models/planetModel');

// Create a new planet
exports.createPlanet = async (planetData) => {
    return await Planet.create(planetData);
};

// Get all planets
exports.getAllPlanets = async () => {
    return await Planet.find();
};

// Get a single planet by ID
exports.getPlanetById = async (planetId) => {
    return await Planet.findById(planetId);
};

// Update a planet by ID
exports.updatePlanet = async (planetId, updateData) => {
    return await Planet.findByIdAndUpdate(planetId, updateData, { new: true });  // "new: true" returns the updated document
};

// Delete a planet by ID
exports.deletePlanet = async (planetId) => {
    return await Planet.findByIdAndDelete(planetId);
};
