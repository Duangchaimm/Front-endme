const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()

const base_url = "http://10.104.15.67:3000"

router.get('/',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/users`)
        res.render("Admin/user/list", {data:response.data});
    } catch(err){
      res.status(500).send(err);
    }
  })

  router.get('/create',async (req,res)=>{
    try{
        
      res.render("Admin/user/create");
  
    } catch(err){
      res.status(500).send(err);
    }
  })



  router.post('/create', async (req, res) => {
    try {
        const data = {
          Name: req.body.Name,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
        };
        await axios.post(base_url + `/users`, data); 
        res.redirect("/Admin/user");
    } catch (error) {
        res.status(500).send(error);
    }
  });


  router.get('/update/:id',async (req,res)=>{
    try{
        let response=await axios.get(`${base_url}/users/${req.params.id}`)
        // console.log(response);
      res.render("Admin/user/update", {data:response.data});
  
    } catch(err){
      res.status(500).send(err);
    }
  })

  
  router.post('/update', async (req, res) => {
    try {
        const data = {
            Name: req.body.Name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
          };
        await axios.put(base_url + `/users/${req.body.User_id}`, data); 
        res.redirect("/Admin/user");
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
         const response =  await axios.delete(base_url + `/users/${req.params.admin_id}`); 
        //  res.statu
        res.redirect("/Admin/user");
    } catch (error) {
        res.status(500).send(error);
    }
  });

module.exports =   router