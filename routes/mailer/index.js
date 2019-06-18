const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { replyTo, text, to, name } = req.body;
  const newEmailMessage = {
    from: "Build My App <buildmyapplambda@gmail.com>",
    sender: replyTo,
    to: to,
    replyTo: replyTo,
    subject: `${name} Sent You A Message On Build My App`,
    text: text,
    html: `<p>${text}</p>`
  };
  console.log(newEmailMessage);
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

    let info = await transporter.sendMail(newEmailMessage);
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
