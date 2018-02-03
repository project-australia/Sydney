const nodemailer = require('nodemailer')

// Create the transporter with the required configuration for Gmail
// change the user and pass !
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'hebert@feracode.com',
    pass: 'feracode123!!'
  }
})

const mailOptions = {
  from: '"Our Code World " <hebert@feracode.com>', // sender address (who sends)
  to: 'hebertporto@gmail.com', // list of receivers (who receives)
  subject: 'Hello ', // Subject line
  text: 'Hello world ', // plaintext body
  html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
}

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error)
  }
  console.log('Message sent: ' + info.response)
})
