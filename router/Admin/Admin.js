const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()
require('dotenv').config();

const base_url = "http://10.104.15.67:3000"
// const base_url = process.env.API;


router.get('/',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/Admin`)
      res.render("Admin/admin/list", {data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

  router.get('/create',async (req,res)=>{
    try{
        
      res.render("Admin/admin/create");
  
    } catch(err){
      res.status(500).send(err);
    }
  })

  router.get('/update/:id',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/Admin/${req.params.id}`)
      res.render("Admin/admin/update", {data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

  router.post('/create', async (req, res) => {
    try {
        const data = {
          admin_name: req.body.admin_name,
          admin_username: req.body.admin_username,
          admin_password: req.body.admin_password,
          admin_email: req.body.admin_email,
          admin_phone: req.body.admin_phone,
        };
        await axios.post(base_url + `/Admin`, data); 
        res.redirect("/Admin/admin");
    } catch (error) {
        res.status(500).send(error);
    }
  });


  
  router.post('/update', async (req, res) => {
    try {
        const data = {
          admin_name: req.body.admin_name,
          admin_username: req.body.admin_username,
          admin_password: req.body.admin_password,
          admin_email: req.body.admin_email,
          admin_phone: req.body.admin_phone,
        };
        const resp =  await axios.put(base_url + `/Admin/${req.body.admin_id}`, data); 
        console.log(resp);
        res.redirect("/Admin/admin");

    } catch (error) {

        res.status(500).send(error);
    }
  });
  

  router.get('/delete/:admin_id', async (req, res) => {
    try {
         const response =  await axios.delete(base_url + `/Admin/${req.params.admin_id}`); 
        //  res.statu
        res.redirect("/Admin/admin");

    } catch (error) {
        res.status(500).send(error);
    }
  });

module.exports =   router