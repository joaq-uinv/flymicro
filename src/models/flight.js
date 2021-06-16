const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

//the schema defines the structure of the doc i.e the flight that will be persisted to the db i.e what attributes each flight will have, besides the data type of every attr
const flightSchema = new Schema(
  {
    origin: {
      type: String,
      required: [true, "The origin is required"],
    },
    destination: {
      type: String,
      required: [true, "The destination is required"],
    },
    price: {
      type: Number,
      required: [true, "The price is required required"],
    },
    availability: {
      type: String,
      required: [true, "The availability is required"],
    },
    date: {
      type: String,
      required: [true, "The date is required"],
    },
  },
  { timestamps: true }
);

//use mongoose validator
flightSchema.plugin(uniqueValidator, { message: "already exist in the DB" });

module.exports = mongoose.model("flights", flightSchema);