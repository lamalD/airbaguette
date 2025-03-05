// emailService.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    // Create a transporter using Combell's SMTP settings
    const transporter = nodemailer.createTransport({
        host: 'smtp-auth.mailprotect.be', // Replace with Combell's SMTP host
        port: 465, // Use 587 for TLS or 465 for SSL
        secure: true, // Set to true if using port 465
        auth: {
            user: 'contact@airbaguette.be', // Your Combell email address
            pass: '@1Rbagu3tt3' // Your Combell email password
        }
    });

    // Email options
    const mailOptions = {
        from: 'contact@airbaguette.be', // Your Combell email address
        to: to,
        subject: subject,
        text: text
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;