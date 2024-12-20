//import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './Usuarios.css';
import Header from './Header'; // Importar Header
import startLogo from './assets/img/start_loog.png';
import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import agregarGrupoIcon from './assets/img/mas.png';
import slothIcon from './assets/img/sloth.png';
import videoIcon from './assets/img/video.png';
import musicIcon from './assets/img/music.png';
import imagenIcon from './assets/img/imagen.png';
import { useLocation } from 'react-router-dom';
import Nav from './Nav'
import './Grupo.css';  // Importar el archivo CSS personalizado
import Comentarios from './Comentarios'; // Importa el componente de comentarios

import Axios from "axios";
import React, { useEffect, useState } from "react";

function Grupo() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    
    const sesion = JSON.parse(localStorage.getItem('sesion'))

    const[allImg, setAllmg] = useState([]);
    const [otrosDatos, setOtrosDatos] = useState([]);
    const [miembross, setmiembro] = useState([]);

    //publicacio
    const[contenido, setcontenido] = useState('');

    const[foto, setfotoo] = useState();
    const[allfoto, setallfoto] = useState([]);

    const[video, setvideo] = useState();
    const[allvideo, setallvideo] = useState([]);

    const[audio, setaudio] = useState();
    const[allaudio, setallaudio] = useState([]);

    const[allpublicacion, setallpublicacion] = useState([]);
    
    const[comentario, setcomentario] = useState('');

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Primera petición para obtener la imagen del usuario
                const imagenResponse = await Axios.post(`http://localhost:3001/grupopag?nomb=${encodeURIComponent(id)}`);
                if (imagenResponse.data === "No grupo") {
                    alert("No hay imagen en el usuario");
                } else {
                    setAllmg(imagenResponse.data);
                }

                
    
                // Segunda petición para obtener otro conjunto de datos  
                const otraRespuesta = await Axios.post(`http://localhost:3001/usuarioadmin?sesion=${encodeURIComponent(sesion)}&id=${id}`);

                // Verificar si los datos están presentes en otraRespuesta

                if (otraRespuesta.data === "No grupo") {
                   // alert("No hay grupo en el usuario");
                } else {
                    setOtrosDatos(otraRespuesta.data);
                }


                const miembro = await Axios.post(`http://localhost:3001/esmiembro?sesion=${encodeURIComponent(sesion)}&id=${id}`);

                // Verificar si los datos están presentes en otraRespuesta

                if (miembro.data === "No grupo") {
                   // alert("No hay grupo en el usuario");
                } else {
                    setmiembro(miembro.data);
                }

                const publicacion = await Axios.post(`http://localhost:3001/verpublicaciones?nomb=${encodeURIComponent(id)}`);

                // Verificar si los datos están presentes en otraRespuesta

                if (publicacion.data === "No grupo") {
                   // alert("No hay grupo en el usuario");
                } else {
                    setallpublicacion(publicacion.data);
                }

                

                
                
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };
    
        // Llamar a la función fetchData para iniciar las peticiones al montar el componente
        fetchData();
    }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente
    

    
const unirse = (e) =>{
    e.preventDefault();

   


    Axios.post(`http://localhost:3001/unirgrupo?sesion=${encodeURIComponent(sesion)}&id=${id}`).then((data)=>{

    if(data.data.alert === "Success"){
    console.log(data.data);
    window.location.href = "/Grupo?id=${val.ID}`";
    }
    if(data.data.alert === "Error"){
    alert("error");
    }
    alert("informacion enviada");
    window.location.href = "/Grupo?id=${val.ID}`";
   
    })
}


const crear_publicacion = (e) => {
    e.preventDefault();
    alert("enviado");

    const frmData = new FormData();
    frmData.append("contenido", contenido);

    // Agregar archivo de foto si está presente
    if (foto) {
        frmData.append("foto", foto);
    }

    // Agregar archivo de video si está presente
    if (video) {
        frmData.append("video", video);
    }

    // Agregar archivo de audio si está presente
    if (audio) {
        frmData.append("audio", audio);
    }

    Axios.post(`http://localhost:3001/publicar?sesion=${encodeURIComponent(sesion)}&id=${id}`,
        frmData,
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    ).then((data) => {
        if (data.data.alert === "Success") {
            console.log(data.data);
            window.location.href = "/Grupo?id=${val.ID}`";
        }
        if (data.data.alert === "Error") {
            alert("error");
        }
        window.location.href = `/Grupo?id=${id}`;

    }).catch((error) => {
        console.log(error);
    });
}


const comentar = ( ID_publicacion) => {
    

    if(comentario){
        const frmData = new FormData();
    frmData.append("contenido", comentario);
    

   


    Axios.post(`http://localhost:3001/comentarpublicacion?sesion=${encodeURIComponent(sesion)}&id=${ID_publicacion}`,
    frmData).then((data)=>{

    if(data.data.alert === "Success"){
    console.log(data.data);
    }
    if(data.data.alert === "Error"){
    alert("error");
    }
    alert("informacion de comentario enviada ");
    window.location.href = `/Grupo?id=${id}`;
    })

    }
    
}

    return (
        <>
            <Header /> {/* Añadir el componente Header */}
            <div className="d-flex">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                <Nav></Nav>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">


                    <div className="container">
                        <div className="main-content">
                            <div className="post-section">
                                <div className="post-input">
                                <div className="user-profile">
                                        {allImg.map((val,key)=>{
                                            return(
                                                <div key={key} className="group-container">
                                                    <div className="group-info">
                                                        <h1>{val.NombreGrupo}</h1>
                                                        <h4>Categoría: {val.NombreCategoria}</h4>
                                                        

                                                        <div className="card-header">
                                                        
                                                            <div className="card-ico">
                                                                <img className="card-ico-img" src={'data:image/jpeg;base64,'+val.Fotousuario} alt="Icono de perfil" />
                                                            </div>
                                                            <div className="card-username">
                                                            @{val.NombreUsuarioCreador}
                                                            </div>
                                                        </div>

                                                       
                                                    </div>
                                                    <div className="group-image">
                                                        <img src={'data:image/jpeg;base64,'+val.Foto} alt="Foto de perfil" />
                                                    
                                                    </div>
                                                    <div className="group-description">
                                                        <span>Descripción:</span>
                                                        <h3>{val.Descripción}</h3>
                                                    </div>
                                                   
                                                    <div className="group-buttons">
                                                    {
                                                        otrosDatos.length > 0 ? (
                                                            otrosDatos.map((val, key2) => (
                                                                <div key={key2} >
                                                                    <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#solicitudesModal">Ver Solicitudes</button>

                                                                    <Link to={`/ModificarGrupo?id=${id}`}>
                                                                        <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#solicitudesModal">Editar</button>
                                                                    </Link>
                                                                    <Link to={`/Miembros?id=${id}`}>
                                                                    <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#solicitudesModal">Miembros</button>
                                                                    </Link>
                                                                   
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div >
                                                                <Link to={`/Miembros?id=${id}`}>
                                                                    <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#solicitudesModal">Miembros</button>
                                                                </Link>
        
                                                            </div>
                                                        )

                                                        
                                                    }

                                                    {
                                                    miembross.length > 0 ? (
                                                    miembross.map((val2,key3)=>{
                                                        //MiembroID, Grupo_ID, Usuario_ID, Fecha_agregado, MiembroEstado, NombreUsuario, Base64Usuario, UsuarioEstado
                                                            return(
                                                                <div key={key3}> 
                                                                {val2.NombreUsuario === sesion ? (
                                                                    null
                                                                ) : null}
                                                            </div>
                                                        )})
                                                    ) : (
                                                        <div >
                                                            <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#solicitudesModal" onClick={unirse}>Unirme</button>
                                                        </div>
                                                    )
                                                        }
                                                        
                                                    </div> 
                                                </div>
                                            )
                                        })}
                                    </div>



                                    {
                                                    miembross.length > 0 ? (
                                                    miembross.map((val2,key3)=>{
                                                        //MiembroID, Grupo_ID, Usuario_ID, Fecha_agregado, MiembroEstado, NombreUsuario, Base64Usuario, UsuarioEstado
                                                            return(
                                                                <div key={key3}> 
                                                                {val2.NombreUsuario === sesion ? (
                                                                    <React.Fragment>
                                                                    
                                                                    <textarea style={{ width: '100%' }} rows="2" placeholder="¿Qué estás pensando, @Usuario?"  onChange={(e)=>{setcontenido(e.target.value)}}></textarea>
                                                                    <button style={{ width: '100%' }} className="btn btn-accent" onClick={crear_publicacion}>Agregar Publicación</button>
                                                                    <div className="attachment-icons">
                                                                        <label htmlFor="file-upload">
                                                                            <img src={imagenIcon} alt="Adjuntar foto" />
                                                                            <input type="file"  accept="image/png" id="file-upload" onChange={(e)=>{setfotoo(e.target.files[0])}} />
                                                                            <span>Foto</span>

                                                                        </label>
                                                                        <label htmlFor="file-upload">
                                                                        

                                                                            <img src={videoIcon} alt="Adjuntar video" /> 
                                                                            <input type="file" accept="video/mp4" id="file-upload" onChange={(e)=>{setvideo(e.target.files[0])}} />
                                                                            <span>Video</span>

                                                                        </label>
                                                                        <label htmlFor="file-upload">
                                                                            <img src={musicIcon} alt="Adjuntar audio" /> 
                                                                            <input type="file" id="file-upload" accept="audio/mp3" onChange={(e)=>{setaudio(e.target.files[0])}} />
                                                                            <span>música</span>
                                                                        </label>
                                                                        
                                                                        
                                                                    </div>
                                                                    </React.Fragment>
                                                                
                                                                ) : null}
                                                            </div>
                                                        )})
                                                    ) : (
                                                        null
                                                    )
                                                        }
                                    
                                </div>
                            </div>



                            <div className="content">
                            {allpublicacion.map((val, key) => {
                            //Publicacion_ID, Nombre_Usuario, Base64_Usuario, Grupo_ID, Contenido, Fecha_de_creación, Estado, Foto, Video, Audio
                            return (

                                   
                                    <div className="card" key={key} style={{ width: '100%' }}>
                                        <div className="card-header">
                                            <div className="card-ico">
                                                <img className="card-ico-img" src={'data:image/jpeg;base64,' + val.Base64_Usuario} alt="Icono de perfil" />
                                            </div>
                                            <div className="card-username">
                                                @{val.Nombre_Usuario}
                                            </div>
                                        </div>
                                        <div>
                                        {val.Foto && (
                                            <div className="mock-img d-flex align-items-center justify-content-center">
                                            <img src={'data:image/jpeg;base64,' + val.Foto} className="card-img-top" alt={val.Foto} />
                                            </div>
                                        )}
                                        {val.Video && (
                                            <video controls className="mock-img">
                                                <source src={'data:video/mp4;base64,' + val.Video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {val.Audio && (
                                            <div className="mock-img d-flex align-items-center justify-content-center">
                                            <audio controls>
                                                <source src={'data:audio/mp3;base64,' + val.Audio} type="audio/mp3" />
                                                Your browser does not support the audio element.
                                            </audio>
                                            </div>
                                        )}
                                        </div>
                                        <div className="card-body" style={{ position: 'relative' }}>
                                            <h5 className="card-title">{val.Contenido}</h5>
                                            <div className="comments">
                                                <h6>Comentarios:</h6>
                                                <Comentarios id_publicacion={val.Publicacion_ID} /> {/* Renderiza el componente Comentarios y le pasa el valor de val.id_publicacion como prop */}
                                            </div>
                                            <div className="comment-box">
                                            <input type="text" className="form-control" id="nombreGrupo" name="nombreGrupo" onChange={(e)=>{setcomentario(e.target.value)}} placeholder="Escribe tu comentario aquí..." required />
                                            <button className="btn btn-accent" onClick={() => comentar(val.Publicacion_ID)}>Agregar comentario</button>

                                                
                                            </div>
                                            <svg className="float-favorite" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                                <path d="M0 0h24v24H0V0z" fill="none" />
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>

                                            
                                        </div>
                                    </div>
                                
                            )
                            })}
                                
                            </div>
                        </div>
                        <footer className="footer">
                            StartDobys 2023
                        </footer>
                    </div>
                    <div className="modal fade" id="solicitudesModal" tabIndex="-1" aria-labelledby="solicitudesModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="solicitudesModalLabel">Solicitudes Pendientes</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <ul id="listaSolicitudes" className="list-group">
                                    </ul>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        </>
    );
}

function agregarPublicacion() {
    // Lógica para agregar una publicación
}

export default Grupo;
