const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()
require('dotenv').config();

// const base_url = "http://10.104.15.67:3000/RoomType"
const base_url = process.env.API+"/RoomType";


router.get('/',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}`)
      res.render("Admin/roomType/list", {data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

  router.get('/create',async (req,res)=>{
    try{
        
      res.render("Admin/roomType/create");
  
    } catch(err){
      res.status(500).send(err);
    }
  })

 

  router.post('/create', async (req, res) => {
    try {
        const data = {
          Type_Name: req.body.Type_Name,
          Type_quantity: req.body.Type_quantity,
          
        };
        await axios.post(base_url, data); 
        res.redirect("/Admin/roomType");
    } catch (error) {
        res.status(500).send(error);
    }
  });


  router.get('/update/:id',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/${req.params.id}`)
        // console.log(response);
      res.render("Admin/roomType/update", {data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })
  router.post('/update', async (req, res) => {
    try {
        const data = {
          Type_Name: req.body.Type_Name,
          Type_quantity: req.body.Type_quantity,
          };
        const resp =  await axios.put(base_url + `/${req.body.Type_id}`, data); 
        // console.log(resp);
        res.redirect("/Admin/roomType");

    } catch (error) {

        res.status(500).send(error);
    }
  });
  

  router.get('/delete/:id', async (req, res) => {
    try {
         const response =  await axios.delete(base_url + `/${req.params.id}`); 
        res.redirect("/Admin/roomType");

    } catch (error) {
        res.status(500).send(error);
    }
  });

module.exports =   router