const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/set', async (req,res,next) => {
    try {
        const updateUser = await User.findOneAndUpdate(
            { email : req.body.email }, 
            { $push: { id_providers: req.body.id } }, 
            { new: true });

        return res.json(updateUser);
        
    } catch (err) {
        next(err);
    }
});

module.exports = router;