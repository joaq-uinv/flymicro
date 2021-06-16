const { Router } = require("express");
const {
  getAllFlights,
  getFlightByID,
  createFlight,
  updateFlight,
  deleteFlight,
} = require("../controllers/flightControllers");
const {
  getAllRequestValidations,
  getRequestValidations,
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
} = require("../middlewares/flightMiddlewares");

const router = Router();

router.get("/", getAllRequestValidations, getAllFlights);
router.get("/:id", getRequestValidations, getFlightByID);
router.post("/", postRequestValidations, createFlight);
router.put("/:id", putRequestValidations, updateFlight);
router.delete("/:id", deleteRequestValidations, deleteFlight);

module.exports = router;