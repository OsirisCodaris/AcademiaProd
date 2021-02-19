const nodemailer = require('nodemailer')

exports.Mailer = (from, to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: 'hybrid3015.fr.ns.planethoster.net',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: 'administrator@academiagabon.ga',
      pass: '@c@d3m1@2020',
    },
  })
  const mailOptions = {
    from,
    to,

    subject,
    text: message,
  }
  // eslint-disable-next-line no-unused-vars
  transporter.sendMail(mailOptions, (err, info) => {
    console.log(`Reset Password successfully. ${err}`)
  })
}
