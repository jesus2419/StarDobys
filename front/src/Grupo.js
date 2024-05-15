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
import imagenIcon from './assets/img/imagen.png';
import { useLocation } from 'react-router-dom';
import './Grupo.css';  // Importar el archivo CSS personalizado

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
    }
    if(data.data.alert === "Error"){
    alert("error");
    }
    alert("informacion enviada");
    window.location.href = "/Perfil";
    })
}

    return (
        <>
            <Header /> {/* Añadir el componente Header */}
            <div className="d-flex">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                    <div className="position-sticky">
                        <img src={startLogo} alt="Start Logo" className="img-fluid p-3" />
                        <div className="list-group mt-3">
                            <button type="button" className="list-group-item list-group-item-action">
                                <img src={rockIcon} alt="Rock" className="icon" />
                                Rock
                            </button>
                            <button type="button" className="list-group-item list-group-item-action">
                                <img src={kpopIcon} alt="Kpop" className="icon" />
                                Kpop
                            </button>
                            <button type="button" className="list-group-item list-group-item-action">
                                <img src={jazzIcon} alt="Jazz" className="icon" />
                                Jazz
                            </button>
                            <button type="button" className="list-group-item list-group-item-action">
                                <img src={electronicaIcon} alt="Electrónica" className="icon" />
                                Electrónica
                            </button>
                            <Link to="/Perfil" className="list-group-item list-group-item-action">
                                <img src={perfilIcon} alt="Perfil" className="icon" />
                                Perfil
                            </Link>
                            <Link to="/AgregarGrupo" className="list-group-item list-group-item-action">
                                <img src={agregarGrupoIcon} alt="Agregar Grupo" className="icon" />
                                Agregar Grupo
                            </Link>
                        </div>
                    </div>
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

                                    <textarea rows="2" placeholder="¿Qué estás pensando, @Usuario?"></textarea>
                                    <button className="btn btn-accent" onClick={agregarPublicacion}>Agregar Publicación</button>
                                    <div className="attachment-icons">
                                        <label htmlFor="file-upload">
                                            <img src={videoIcon} alt="Adjuntar video" />
                                            <span>Foto</span>
                                        </label>
                                        <input type="file" id="file-upload" style={{ display: 'none' }} />
                                        <img src={imagenIcon} alt="Adjuntar foto" /> 
                                        <span>Video</span>
                                    </div>
                                </div>
                            </div>

                            <div className="content">
                                <div className="card" style={{ width: '100%' }}>
                                    <div className="card-header">
                                        <div className="card-ico">
                                            <img className="card-ico-img" src={slothIcon} alt="Icono de perfil" />
                                        </div>
                                        <div className="card-username">
                                            @Username
                                        </div>
                                    </div>
                                    <div className="mock-img d-flex align-items-center justify-content-center">
                                        Imagen
                                    </div>
                                    <div className="card-body" style={{ position: 'relative' }}>
                                        <h5 className="card-title">Titulo de publicación</h5>
                                        <div className="comments">
                                            <h6>Comentarios:</h6>
                                            <ul>
                                                <li>
                                                    <span className="comment-username">@Nubecita:</span> Genial!
                                                </li>
                                                <li>
                                                    <span className="comment-username">@Silvano:</span> Me gusta!
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="comment-box">
                                            <textarea rows="1" cols="65" placeholder="Escribe tu comentario aquí..."></textarea>
                                        </div>
                                        <svg className="float-favorite" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </div>
                                </div>
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
