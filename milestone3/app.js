const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

require('dotenv').config(); // To use environment variables from .env file

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use environment variable
            pass: process.env.EMAIL_PASS  // Use environment variable
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_USER, // Use your email from environment variable
        subject: `New message from ${req.body.name}`,
        text: `You have received a new message from ${req.body.name} (${req.body.email}): ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending message: ' + error.message); 
        } else {
            res.status(200).send('Message sent: ' + info.response);
        }
    });
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
