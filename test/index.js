const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');

app.use(cors());
app.use(express.json());

app.listen(3001, 
    ()=>{
    console.log("Escuchando en el puerto 3001");
    }
)

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "pwg57"
    }
)

app.post("/create", 
    (req, resp)=>{
        const usu = req.body.usuario;
        const correo = req.body.correo;
        const passw = req.body.contra;

        db.query('INSERT INTO usuarios(nomU, emU, passwU) VALUES (?,?,?)',
        [usu, correo, passw],
        (err, data)=>{
            if(err){
                console.log(err);
            }else{
                resp.send("Información insertada");
            }
        }
        )
    }
)


app.get("/getU",
    (req, resp)=>{
        db.query('SELECT * FROM usuarios',
        (error, data)=>{
            if(error){
                console.log(error);
            }else{
                resp.send(data);
            }
        })
    }
)

app.delete("/delete/:nomUser",
(req, resp)=>{
    const nombreU = req.params.nomUser;

    db.query('DELETE FROM usuarios WHERE nomU=?',
    nombreU,
    (error, data)=>{
        if(error){
            console.log(error);
        }else{
            resp.send("Empleado eliminado");
        }
    })
}
)

app.post("/login", 
    (req, resp)=>{


        db.query("SELECT * FROM usuarios WHERE nomU=? AND passwU=?",
        [req.body.us, req.body.con],
        (err, data)=>{
            if(err){
                resp.send(err);
            }else{
                if(data.length > 0){
                    resp.json({
                        "alert": 'Success',
                        "usuario": data[0].nomU
                    })
                }else{
                    resp.json('Usuario no existe')
                }
            }
        })
})

const fileFil = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/png') {
      cb(null, true);
        } else {
            cb(null, false);

            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
  };

const strg = multer.memoryStorage();
const upload = multer({
                    storage:strg,
                    fileFilter: fileFil
                })

app.post("/file", upload.single('file'),
(req, resp)=>{
    const imagenB64 = req.file.buffer.toString('base64');
    const usName = req.body.user;

    db. query("INSERT INTO IMAGEN(user, base64) VALUES(?,?)",
    [usName, imagenB64],
    (err, data)=>{
        if(err){
            resp.json({
                "alert": 'Error'
            })
        }else{
            resp.json({
                "alert": 'Success' 
            })
        }
    })
    console.log(imagenB64, usName );
})

app.get("/getAllImg",
(req, resp)=>{
    db.query("SELECT * FROM imagen",
    (error, data)=>{
        if(error){
            resp.send(error);
        }else{
            if(data.length > 0){
                resp.json(data);
            }else{
                resp.json('No imagen');
            }
        }
    })
})