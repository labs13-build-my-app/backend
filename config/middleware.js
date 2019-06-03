const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { verify } = require("../middleware");

module.exports = (server, express) => {
  server.use(helmet());
  server.use(cors());
  server.use(express.json());
  server.use(morgan("combined"));
  server.use(verify);
};
