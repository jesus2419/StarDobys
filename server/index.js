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

app.get("/getgrupos",
(req, resp)=>{
    db.query(`
    SELECT 
        Grupo.ID,
        Grupo.Nombre AS NombreGrupo,
        Categoria.Nombre AS NombreCategoria,
        Usuarios.nomU AS NombreUsuarioCreador,
        Grupo.Descripción,
        Grupo.Fecha_de_creación,
        Grupo.Foto,
        Grupo.Estado
    FROM 
        Grupo
    JOIN
        Categoria ON Grupo.Categoria_ID = Categoria.ID
    JOIN
        Usuarios ON Grupo.UsuarioCreador_ID = Usuarios.ID;
`,
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
            console.log(err);
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



app.post("/unirgrupo", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente2222:");
    const sesion = req.query.sesion;
    const id = req.query.id;
    console.log("Sesion:", sesion);
    console.log("ID:", id);

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    db.query("SELECT ID FROM usuarios WHERE nomU = ?", [sesion], (err, usuarioData) => {
        if (err || !usuarioData || usuarioData.length === 0) {
            console.error("Error al obtener el ID del usuario:", err);
            resp.status(500).json({ "alert": 'Error' });
            return;
        }

        const usuarioID = usuarioData[0].ID;

       

        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query("CALL InsertarMiembroGrupo(?, ?)", [id, usuarioID], (err, data) => {

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




app.post("/publicar", upload.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
]), (req, resp) => {
    console.log("Datos recibidos del cliente publicacion:");
    const sesion = req.query.sesion;
    const id = req.query.id;
    console.log("Sesion:", sesion);
    console.log("ID:", id);
    const contenido = req.body.contenido;

    const foto = req.files['foto'] ? req.files['foto'][0].buffer.toString('base64') : null;
    const video = req.files['video'] ? req.files['video'][0].buffer.toString('base64') : null;
    const audio = req.files['audio'] ? req.files['audio'][0].buffer.toString('base64') : null;

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    db.query("SELECT ID FROM usuarios WHERE nomU = ?", [sesion], (err, usuarioData) => {
        if (err || !usuarioData || usuarioData.length === 0) {
            console.error("Error al obtener el ID del usuario:", err);
            resp.status(500).json({ "alert": 'Error' });
            return;
        }

        const usuarioID = usuarioData[0].ID;

       

        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query("CALL InsertarPublicacion(?, ?, ?, ?, ?, ?)",
        [usuarioID, id, contenido, foto, video, audio], (err, data) => {

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



app.post("/banusergrupo", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente2222:");
    const sesion = req.query.sesion;
    const id = req.query.id;
    console.log("Sesion:", sesion);
    console.log("ID:", id);

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    db.query("SELECT ID FROM usuarios WHERE nomU = ?", [sesion], (err, usuarioData) => {
        if (err || !usuarioData || usuarioData.length === 0) {
            console.error("Error al obtener el ID del usuario:", err);
            resp.status(500).json({ "alert": 'Error' });
            return;
        }

        const usuarioID = usuarioData[0].ID;

       

        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query("CALL EliminarMiembroGrupo(?, ?)", [id, usuarioID], (err, result) => {

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




app.post("/comentarpublicacion", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente2222:");
    const sesion = req.query.sesion;
    const id = req.query.id;
    console.log("Sesion:", sesion);
    console.log("ID:", id);
    const contenido = req.body.contenido;

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    db.query("SELECT ID FROM usuarios WHERE nomU = ?", [sesion], (err, usuarioData) => {
        if (err || !usuarioData || usuarioData.length === 0) {
            console.error("Error al obtener el ID del usuario:", err);
            resp.status(500).json({ "alert": 'Error' });
            return;
        }

        const usuarioID = usuarioData[0].ID;

       

        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query("CALL InsertarComentario(?, ?, ?)", [id, usuarioID, contenido], (err, result) => {

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


app.post("/mostrarcomentario",
(req, resp)=>{
    const sesion = req.query.id_publicacion;
    db.query(`
    
SELECT
c.ID AS Comentario_ID,
c.ID_publicacion,
u.nomU AS Nombre_Usuario,
u.base64 AS Usuario_Base64,
c.Contenido,
c.Fecha_de_creación,
c.Estado
FROM
Comentario c
LEFT JOIN
Usuarios u ON c.Usuario_ID = u.ID
WHERE c.ID_publicacion = ? ;

`,[sesion] ,
    (error, data)=>{
        if(error){
            resp.send(error);
        }else{
            if(data.length > 0){
                resp.json(data);
            }else{
                resp.json('No comentario');
            }
        }
    })
})

app.post("/updategrupo", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const id = req.query.nomb;
    console.log("grupo:", id);

    // Obtener el ID del usuario basado en el nombre de usuario recibido

        // Convertir la imagen a base64
        const imagenB64 = req.file.buffer.toString('base64');
        const descripcion = req.body.descripcion;
        const categoria = req.body.Categoria;
        const nombre = req.body.Nomb;

        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query("CALL UpdateGrupo(?, ?, ?, ?, ?)", [id, nombre, categoria, descripcion, imagenB64], (err, data) => {


            if (err) {
                console.error("Error al crear el grupo:", err);
                resp.json('Error');
            } else {
                console.log("Grupo creado exitosamente");
                resp.json('Success');
            }
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



app.post("/misgrupos", upload.single('file'), (req, resp) => {
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
        db.query(`
        
SELECT
mg.ID AS Miembro_ID,
g.Nombre AS Nombre_Grupo,
g.Descripción AS decripcion,
g.Fecha_de_creación AS fecha,
g.Foto AS foto,
u.ID AS id_usuario,
g.UsuarioCreador_ID,
g.ID

FROM
Miembros_grupo mg
LEFT JOIN
Grupo g ON mg.Grupo_ID = g.ID
LEFT JOIN
Usuarios u ON mg.Usuario_ID = u.ID
where u.ID = ?;
    `, [usuarioID], (err, data) => {
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

app.post("/vermiembrosgrupo", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const grupoID = req.query.nomb;
    console.log("grupo:", grupoID);

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    


        // Convertir la imagen a base64
       
        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query(`
        SELECT 
            Miembros_grupo.ID AS MiembroID,
            Miembros_grupo.Grupo_ID,
            Miembros_grupo.Usuario_ID,
            Miembros_grupo.Fecha_agregado,
            Miembros_grupo.Estado AS MiembroEstado,
            Usuarios.nomU AS NombreUsuario,
            Usuarios.base64 AS Base64Usuario,
            Usuarios.Estado AS UsuarioEstado
        FROM 
            Miembros_grupo
        JOIN
            Usuarios ON Miembros_grupo.Usuario_ID = Usuarios.ID
        WHERE
            Miembros_grupo.Grupo_ID = ?;
    `, [grupoID], (err, data) => {
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

app.post("/verpublicaciones", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const grupoID = req.query.nomb;
    console.log("grupo:", grupoID);

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    


        // Convertir la imagen a base64
       
        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query(`
        SELECT
    p.ID AS Publicacion_ID,
    u.nomU AS Nombre_Usuario,
    u.base64 AS Base64_Usuario,
    p.Grupo_ID,
    p.Contenido,
    p.Fecha_de_creación,
    p.Estado,
    f.Archivo AS Foto,
    v.Archivo AS Video,
    a.Archivo AS Audio
FROM
    Publicacion p
LEFT JOIN
    Usuarios u ON p.Usuario_ID = u.ID
LEFT JOIN
    Foto_p f ON p.ID = f.ID_publicacion
LEFT JOIN
    Video_p v ON p.ID = v.ID_publicacion
LEFT JOIN
    Audio_p a ON p.ID = a.ID_publicacion

    
        WHERE p.Grupo_ID = ?;
    `, [grupoID], (err, data) => {
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


app.post("/esmiembro", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const sesion = req.query.sesion;
    const id = req.query.id;
    console.log("Sesion:", sesion);
    console.log("ID:", id);
    db.query("SELECT ID FROM usuarios WHERE nomU = ?", [sesion], (err, usuarioData) => {
        if (err || !usuarioData || usuarioData.length === 0) {
            console.error("Error al obtener el ID del usuario:", err);
            resp.status(500).json({ "alert": 'Error' });
            return;
        }

        const usuarioID = usuarioData[0].ID;


        console.log("Usuario:", usuarioID);

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    


        // Convertir la imagen a base64
       
        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query(`
        SELECT 
            Miembros_grupo.ID AS MiembroID,
            Miembros_grupo.Grupo_ID,
            Miembros_grupo.Usuario_ID,
            Miembros_grupo.Fecha_agregado,
            Miembros_grupo.Estado AS MiembroEstado,
            Usuarios.nomU AS NombreUsuario,
            Usuarios.base64 AS Base64Usuario,
            Usuarios.Estado AS UsuarioEstado
        FROM 
            Miembros_grupo
        JOIN
            Usuarios ON Miembros_grupo.Usuario_ID = Usuarios.ID
        WHERE
            Miembros_grupo.Grupo_ID = ? AND Miembros_grupo.Usuario_ID = ? ;
    `, [id,usuarioID], (err, data) => {
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


app.post("/usuarioadmin", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const sesion = req.query.sesion;
    const id = req.query.id;
    console.log("Sesion:", sesion);
    console.log("ID:", id);

    // Obtener el ID del usuario basado en el nombre de usuario recibido
    db.query("SELECT ID FROM usuarios WHERE nomU = ?", [sesion], (err, usuarioData) => {
        if (err || !usuarioData || usuarioData.length === 0) {
            console.error("Error al obtener el ID del usuario:", err);
            resp.status(500).json({ "alert": 'Error' });
            return;
        }

        const usuarioID = usuarioData[0].ID;


        console.log("Usuario:", usuarioID);


        // Convertir la imagen a base64
       
        // Ejecutar el procedimiento almacenado InsertarGrupo
        db.query("SELECT * FROM Grupo WHERE UsuarioCreador_ID = ? AND ID = ?", [usuarioID, id], (err, data) => {
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


app.post("/modgrupoinfo", upload.single('file'), (req, resp) => {
    console.log("Datos recibidos del cliente:");
    const id_grupo = req.query.sesion;
    console.log("grupo:", id_grupo);

    

       


       
       
    db.query(`
    SELECT 
        Grupo.ID,
        Grupo.Nombre AS NombreGrupo,
        Grupo.Categoria_ID,
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