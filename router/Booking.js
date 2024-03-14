const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const router = express.Router()
require('dotenv').config();

//const base_url = "http://10.104.15.67:3000"
 const base_url = process.env.API;


//-------------------------------------Booking---------------------------------------
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/Booking" );
    console.log(response.data);
      res.render("Booking/BookingAll", { Booking: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
      const response = await axios.get(base_url + "/Booking/" + req.params.id);
      res.render("Booking/Booking", { Booking: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

router.get("/create", async (req, res) => {
  try {
  res.render("Booking/create");
} catch(err) {
  res.status(500).send(err)
}   
});

router.post('/create', async (req, res) => {
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

router.get("/update/:id", async (req, res) => {
  try {         
      const response = await axios.get(base_url + "/Booking/" + req.params.id);
      res.render("Booking/update", { Booking: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

router.post("/update/:id", async (req, res) => {
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

router.get("/delete/:id", async (req, res) => {
  try {
      await axios.delete(base_url + "/Booking/" + req.params.id);
      res.redirect("/Booking");
  } catch(err) {
      res.status(500).send(err);
  }
});

module.exports = router;
