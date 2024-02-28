const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res)=>{
    try {
        // console.log(global.FoodItem);
        res.send([global.FoodItem, global.FoodCatogory]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
})

module.exports = router;