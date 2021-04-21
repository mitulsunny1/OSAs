const router = require('express').Router();
const Students= require('../models/student');
const Phones= require('../models/phone');

router.get('/', async (req, res)=>{
    let allStudents = await Students.find({});
    res.send(allStudents);
 });

 //Get one user with phone numbers
 router.get('/:id', async (req, res)=>{
    let student = await Students.findById(req.params.id,{});
    for(let i=0;i<student.phoneNumbers.length; i++){
    student.phoneNumbers[i]=await Phones.findById(student.phoneNumbers[i]._id,{});
    }
    res.send(student);
 });
 // adding new user
router.post('/', async(req,res) =>{
     let Student = await Students.create(req.body);
     res.send(Student)
 })
 //adding phone number for a user
 router.post('/:id/phoneNumbers', async(req,res) =>{
      let student=await Students.findById(req.params.id,{});
      if(student.phoneNumbers.length<3){
      const phone= await Phones.create(req.body);
      student.phoneNumbers.push(phone._id);
      await Students.findByIdAndUpdate(req.params.id, student);
      res.status(201);
      res.send(phone);
      }else{
      res.status(400);
      res.send({Message:"Maximum three phone numbers can be added!!!"});
      }   
 })

 router.patch('/:id', async(req, res)=>{
    let student = await Students.findByIdAndUpdate(req.params.id,req.body,{})
    res.send(student)
})

 router.delete('/:studentId/phoneNumbers/:phoneNumberId', async(req, res)=>{
    let phone = await Phones.findByIdAndDelete(req.params.phoneNumberId,{});
    let student=await Students.findById(req.params.studentId,{});
    let index=0;
    for(let i=0; i<student.phoneNumbers.length; i++){
       if(student.phoneNumbers[i]==req.params.phoneNumberId){
       student.phoneNumbers.splice(index, 1);
       }
       index++;
    }
    let s=await Students.findByIdAndUpdate(req.params.studentId, student,{});
    res.status(200);
    res.send({"Message":"The phone number has been deleted",phone});
})

module.exports = router;