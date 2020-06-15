const router = require('express').Router();
let User = require('../models/User');
const nodemailer = require('nodemailer');
const { nextTick } = require('process');

require('dotenv').config();

function generateOTP() { 
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    let OTP = ''; 
    var len = string.length; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += string[Math.floor(Math.random() * len)]; 
    } 
    return OTP; 
} 

router.get('/:id', (req, res) => {
    console.log('Id: ' + req.params.id);
    User.find({email: req.params.id})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/:id', (req, res) => {
    const email_ = req.body.email;
    console.log(email_)
    const OTP = generateOTP();
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.USER_MAIL}`,
          pass: `${process.env.USER_PASSWORD}`
        }
      });
      
    var mailOptions = {
        from: `${process.env.USER_MAIL}`,
        to: `${email_}`,
        subject: 'Survey - Verification Code',
        text: `Welcome user! Verification Code: ${OTP}`
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            User.remove({email: req.body.email})
            .then(() => console.log('User removed from database'))
            .catch(err => res.status(400).json('Error: ' + err));

            const userCode = new User({
                email: email_,
                code: OTP
            });
            console.log('Email sent: ' + info.response);

            userCode.save()
            .then(() => console.log('Saved into database!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

module.exports = router;