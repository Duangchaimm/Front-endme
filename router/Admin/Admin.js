const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()

const base_url = "http://localhost:3000"

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
        res.redirect("/Admin");
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
        await axios.put(base_url + `/Admin/${req.body.admin_id}`, data); 
        res.redirect("/Admin");
    } catch (error) {
        res.status(500).send(error);
    }
  });

  

  router.get('/User',async (req,res)=>{
    try{
      res.render("Admin/User/list", { });
  
    } catch(err){
      res.status(500).send(err);
    }
  })
  

  router.get('/delete/:admin_id', async (req, res) => {
    try {
         const response =  await axios.delete(base_url + `/Admin/${req.params.admin_id}`); 
        //  res.statu
        res.redirect("/Admin");
    } catch (error) {
        res.status(500).send(error);
    }
  });

module.exports =   router