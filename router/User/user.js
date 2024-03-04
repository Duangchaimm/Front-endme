const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()

const base_url = "http://localhost:3000"

const MiddlewareUser = (req, res, next) => {
    if(req.session.User_id == undefined){
        res.render("User/login", {});
    }else{
        next();
    }
};
router.get('/create',async (req,res) =>{
    res.render('User/register')
})

router.get('/',MiddlewareUser, async (req,res)=>{
    const response = await axios.get(`${base_url}/RoomType`)
    res.render("User/", {data:response.data});
})

router.post('/login', async(req,res)=>{
    try {
        const data = {
          email: req.body.email,
          password: req.body.password,
        };
        const resp =   await axios.post(`${base_url}/users/login`, data); 
        if(resp.data.status){
            req.session.User_id = resp.data.data.User_id
            req.session.Name = resp.data.data.Name
            req.session.phone = resp.data.data.phone
            res.redirect("/User");
        }else{
            res.redirect("/User");
        }
    } catch (error) {
        res.status(500).send(error);
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
        res.redirect("/User");
    } catch (error) {
        res.status(500).send(error);
    }
  });





module.exports =   router