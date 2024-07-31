const transporter = require("../config/nodeconfig");

const EMAIL_USER = process.env.EMAIL_USER;

async function sendMail(email, user_id) {

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'reset password',
    text: `http://localhost:3000/resetPassword/${user_id}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      res.json({ Status: 'Email sent successfully:' });
    }
  });
}

async function approvelmail(email, user_id,comapnyname,companylocation,jobTitle) {

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'interview shedule mail',
    text: `hello ${user_id} 
        our ${comapnyname} will arrage the interview with you for the position of ${jobTitle}
        come to this ${companylocation} at 19th may 12pm
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      res.json({ Status: 'Email sent successfully:' });
    }
  });
}
module.exports = {sendMail,approvelmail}