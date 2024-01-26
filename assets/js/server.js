const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL, // your email
        pass: process.env.GMAIL_PASSWORD // your email password
    }
});

app.post('/contact', async (req, res) => {
    let mailOptions = {
        from: 'your-email@gmail.com', // sender address
        to: 'recipient-email@example.com', // list of receivers
        subject: 'New Contact Form Submission', // Subject line
        text: JSON.stringify(req.body), // plain text body
        // html: '<p>Your HTML here</p>' // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error while sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Thank you for your message! We will respond shortly!');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
