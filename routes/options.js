const router = require('express').Router();
let Option = require('../models/Option');

router.post('/add/:id', (req, res) => {
    const email = req.body.email;
    const choice = req.body.choice;
    
    const newOption = new Option({
        email,
        choice
    });

    newOption.save()
    .then(() => res.json('Entry added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router