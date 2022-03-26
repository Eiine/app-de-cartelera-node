const express = require('express')
const app = express()
const mysql= require("mysql")
const myconn=require("express-myconnection")
const connection= require("./db/db")
const route=require("./rutas/ruta")
const port = 3000
const path= require("path")
const ejs=require("ejs")
//seting---------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/view'));
//statics file--------------------------------
app.use(express.static(path.join(__dirname + "/public")))


//midelwares---------------

app.use(myconn(mysql, connection,"single"))
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//Rout----------------------------------
app.use("/", route)
app.use("/api", route)



//Server listener-----------------------------
app.listen(port, () => {
  console.log(`Server corriendo en el puerto:  ${port}`)
})