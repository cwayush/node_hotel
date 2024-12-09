const express = require('express')
const router = express.Router();

// const Menu = require('./../models/MenuItem');
const Menu = require('./../models/MenuItem');

// Post method for send menuitem data to Server:
router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newmenu = new Menu(data);
        const response = await newmenu.save();
        console.log('Item Saved On Server');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get method for get menuitem from Server:
router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('Items fetched');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get menutems Through your taste choice:
router.get('/:taste', async (req, res) => {
    try {
        const utaste = req.params.taste;
        if (utaste == 'Sweet' || utaste == 'Spicy' || utaste == 'Sour') {
            const response = await Menu.find({ taste: utaste })
            console.log('Item fetched by taste')
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid utaste' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuitem_id = req.params.id;
        const menuitemupdatedata = req.body
        const response = await Menu.findByIdAndUpdate(menuitem_id, menuitemupdatedata, {
            new: true,
            runValidators: true
        })
        if (!response) {
            res.status(404).json({ error: 'Item NOt Found:' })
        }

        console.log('Item Updated')
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500), json({ error: 'Internal Server Error!' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuitem_id = req.params.id;
        const response = await Menu.findByIdAndDelete(menuitem_id)

        if (!response) {
            return res.status(404).json({ error: 'Item NOt Found!' })
        }
        console.log('Item Deleted!')
        res.status(200).json({ message: 'Item are remove from MenuCard:' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error!' })
    }
})
module.exports = router