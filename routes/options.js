const router = require('express').Router();
let Option = require('../models/Option');
let Count = require('../models/Count');

router.post('/add/:id', (req, res) => {
    const email = req.body.email;
    const selectedChoice = req.body.choice;
    
    const newOption = new Option({
        email,
        choice: selectedChoice
    });

    newOption.save()
    .then(() => { 
        console.log(selectedChoice);
        Count.update({ choice: selectedChoice }, {$inc: { countVal: 1 }}, () => {
            res.json('Entry added!')
            // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // res.setHeader('Access-Control-Allow-Credentials', true);
            // res.redirect(`http://localhost:3000/result/${email}/${selectedChoice}`);
        });
 
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/values', (req, res) => {
    Count.find({})
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;