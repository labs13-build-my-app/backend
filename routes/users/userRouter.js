const express = require("express");
const data = require("./userModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await data.findUsers();
    if (users.length) {
      res.status(200).json({
        error: false,
        message: "The users were found in the database",
        users
      });
    } else {
      res.status(404).json({
        error: true,
        users: [],
        message: "The users could not be found in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `User request failed ${error.message}.`
    });
  }
});

module.exports = router;
