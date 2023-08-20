const Ship = require("../models/shipModel");

exports.createShip = async (data) => {
  const ship = new Ship(data);
  return await ship.save();
};

exports.getShipById = async (id) => {
  return await Ship.findById(id);
};

exports.updateShip = async (id, data) => {
  return await Ship.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteShip = async (id) => {
  return await Ship.findByIdAndRemove(id);
};

exports.getAllShips = async () => {
  return await Ship.find();
};

exports.getShipCapacity = async (id) => {
  const ship = await Ship.findById(id);
  return ship ? ship.capacity : null;
};

exports.filterShips = async (filters) => {
  const pipeline = [];

  // Unwind prices to handle each price as a separate document
  pipeline.push({ $unwind: "$prices" });

  // Match departure date if provided
  if (filters.departureDate) {
    const providedDate = new Date(filters.departureDate);
    const nextDay = new Date(providedDate);

    nextDay.setDate(providedDate.getDate() + 1);

    const dateFilter = {
      departureDate: {
        $gte: providedDate,
        $lt: nextDay,
      },
    };

    pipeline.push({ $match: dateFilter });
  }

  // Match destination if provided
  if (filters.destination) {
    pipeline.push({ $match: { destination: filters.destination } });
  }

  // Match price range if provided
  if (filters.minPrice || filters.maxPrice) {
    const priceFilter = {};

    if (filters.minPrice) {
      priceFilter["prices.amount"] = { $gte: Number(filters.minPrice) };
    }

    if (filters.maxPrice) {
      priceFilter["prices.amount"] = {
        ...priceFilter["prices.amount"],
        $lte: Number(filters.maxPrice),
      };
    }

    pipeline.push({ $match: priceFilter });
  }

  // Group by ships after filtering by price to get the original structure back
  pipeline.push({
    $group: {
      _id: "$_id",
      tripId: { $first: "$tripId" },
      name: { $first: "$name" },
      capacity: { $first: "$capacity" },
      status: { $first: "$status" },
      startPoint: { $first: "$startPoint" },
      destination: { $first: "$destination" },
      duration: { $first: "$duration" },
      departureDate: { $first: "$departureDate" },
      prices: { $push: "$prices" },
      travelMode: { $first: "$travelMode" },
    },
  });

  return await Ship.aggregate(pipeline);
};
