const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const swaggerUI = require("swagger-ui-express");
const config = require("../../config");
const logger = require("../logger");

class Server {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.flightPath = `${config.api.prefix}/flights`;
    this._middlewares();
    this._swaggerConfig();
    this._routes();
    this._notFound();
    this._errorHandler();
  }

  _middlewares() {
    this.app.use(express.json()); //body parser
    this.app.use(cors());
    this.app.use(morgan("tiny")); //logger
  }

  _routes() {
    this.app.head("/status", (req, res) => {
      res.status(200).end(); //check if server is running
    });

    this.app.use(this.flightPath, require("../../routes/flight")); //use the routes created in the  routes file in the /api/v1 endpoint
  }

  //external error
  _notFound() {
    this.app.use((req, res, next) => {
      const err = new Error("Not Found");
      //create the attribute code of the err variable
      err.code = 404;
      next(err);
    });
  }

  //internal server error
  _errorHandler() {
    /**
     * @param {express.ErrorRequestHandler} err
     */
    this.app.use((err, req, res, next) => {
      const code = err.code || 500;

      logger.error(
        `${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      logger.error(err.stack);

      //define the structure of the error
      const body = {
        error: {
          code,
          message: err.message,
          detail: err.data,
        },
      };
      //parse the error
      res.status(code).json(body);
    });
  }

  _swaggerConfig() {
    this.app.use(
      config.swagger.path,
      swaggerUI.serve,
      swaggerUI.setup(require("../swagger/swagger.json"))
    );
  }

  async start() {
    //app will listen on port set in config file
    this.app.listen(this.port, (error) => {
      //if there's an error, the app will shut down
      if (error) {
        logger.error(error);
        process.exit(1);
        return;
      }
    });
  }
}

module.exports = Server;