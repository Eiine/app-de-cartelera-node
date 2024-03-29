const express = require("express");
const app = express();
const mysql = require("mysql2");
const myconn = require("express-myconnection");
const connection = require("./db/db");
const route = require("./rutas/ruta");
const port = process.env.PORT || 3000;
const path = require("path");
const ejs = require("ejs");
const session = require("express-session");
const cookieparser = require("cookie-parser");

//seting---------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/view"));
//statics file--------------------------------
app.use(express.static(path.join(__dirname + "/public")));

//midelwares---------------
app.use(
  session({
    secret: "123456",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(myconn(mysql, connection));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
//Rout----------------------------------
app.use("/", route);

//Server listener-----------------------------
app.listen(port, () => {
  console.log(`Server corriendo en el puerto:  ${port}`);
  console.log(port);
});
