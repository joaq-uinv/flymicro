const express = require("express");
const flightServices = require("../services/flightServices");
const Success = require("../handlers/successHandler");
const logger = require("../loaders/logger");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get all flights
 * @route GET /api/v1/flights
 */
const getAllFlights = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.query));

    //send request to the db
    const flights = await flightServices.findAll(req.query);
    //parse response
    res.json(new Success(flights));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get a flight by its ID
 * @route GET /api/v1/flights/:id
 */
const getFlightByID = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.params.id));

    //send request to the db with the id passed as a param to the url
    const flight = await flightServices.findByID(req.params.id);
    //parse response
    res.json(new Success(flight));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description create a flight
 * @route POST /api/v1/flights
 */
const createFlight = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.body));

    //send request to the db with the data coming from the client
    const flight = await flightServices.save(req.body);
    //parse response
    res.status(201).json(new Success(flight)); //the 201 code states a new resource was created
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description update a flight by its id
 * @route PUT /api/v1/flights/:id
 */
const updateFlight = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.params.id));

    //the id param sent in the request of the /:id endpoint
    const { id } = req.params;

    //data coming from the client
    const flight = req.body;

    //edit flight and persist it to the db
    const updatedFlight = await flightServices.update(id, flight);
    //parse response
    res.json(new Success(updatedFlight));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description delete a flight by its id
 * @route DELETE /api/v1/flights/:id
 */
const deleteFlight = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.params.id));

    //delete from the db the document with the corresponding id sent in the request
    const flight = await flightServices.remove(req.params.id);
    //parse response
    res.json(new Success(flight));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFlights,
  getFlightByID,
  createFlight,
  updateFlight,
  deleteFlight,
};