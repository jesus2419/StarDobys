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
        database: "dobby"
    }
)



app.post("/create", 
    (req, resp)=>{
        //console.log("Datos recibidos en el servidor:", req.body);
        const usu = req.body.usuario;
        const correo = req.body.correo;
        const passw = req.body.contra;
        const nomCompl= req.body.nombre;
       // const rol = 'Usuario';

        console.log("Valor de nomCompl:", nomCompl);
         // Validar que nomCompl tiene un valor
    if (nomCompl === null || nomCompl === undefined || nomCompl === '') {
        resp.status(400).send("El nombre completo no puede ser nulo o vacío.");
        return;
    }

        db.query('INSERT INTO usuarios(nomU, emU, passwU, nomCompleto) VALUES (?,?,?,?)',
        [usu, correo, passw, nomCompl],
        (err, data) => {
            if (err) {
                console.error(err);
                resp.status(500).send("Error interno del servidor");
             } else {
                resp.send("Informacion insertada");
             }
        }
    );
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


//--------------------------------------------------

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
    console.log("Datos recibidos del cliente:");
    console.log("Usuario:", req.body.user);
    console.log("Archivo:", req.file);

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

//--------
app.post("/usuario", upload.single('file'),
(req, resp)=>{
    console.log("Datos recibidos del cliente:");
    

    const imagenB64 = req.file.buffer.toString('base64');
    const usName = req.body.user;
    const Nomb = req.body.Nomb;
    const email = req.body.email;
    const pass = req.body.pass;

    
    

    db. query("INSERT INTO usuarios(nomU, base64, emU, passwU, nomCompleto) VALUES (?,?,?,?,?)",
    [usName, imagenB64, email, pass, Nomb],
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


app.post("/creargrupo", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const nomb = req.query.nomb;
    console.log("Usuario:", nomb);

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    db.query("SELECT ID FROM usuarios WHERE nomU = ?", [nomb], (err, usuarioData) => {
        if (err || !usuarioData || usuarioData.length === 0) {
            console.error("Error al obtener el ID del usuario:", err);
            resp.status(500).json({ "alert": 'Error' });
            return;
        }

        const usuarioID = usuarioData[0].ID;

        // Convertir la imagen a base64
        const imagenB64 = req.file.buffer.toString('base64');
        const descripcion = req.body.descripcion;
        const categoria = req.body.Categoria;
        const nombre = req.body.Nomb;

        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query("CALL CrearGrupoYAgregarMiembro(?, ?, ?, ?, ?)", [nombre, categoria, usuarioID, descripcion, imagenB64], (err, data) => {

            if (err) {
                console.error("Error al crear el grupo:", err);
                resp.json('Error');
            } else {
                console.log("Grupo creado exitosamente");
                resp.json('Success');
            }
        });
    });
});






app.post("/vergrupo", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const nomb = req.query.nomb;
    console.log("Usuario:", nomb);

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    db.query("SELECT ID FROM usuarios WHERE nomU = ?", [nomb], (err, usuarioData) => {
        if (err || !usuarioData || usuarioData.length === 0) {
            console.error("Error al obtener el ID del usuario:", err);
            resp.status(500).json({ "alert": 'Error' });
            return;
        }

        const usuarioID = usuarioData[0].ID;


        console.log("Usuario:", usuarioID);


        // Convertir la imagen a base64
       
        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query("SELECT * FROM Grupo WHERE UsuarioCreador_ID = ?", [usuarioID], (err, data) => {
            if(err){
                resp.send(err);
            }else{
                if(data.length > 0){
                    resp.json(data);
                }else{
                    resp.json('No grupo');
                }
            }
        });
    });
});


app.post("/grupopag", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const id_grupo = req.query.nomb;
    console.log("grupo:", id_grupo);

    

       


       
       
    db.query(`
    SELECT 
        Grupo.ID,
        Grupo.Nombre AS NombreGrupo,
        Categoria.Nombre AS NombreCategoria,
        Usuarios.nomU AS NombreUsuarioCreador,
        Usuarios.base64 AS Fotousuario,
        Grupo.Descripción,
        Grupo.Fecha_de_creación,
        Grupo.Foto,
        Grupo.Estado
    FROM 
        Grupo
    JOIN
        Categoria ON Grupo.Categoria_ID = Categoria.ID
    JOIN
        Usuarios ON Grupo.UsuarioCreador_ID = Usuarios.ID
    WHERE
        Grupo.ID = ?;
`, [id_grupo], (err, data) => {
            if(err){
                resp.send(err);
            }else{
                if(data.length > 0){
                    resp.json(data);
                }else{
                    resp.json('No grupo');
                }
            }
        });
   
});


//---------

app.post("/imagenusuario",
(req, resp)=>{
    //const nomb = req.body.nomb;
    const nomb = req.query.nomb;
    console.log("Usuario:", nomb);


    db.query("SELECT * FROM usuarios WHERE nomU=? ",
    [nomb],
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




app.get("/getcategoria",
(req, resp)=>{
    db.query("SELECT * FROM Categoria",
    (error, data)=>{
        if(error){
            resp.send(error);
        }else{
            if(data.length > 0){
                resp.json(data);
            }else{
                resp.json('No categorias');
            }
        }
    })
})