const nodemailer = require("nodemailer");
const users = require("../users/userModel");
const projects = require("../projects/model");

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
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS // generated ethereal password
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
const sendEmailUpdate = async (req, res) => {
  let projectOwnerEmail;
  let projectName;

  // console.log(req.body);
  const { projectID, userEmail, name } = req.body;
  console.log(projectID, userEmail);
  projects
    .findById(projectID)
    .then(project => {
      projectOwnerEmail = project.email;
      projectName = project.name;
      console.log(projectOwnerEmail);

      const newEmailMessage = {
        from: "Build My App <buildmyapplambda@gmail.com>",
        sender: userEmail,
        to: projectOwnerEmail,
        replyTo: userEmail,
        subject: `${name} Updated Their Plan For One Of Your Projects `,
        text: `${projectName} now has a plan that has been marked as completed, check with the developer to ensure you are satisfied with the work and update your project status on Build My App`,
        html: `<p>${projectName} now has a plan that has been marked as completed, check with the developer to ensure you are satisfied with the work and update your project status on Build My App</p>`
      };
      console.log(newEmailMessage);
      async function sendMessage() {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASS // generated ethereal password
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
    })
    .catch(err => console.log(err));
};

module.exports = router => {
  router.post("/", sendEmail);
  router.post("/update", sendEmailUpdate);

  return router;
};
