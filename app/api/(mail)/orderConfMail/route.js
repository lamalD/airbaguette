// server.js or your main server file
const express = require('express');
const sendEmail = require('./emailService');

const app = express();
app.use(express.json());

app.post('/send-order-confirmation', async (req, res) => {
    const { email, amount } = req.body;

    const subject = 'Order Confirmation';
    const text = `Thank you for your order! Your order amount is €${amount}.`;

    try {
        await sendEmail(email, subject, text);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});