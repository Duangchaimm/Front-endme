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
const session = require('express-session');
const AdminBooking = require('./router/Admin/Booking')
const UserBooking = require('./router/User/booking')


const User = require('./router/User/user')
const { log } = require('console');

const Room = require('./router/Admin/Room')

const base_url = ""

const sessionConfig = {
    secret: 'secret',
    resave: true, // บันhttps://node58157-env-5982902.proen.app.ruk-com.cloudทึก session ทุกครั้งที่มีการร้องขอ
    saveUninitialized: true, // บันทึก session ทุกครั้งที่มีการร้องขอ โดยไม่คำนึงว่า session จะมีข้อมูลหรือไม่
    maxAge: 3600,
  };

app.set("views" , path.join(__dirname , "/public/views"))
app.set("view engine" , "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.use(express.static(__dirname + "/public"))
//-------------------------------------Booking---------------------------------------

app.use(session(sessionConfig));

app.use('/Booking', Booking)

const MiddlewareAdmin = (req, res, next) => {
    if(req.session.admin_id == undefined){
        res.render("Admin/login", {});
    }else{
        next();
    }
};

app.get("/Admin", MiddlewareAdmin,  async (req, res) => {
  try {
      res.render("Admin/index", {});
  } catch(err) {
      res.status(500).send(err);
  }
});
app.get("/Admin/login",async (req, res) => {
    res.render("Admin/login", {});
})

app.post("/Admin/login", async (req,res)=>{
    try {
        const data = {
          admin_username: req.body.admin_username,
          admin_password: req.body.admin_password,
        };
        const resp =   await axios.post(`${base_url}/Admin/login`, data); 
        if(resp.data.status){
            req.session.admin_username = resp.data.data.admin_username
            req.session.admin_id = resp.data.data.admin_id
            req.session.admin_name = resp.data.data.admin_name
            res.redirect("/Admin");
        }else{
            res.redirect("/Admin");
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.use('/Admin/admin',Admin)
app.use('/Admin/user',adminUser)
app.use('/Admin/Room',Room)
app.use('/Admin/roomType',adminRommType)
app.use('/Admin/Booking',AdminBooking)


const MiddlewareUser = (req, res, next) => {
    if(req.session.User_id == undefined){
        res.redirect("/User");

    }else{
        next();
    }
};
app.use('/User',User)
app.use('/User/Booking',  MiddlewareUser, UserBooking)

app.listen(5500 , () => {
    console.log("Server start on port 5500")
})
