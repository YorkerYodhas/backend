const express = require('express');
const planetController = require('../controllers/planetController');
const router = express.Router();

router.post('/', planetController.createPlanet);
router.get('/', planetController.getAllPlanets);
router.get('/:id', planetController.getPlanetById);
router.put('/:id', planetController.updatePlanet);
router.delete('/:id', planetController.deletePlanet);

module.exports = router;
