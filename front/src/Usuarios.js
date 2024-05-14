//import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom
import './Usuarios.css';  // Importar el archivo CSS personalizado
import startLogo from './assets/img/start_loog.png';  // Importar la imagen
import Header from './Header';
import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import crearGrupoIcon from './assets/img/mas.png';
import Axios from "axios";
import React, { useEffect, useState } from "react";



function Usuarios() {

    const sesion = JSON.parse(localStorage.getItem('sesion'))

    const[allImg, setAllmg] = useState([]);


    
useEffect(()=>{
    const frmData = new FormData();
    frmData.append("nomb", sesion);

    Axios.post(`http://localhost:3001/imagenusuario?nomb=${encodeURIComponent(sesion)}`)
    .then((data)=>{
        if(data.data === "No imagen"){
            alert("No hay imagen en el usuario");
        }else{
            setAllmg(data.data);
        }
    })
}, []);
    return (
        <>
            <Header />
            <div className="container-fluid mt-4">
                <div className="row">
                    {/* Barra lateral */}
                    <span className="navbar-text">{sesion}</span>
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                        <div className="position-sticky">
                            {/* Imagen en la parte superior de la barra lateral */}
                            <img src={startLogo} alt="Start Logo" className="img-fluid p-3" />

                            {/* Íconos en la barra lateral */}
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
                                <Link to="/Perfil"  className="list-group-item list-group-item-action">
                                    <img src={perfilIcon} alt="Perfil" className="icon" />
                                    Perfil
                                </Link>
                                <Link to="/CrearGrupo" className="list-group-item list-group-item-action">
                                    <img src={crearGrupoIcon} alt="Crear grupo" className="icon" />
                                    Crear grupo
                                </Link>
                            </div>
                        </div>
                    </nav>
                    {/* Contenido principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center align-items-center">
                        <div className="card mt-4">
                        {
                            allImg.map((val,key)=>{
                                return(
                                    <>
                                    <img src={'data:image/jpeg;base64,'+val.base64} 
                                    className="card-img-top" alt={sesion} />
                                  
                                    </>
                                )
                            })
                        }
                        {/*
                            <img src={'data:image/jpeg;base64,'+val.base64}  className="card-img-top" alt="..." />
                    */}<div className="card-body">
                            <span className="navbar-text">{sesion}</span>
                                <h5 className="card-title">Título de la publicación</h5>
                                <p className="card-text">Descripción de la publicación. Aquí puedes escribir más detalles sobre la publicación.</p>
                            </div>
                        </div>

                        
                    </main>
                </div>
            </div>
        </>
    );
}

export default Usuarios;
