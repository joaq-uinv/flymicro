//in this layer the business logic takes place
const FlightRepository = require("../repositories/flightRepository");
const repository = new FlightRepository();

const findAll = async (filter, options) => {
  return await repository.findAll(filter, options);
};

const findByID = async (id) => {
  return await repository.findByID(id);
};

const save = async (flight) => {
  return await repository.save(flight);
};

const update = async (id, flight) => {
  return await repository.update(id, flight);
};

const remove = async (id) => {
  return await repository.remove(id);
};

module.exports = {
  findAll,
  findByID,
  save,
  update,
  remove,
};