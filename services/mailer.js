const mailer = require('nodemailer');

const config = require('../config/app.json');

const transporter = mailer.createTransport(config.mailConfig);

const generateMailOptions = (to, subject, text, html) => {
  return {
    from: `${config.appName} <${config.mailConfig.user}>` ,
    to,
    subject,
    text,
    html,
  };
};

module.exports = {
  sendActivation: async (to, code) => {
    const message = `<h1>To activate your account, click on the link 
     <a href="${config.host}/confirm?code=${code}">Activate</a></h1>`;

    const mailOptions = generateMailOptions(
      to,
      'Activate your account',
      '',
      message,
    );

    try {
      const result = await transporter.sendMail(mailOptions);

      return !!result.messageId;
    } catch (err) {
      throw err;
    }
  },
};
