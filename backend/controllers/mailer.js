const Mailgen = require("mailgen");
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.secret_private_key);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

class Mailer {
  async registerMail(req, res) {
    const { username, userEmail, text, subject } = req.body;

    let response = {
      body: {
        name: username,
        intro: text || "Welcome",
        //outro: "Looking forward to do more business",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.support_mail,
      to: userEmail,
      subject: subject || "Signup Successful",
      html: mail,
    };
    try {
      await sendgrid.send(message);
      return res.status(201).json({ msg: "You should receive an email" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new Mailer();
