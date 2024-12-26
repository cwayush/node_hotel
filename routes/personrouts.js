const express = require('express')
const router = express.Router();
const pperson = require('./../models/person');
const { jwtAuthMiddleware, generationToken } = require('./../jwt')

// Post method for send person data to Server:
router.post('/signup', async (req, res) => {
    try {
        const data = req.body
        const newperson = new pperson(data);
        const response = await newperson.save();
        console.log('Person_data Saved On Server');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload))
        const token = generationToken(payload)
        console.log('Token is:', token) // run in terminal
        res.status(200).json({ response: response, token: token }); //run in postman
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { USERNAME, PASSWORD } = req.body;
        const user = await pperson.findOne({ username: USERNAME });
        if (!user || !(await user.comparePassword(PASSWORD))) {
            return res.status(401).json({ error: 'Invalid username or password!' })
        }
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generationToken(payload)
        res.json({ token })
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Internal Server Error!' });
    }
})
// Profile Route:
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("User Data:", userData);

        const userID = userData.id;
        const user = await pperson.findById(userID);
        res.status(200).json({ user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error!' })
    }
})
// Get method for get person data from Server:
router.get('/', jwtAuthMiddleware, async (req, res) => {
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
// Comment Added for Testing Purpose.
module.exports = router