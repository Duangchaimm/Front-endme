const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()
require('dotenv').config();

// const base_url = "http://10.104.15.67:3000/Room"
const base_url = process.env.API+"/Room";


router.get('/',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}`)
      res.render("Room/Admin/list", {data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

  router.get('/create',async (req,res)=>{
    try{
      
      let response=await axios.get(`${base_url}Type`)
      res.render("Room/Admin/create",{type_data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

 

  router.post('/create', async (req, res) => {
    try {
        const data = {
          Room_id: req.body.Room_id,
            Type_id: req.body.Type_id,
            Type_Name: req.body.Type_Name,
            Room_quantity: req.body.Room_quantity,
            price: req.body.price,
        };
        await axios.post(base_url, data); 
        res.redirect("/Admin/Room");
    } catch (error) {
        res.status(500).send(error);
    }
  });


  router.get('/update/:id',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/${req.params.id}`)
        let type_data=await axios.get(`${base_url}Type`)
        // console.log(response);
      res.render("Room/Admin/update", {data:response.data,type_data:type_data.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })
  router.post('/update', async (req, res) => {
    try {
        const data = {
          Room_id: req.body.Room_id,
          Type_id: req.body.Type_id,
          Room_quantity: req.body.Room_quantity,
          price: req.body.price,
          };
        const resp =  await axios.put(base_url + `/${req.body.Room_id}`, data); 
        // console.log(resp);
        res.redirect("/Admin/Room");

    } catch (error) {

        res.status(500).send(error);
    }
  });
  

  router.get('/delete/:id', async (req, res) => {
    try {
         const response =  await axios.delete(base_url + `/${req.params.id}`); 
        res.redirect("/Admin/Room");

    } catch (error) {
        res.status(500).send(error);
    }
  });

module.exports =   router

/* Room_id: req.body.Room_id,
            Type_id: req.body.Type_id,
            Type_name: req.body.Type_name,
            price: req.body.price,*/