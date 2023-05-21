const express = require('express');
const bodyparser = require('body-parser')
const mysql = require('mysql2')
const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

const conexion = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'Diego1234',
    database:'blog'
});
app.listen(3000, function () {
    console.log('La aplicación está escuchando en el puerto 3000!');
  });