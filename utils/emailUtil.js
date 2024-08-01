const sendmail = require('sendmail')();

const sendEmailOtp = (subject, body, to) => {
    sendmail({
        from: 'suman@gmail.com',
        to: to, //suman.ghorai@codeclouds.co.in
        subject: subject,
        html: body,
      }, function(err, reply) {
        // console.log(err && err.stack);
        // console.dir(reply);
        if (err) {
            console.error('Error sending email:', err);
            return false;
        } else {
            console.log('Email sent successfully:', reply);
            return true;
        }
    });
}

module.exports.sendEmailOtp = sendEmailOtp