require("dotenv").config();
const server = require("./api/server.js");
const { PORT } = require("./config/config.js");

server.listen(PORT, () => {
  console.log("server running on port ${PORT}");
});
