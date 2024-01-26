require('dotenv').config({ path: '/Users/ali/Desktop/MacRepairMan/MacRepairMan/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});

app.post('/contact', upload.none(), async (req, res) => {
    console.log(req.body);
    let mailOptions = {
        from: 'your-email@gmail.com', // sender address
        to: 'a.aloreabi2000@gmail.com', // list of receivers
        subject: 'New Contact Form Submission', // Subject line
        html: '<p><strong>Name:</strong> ' + req.body.name + '</p>' +
            '<p><strong>Email:</strong> ' + req.body.email + '</p>' +
            '<p><strong>Subject:</strong> ' + req.body.subject + '</p>' +
            '<p><strong>Message:</strong> ' + req.body.message + '</p>'
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
