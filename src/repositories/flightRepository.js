//the repo layer is the one that communicates with the db i.e the model layer
const Flight = require("../models/flight");

class FlightRepository {
  constructor() {}

  async findAll() {
    return await Flight.find();
  }

  async findByID(id) {
    return await Flight.findById(id);
  }

  async save(flight) {
    return await Flight.create(flight);
  }

  async update(id, flight) {
    return await Flight.findByIdAndUpdate(id, flight, { new: true });
  }

  async remove(id) {
    return await Flight.findByIdAndRemove(id);
  }
}

module.exports = FlightRepository;