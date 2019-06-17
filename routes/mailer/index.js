const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  async function sendMessage() {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "buildmyapplambda@gmail.com", // generated ethereal user
        pass: "Supersecretpass123" // generated ethereal password
      }
    });

    let info = await transporter.sendMail(req.body);
    messageInfo = info;
  }
  sendMessage()
    .then(() => {
      console.log(messageInfo);
      res.status(201).json(messageInfo);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = router => {
  router.post("/", sendEmail);

  return router;
};
