const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const { render } = require('ejs')
const router = express.Router()
require('dotenv').config();

//const base_url = "http://10.104.15.67:3000"
const base_url = process.env.API;


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
      
      // let response=await axios.get(`${base_url}/Room`)
      let type_data = await axios.get(`${base_url}/RoomType`)
      let room_data = await axios.get(`${base_url}/Room`)
      let user_data = await axios.get(`${base_url}/users`)
      res.render("Admin/Booking/create",{type_data:type_data.data,room_data:room_data.data,user_data:user_data.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

 

  router.post('/create', async (req, res) => {
    try {
        const data = {
            // Booking_id: req.body.Booking_id,
            User_id: req.body.User_id,
            Type_id: req.body.Type_id,
            Room_id: req.body.Room_id,
            booking_quautity: req.body.booking_quautity,
            date_checkin: req.body.date_checkin,
            date_checkout: req.body.date_checkout

        };
        
       const  response =  await axios.post(`${base_url}/Booking`, data); 
        if(response.data.status){
          res.redirect("/Admin/Booking");
        }else{
          res.render("Admin/Booking/bookfull", {data:response.data.data});
        }

    } catch (error) {
        res.status(500).send(error);
    }
  });


  router.get('/update/:id',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/Booking/${req.params.id}`)
      let type_data = await axios.get(`${base_url}/RoomType`)
      let room_data = await axios.get(`${base_url}/Room`)
        
        // console.log(response);
      res.render("Admin/Booking/update", {data:response.data,type_data:type_data.data,room_data:room_data.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })
  router.post('/update', async (req, res) => {
    try {
        const data = {
          User_id: req.body.User_id,
          Type_id: req.body.Type_id,
          Room_id: req.body.Room_id,
          booking_quautity: req.body.booking_quautity,
          date_checkin: req.body.date_checkin, 
          date_checkout: req.body.date_checkout,
          };
        const resp =  await axios.put(base_url + `/Booking/${req.body.Booking_id}`, data); 
        // console.log(resp);
        res.redirect("/Admin/Booking");

    } catch (error) {

        res.status(500).send(error);
    }
  });
  

  router.get('/delete/:id', async (req, res) => {
    try {
         const response =  await axios.delete(base_url + `/Booking/${req.params.id}`); 
        res.redirect("/Admin/Booking");

    } catch (error) {
        res.status(500).send(error);
    }
  });

module.exports =   router

