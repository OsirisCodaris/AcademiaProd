const nodemailer = require('nodemailer')

exports.Mailer = (from,to,subject,message)=>{
  const transporter = nodemailer.createTransport({
    host: 'mocha3027.mochahost.com',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: 'administrator@academiagabon.ga',
      pass: '@dministr@t0r',
    },
  })
  const mailOptions = {
    from: from,
    to: to,

    subject: subject,
    text: message
  }
  // eslint-disable-next-line no-unused-vars
  transporter.sendMail(mailOptions, (err, info) => {
    console.log(`Reset Password successfully. ${err}`)
  })

}