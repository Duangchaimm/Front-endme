const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()

const base_url = "http://localhost:3000"

router.get('/',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/Booking`)
      res.render("Admin/Booking/list", {data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

  router.get('/create',async (req,res)=>{
    try{
      
      let response=await axios.get(`${base_url}/Room`)
      res.render("Admin/Booking/create",{type_data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

 

  router.post('/create', async (req, res) => {
    try {
        const data = {
            Booking_id: req.body.Booking_id,
            User_id: req.body.User_id,
            Type_id: req.body.Type_id,
            Room_id: req.body.Room_id,
            booking_quautity: req.body.booking_quautity,
            date_checking: req.body.date_checking,

        };
        await axios.post(`${base_url}/Booking`, data); 
        res.redirect("/Admin/Booking");
    } catch (error) {
        res.status(500).send(error);
    }
  });


  router.get('/update/:id',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/Booking${req.params.id}`)
        // console.log(response);
      res.render("Admin/Booking/update", {data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })
  router.post('/update', async (req, res) => {
    try {
        const data = {
          Room_id: req.body.Room_id,
          Type_id: req.body.Type_id,
          Type_Name: req.body.Type_Name,
          price: req.body.price,
          };
        const resp =  await axios.put(base_url + `/Booking${req.body.Room_id}`, data); 
        // console.log(resp);
        res.redirect("/Admin/Room");

    } catch (error) {

        res.status(500).send(error);
    }
  });
  

  router.get('/delete/:id', async (req, res) => {
    try {
         const response =  await axios.delete(base_url + `/Booking${req.params.id}`); 
        res.redirect("/Admin/Booking");

    } catch (error) {
        res.status(500).send(error);
    }
  });

module.exports =   router

