const router = require('express').Router();
const Customers= require('../models/customer');
let myUser={
    userId:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:""
}
let myUsers=[];
router.get('/', async (req, res)=>{
    let allCustomers = await Customers.find({});
    let myAllCutomers=allCustomers.map(user =>{
      return { userId:user._id,   
        firstName:user.firstName,
        lastName:user.lastName,
        phone:user.phone,
        email:user.email,
       }
    });
    res.send(myAllCutomers)
 });

 router.get('/:id', async(req, res)=>{
   
  
     let user = await Customers.findById(req.params.id,{});
    myUser.userId=user._id;    
    myUser.firstName=user.firstName;
    myUser.lastName=user.lastName;
    myUser.phone=user.phone;
    myUser.email=user.email;
    res.send(myUser);
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