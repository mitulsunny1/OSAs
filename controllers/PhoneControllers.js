const router = require('express').Router();
const Phones= require('../models/phone');

router.get('/', async (req, res)=>{
    let allPhones = await Phones.find({});
    res.send(allPhones);
 });

 router.get('/:id', async(req, res)=>{
    let phone = await Phones.findById(req.params.id,{});
   res.send(phone);
})
module.exports = router;