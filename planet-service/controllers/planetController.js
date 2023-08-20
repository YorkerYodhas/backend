const planetService = require('../services/planetService');

exports.createPlanet = async (req, res) => {
    try {
        const planet = await planetService.createPlanet(req.body);
        res.status(201).json(planet);
    } catch (error) {
        res.status(500).json({ message: 'Error creating planet', error: error.message });
    }
};

exports.getAllPlanets = async (req, res) => {
    try {
        const planets = await planetService.getAllPlanets();
        res.status(200).json(planets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching planets', error: error.message });
    }
};

exports.getPlanetById = async (req, res) => {
    try {
        const planet = await planetService.getPlanetById(req.params.id);
        if (!planet) return res.status(404).json({ message: 'Planet not found' });
        res.status(200).json(planet);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching planet', error: error.message });
    }
};

exports.updatePlanet = async (req, res) => {
    try {
        const planet = await planetService.updatePlanet(req.params.id, req.body);
        if (!planet) return res.status(404).json({ message: 'Planet not found' });
        res.status(200).json(planet);
    } catch (error) {
        res.status(500).json({ message: 'Error updating planet', error: error.message });
    }
};

exports.deletePlanet = async (req, res) => {
    try {
        await planetService.deletePlanet(req.params.id);
        res.status(200).json({ message: 'Planet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting planet', error: error.message });
    }
};
