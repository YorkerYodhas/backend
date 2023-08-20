const express = require('express');
const shipController = require('../controllers/shipController');
const router = express.Router();

router.post('/', shipController.createShip);
router.get('/:id', shipController.getShipById);
router.put('/:id', shipController.updateShip);
router.delete('/:id', shipController.deleteShip);
router.get('/capacity/:id', shipController.getShipCapacity);
router.get('/', shipController.filterShips); // This will also handle 'getAllShips' since it accommodates filters and fetches all when no filters are provided

module.exports = router;
