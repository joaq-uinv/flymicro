//validation middleware for both the users and the authentication
const { check, validationResult } = require("express-validator");
const express = require("express");
const flightServices = require("../services/flightServices");
const AppError = require("../errors/AppError");
const logger = require("../loaders/logger");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const _validationResult = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  !errors.isEmpty() && new AppError("Validation error", 400, errors.errors);
  next();
};

//check if the required attributes of the flight model are sent in the request
const _requiredID = check("id", "The ID is required").not().isEmpty();
const _requiredOrigin = check("origin", "The origin is required")
  .not()
  .isEmpty();
const _requiredDestination = check("destination", "The destination is required")
  .not()
  .isEmpty();
const _requiredPrice = check("price", "The price is required").not().isEmpty();
const _requiredAvailability = check(
  "availability",
  "The availability is required"
)
  .not()
  .isEmpty();
const _requiredDate = check("date", "The date is required").not().isEmpty();

//check if the id sent in the request matches the format of an automatically generated id by mongo
const _isMongoID = check("id").isMongoId();

//check if an id sent in the request matches an already existing id in the db
const _idExists = check("id").custom(async (id = "") => {
  //look for a document in the db with the id sent in the req
  const foundFlight = await flightServices.findByID(id);
  //throw exception if said id is not found in the db
  !foundFlight &&
    new AppError(`A flight with the ID ${id} does not exist in the DB`, 400);
});

//check if the price sent in the request is a number
const _isPriceANumber = check("price").isNumeric();
const _isOptionalPriceANumber = check("price").optional().isNumeric(); //for PUT validations

//!PARA HACER: QUE EL LUGAR DE ORIGEN !== LUGAR DE DESTINO. CORREGIR ESTAS FUNCIOENS
const _areLocationsDifferent = check("origin").custom(
  async (origin = "", { req }) => {
    const originAttr = req.body.origin;
    origin === originAttr &&
      new AppError("The origin and the destination must be different", 400);
  }
);

const _areOptionalLocationsDifferent = check("id")
  .optional()
  .custom(async (id = "") => {
    //look for a document in the db with the id sent in the req
    const foundFlight = await flightServices.findByID(id);
    //throw exception if the origin
    foundFlight.origin === foundFlight.destination &&
      new AppError("The origin and the destination must be different", 400);
  });

//validations for GET /flights
const getAllRequestValidations = [_validationResult];

//validations for GET /flights/:id
const getRequestValidations = [
  _requiredID,
  _isMongoID,
  _idExists,
  _validationResult,
];

//validations for POST /flights
const postRequestValidations = [
  _requiredOrigin,
  _requiredDestination,
  _requiredPrice,
  _requiredAvailability,
  _requiredDate,
  _isPriceANumber,
  _areLocationsDifferent,
  _validationResult,
];

//validations for PUT /flights/:id
const putRequestValidations = [
  _requiredID,
  _isMongoID,
  _idExists,
  _isOptionalPriceANumber,
  _areOptionalLocationsDifferent,
  _validationResult,
];

//validations for DELETE /flights/:id
const deleteRequestValidations = [
  _requiredID,
  _isMongoID,
  _idExists,
  // validationResult,
];

module.exports = {
  getAllRequestValidations,
  getRequestValidations,
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
};