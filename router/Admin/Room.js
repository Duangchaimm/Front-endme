const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()

const base_url = "http://localhost:3000/Room"

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
        
      res.render("Admin/Room/create");
  
    } catch(err){
      res.status(500).send(err);
    }
  })

 

  router.post('/Room', async (req, res) => {
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
        // console.log(response);
      res.render("Admin/Room/update", {data:response.data});
  
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