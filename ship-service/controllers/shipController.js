const shipService = require('../services/shipService');

exports.createShip = async (req, res, next) => {
    try {
        const ship = await shipService.createShip(req.body);
        res.status(201).json(ship);
    } catch (error) {
        next(error);
    }
};

exports.getShipById = async (req, res, next) => {
    try {
        const ship = await shipService.getShipById(req.params.id);
        if (ship) {
            res.json(ship);
        } else {
            res.status(404).send({ message: "Ship not found" });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateShip = async (req, res, next) => {
    try {
        const ship = await shipService.updateShip(req.params.id, req.body);
        res.json(ship);
    } catch (error) {
        next(error);
    }
};

exports.deleteShip = async (req, res, next) => {
    try {
        await shipService.deleteShip(req.params.id);
        res.status(200).send({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.getAllShips = async (req, res, next) => {
    try {
        const ships = await shipService.getAllShips();
        res.json(ships);
    } catch (error) {
        next(error);
    }
};

exports.getShipCapacity = async (req, res, next) => {
    try {
        const capacity = await shipService.getShipCapacity(req.params.id);
        if (capacity !== null) {
            res.json({ capacity });
        } else {
            res.status(404).send({ message: "Ship not found" });
        }
    } catch (error) {
        next(error);
    }
};

exports.filterShips = async (req, res, next) => {
    try {
        const ships = await shipService.filterShips(req.query);
        res.json(ships);
    } catch (error) {
        next(error);
    }
};
