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
function sendmail(email,nom){
 var mailOptions = {
    from: 'ayoubelouni6@gmail.com',
    to:email,
    subject: 'Inscription',
html:`<p>Hello ${nom} your inscription is validate!
You are welcome To our Chat-App &#128522; .</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendmail }
 