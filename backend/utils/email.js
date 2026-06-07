const nodemailer = require('nodemailer');

const sendPredictionEmail = async (predictionDetails, userDetails, matchDetails, screenshotPath) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"WC26 Betting Platform" <noreply@worldcup2026.local>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Prediction Submitted by ${userDetails.name}`,
    html: `
      <h2>New Prediction Received</h2>
      <p><strong>User:</strong> ${userDetails.name} (${userDetails.email})</p>
      <p><strong>Match:</strong> ${matchDetails.team_a} vs ${matchDetails.team_b}</p>
      
      <h3>Prediction Details:</h3>
      <ul>
        <li>First Center: ${predictionDetails.first_center}</li>
        <li>First Corner: ${predictionDetails.first_corner}</li>
        <li>First Scorer: ${predictionDetails.first_scorer}</li>
        <li>Final Score: ${predictionDetails.score_a} - ${predictionDetails.score_b}</li>
        <li>Yellow Cards: ${predictionDetails.yellow_cards}</li>
        <li>Red Cards: ${predictionDetails.red_cards}</li>
        <li>Winner: ${predictionDetails.winner}</li>
      </ul>
      <p>Please check the admin dashboard to verify the payment receipt. <a href="${screenshotPath}">View Receipt Online</a></p>
    `,
    attachments: [
      {
        filename: 'payment_receipt.jpg',
        path: screenshotPath
      }
    ]
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPredictionEmail };
