const express = require("express");
const mysql = require ('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "stardobys"
})

app.post('/Registro', (req, res) =>{
    console.log(req.body); // Verifica los datos recibidos en el backend
    const sql = "INSERT INTO test (`nombre`,  `email`, `pass`) VALUES (?, ?, ?)";
    const { name, email, password } = req.body; // Desestructura los datos directamente
    db.query(sql, [name, email, password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})



app.post('/login', (req, res) =>{
    //console.log(req.body); // Verifica los datos recibidos en el backend
    const sql = "SELECT * FROM test WHERE `email` = ? AND `pass` = ?";
   
    db.query(sql, [ req.body.email,req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){ // Corregir el nombre de la propiedad 'length'
            return res.json("Success");
        } else {
            return res.json("Faile");
        }
    });
});
/*
app.post('/login', (req, res) =>{
    //console.log(req.body); // Verifica los datos recibidos en el backend
    const sql = "SELECT * FROM login WHERE `email` = ? AND `pass` = ?";
    const { email, password } = req.body; // Desestructura los datos directamente
    db.query(sql, [email, password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){ // Corregir el nombre de la propiedad 'length'
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});
*/



app.listen(8082, () =>{
    console.log("listening")
})