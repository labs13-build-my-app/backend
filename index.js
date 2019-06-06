require("dotenv").config();
const { server } = require("./api/server");
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`\n --- Server Listening on port ${port}\n`);
});
