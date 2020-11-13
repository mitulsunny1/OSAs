const router = require('express').Router();
const Customers= require('../models/customer');


router.get('/', async (req, res)=>{
    let allCustomers = await Customers.find({});
    res.send(allCustomers)
 });

 router.get('/:id', async(req, res)=>{
     let user = await Customers.findById(req.params.id,{});
     res.send(user);
 })
 router.post('/', async(req,res) =>{
     const body={
         firstName:"Md",
         lastName:"Obaidulla",
         phone:"3478909878",
         email:"mitul.li@yahoo.com",
     }
     let Customer = await Customers.create(req.body);
     res.send(Customer)
 })

 router.patch('/:id', async(req, res)=>{
    let user = await Customers.findByIdAndUpdate(req.params.id,req.body,{})
    res.send(user)
})

 router.delete('/:id', async(req, res)=>{
    let user = await Customers.findByIdAndDelete(req.params.id,{});
    res.send(user)
})

module.exports = router;