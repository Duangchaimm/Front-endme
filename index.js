const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const path = require('path');
const { env } = require('process');
const app = express();
const Booking = require('./router/Booking')
const Admin = require('./router/Admin')
const base_url = "http://localhost:3000"

app.set("views" , path.join(__dirname , "/public/views"))
app.set("view engine" , "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.use(express.static(__dirname + "/public"))
//-------------------------------------Booking---------------------------------------


app.use('/Booking', Booking)
app.use('/Admin',Admin)
//--------------------------Room--------------------------------------------





app.get("/Room", async (req, res) => {
    try {
      const response = await axios.get(base_url + "/Room" );
      console.log(response.data);
        res.render("Room/RoomAll", { Room: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
  });


  
  app.get("/Room/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/Room/" + req.params.id);
        res.render("Room/Room", { Room: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
  });
  
  app.get("/Bookings/create", async (req, res) => {
    try {
    res.render("Booking/create");
  } catch(err) {
    res.status(500).send(err)
  }   
  });
  
  app.post('/Bookings/create', async (req, res) => {
    try {
        const data = {
          Booking_id: req.body.Booking_id,
          User_id: req.body.User_id,
          Type_id: req.body.Type_id,
          Room: req.body.Room
        };
        await axios.post(base_url + "/Booking/", data); 
        res.redirect("/Booking/");
    } catch (error) {
        res.status(500).send(error);
    }
  });
  
  app.get("/Booking/update/:id", async (req, res) => {
    try {         
        const response = await axios.get(base_url + "/Booking/" + req.params.id);
        res.render("Booking/update", { Booking: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
  });
  
  app.post("/Booking/update/:id", async (req, res) => {
    try {
        const data = {
          Booking_id: req.body.Booking_id,
          User_id: req.body.User_id,
          Type_id: req.body.Type_id,
          Room: req.body.Room
        };
        await axios.put(base_url + '/Booking/' + req.params.id, data); 
        res.redirect('/Booking/');
    } catch (error) {
        res.status(500).send(error);
    }
  });
  
  app.get("/Booking/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/Booking/" + req.params.id);
        res.redirect("/Booking");
    } catch(err) {
        res.status(500).send(err);
    }
  });
  
  
app.listen(5500 , () => {
    console.log("Server start on port 5500")
})