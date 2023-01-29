const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ayoubelouni6@gmail.com',
      pass: 'tkuchvrzcxwthljl'
    },tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    port: 465,
    host:'smtp.@gmail.com'
  });
function sendkeymail(email,id){
 var mailOptions = {
    from: 'ayoubelouni6@gmail.com',
    to:email,
    subject: 'Password Key',
html:`<p>Hello! the key to set a new password is ${id}  &#128273; .</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendkeymail }
 