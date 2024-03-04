const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const path = require('path');
const { env } = require('process');
const app = express();
const Booking = require('./router/Booking')
const Admin = require('./router/Admin/Admin')
const adminUser = require('./router/Admin/Users')
const adminRommType = require('./router/Admin/RoomType')
const Room = require('./router/Admin/Rooms')

const base_url = "http://localhost:3000"

app.set("views" , path.join(__dirname , "/public/views"))
app.set("view engine" , "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.use(express.static(__dirname + "/public"))
//-------------------------------------Booking---------------------------------------


app.use('/Booking', Booking)

app.get("/Admin", async (req, res) => {
  try {
   
      res.render("Admin/index", {});
  } catch(err) {
      res.status(500).send(err);
  }
});

app.use('/Admin/admin',Admin)
app.use('/Admin/user',adminUser)
app.use('/Admin/Room',Room)
app.use('/Admin/roomType',adminRommType)

  
app.listen(5500 , () => {
    console.log("Server start on port 5500")
})