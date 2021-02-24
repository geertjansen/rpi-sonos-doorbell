const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const logger = require("./logger");
const settings = require("./settings");

module.exports = {
  sendMessage() {
    if (settings.getPushNotificationsEnabled()) {
      if (!fs.existsSync(path.join(__dirname, "../../mail.conf.js"))) {
        logger.debug(`Couldn't send message. Notifier config not found`);
        return;
      }
      const transporter = nodemailer.createTransport(
        require("../../mail.conf")
      );
      transporter
        .sendMail({
          from: "pelmolen17@gmail.com",
          to: ["trigger@applet.ifttt.com"],
          subject: "#doorbell",
          text: "De deurbel ging af.",
        })
        .then(() => {
          logger.debug("Message sent!");
        })
        .catch((error) => {
          logger.debug(`Couldn't send message.`);
          logger.debug(error);
        });
    }
  },
};
