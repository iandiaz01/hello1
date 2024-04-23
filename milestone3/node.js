

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'your-email@gmail.com',
        subject: `New message from ${req.body.name}`,
        text: `You have received a new message from ${req.body.name} (${req.body.email}): ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.send('Message sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 8080');
});
