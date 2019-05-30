const getUsers = (req, res) => {
  res.send("sanity check");
};

module.exports = server => {
  server.use(getUsers);
};
