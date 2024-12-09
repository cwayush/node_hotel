const express = require('express')
const router = express.Router();
const pperson = require('./../models/person');

// Post method for send person data to Server:
router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newperson = new pperson(data);
        const response = await newperson.save();
        console.log('Person_data Saved On Server');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get method for get person data from Server:
router.get('/', async (req, res) => {
    try {
        const data = await pperson.find();
        console.log('Person_data fetched');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get method for worktypr person data from server:
router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'owner' || worktype == 'waiter' || worktype == 'chef') {
            const response = await pperson.find({ work: worktype })
            console.log('Person_data fetched by work')
            res.status(200).json(response)
        }
        else {
            res.status(404).json({ error: 'Invalid work type' })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const person_id = req.params.id;
        const updatepersondata = req.body;
        const response = await pperson.findByIdAndUpdate(person_id, updatepersondata, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ error: 'Person Not Found' })
        }
        console.log('Person_data Updated On Server')
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const person_id = req.params.id;
        const response = await pperson.findByIdAndDelete(person_id)

        if (!response) {
            return res.status(404).json({ error: 'Person Not Found' })
        }
        console.log('Person_data Deleted from Server')
        res.status(200).json({ message: 'Person_data Deleted Successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router