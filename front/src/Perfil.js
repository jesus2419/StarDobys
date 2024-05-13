//import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom
import './Perfil.css';  // Importar el archivo CSS personalizado
import startLogo from './assets/img/start_loog.png';  // Importar la imagen
import Header from './Header';
import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import masIcon from './assets/img/mas.png';

import Axios from "axios";
import React, { useEffect, useState } from "react";


function Perfil() {

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
                                    <img src={masIcon} alt="Agregar Grupo" className="icon" />
                                    Agregar Grupo
                                </Link>
                            </div>
                        </div>
                    </nav>
                    {/* Contenido principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <h3  className="mt-3">Perfil</h3>
                        <div className="container mt-5">
                            <div className="row justify-content-center">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-body text-center">
                                        {
                                            allImg.map((val,key)=>{
                                                return(
                                                    <>
                                                    <img src={'data:image/jpeg;base64,'+val.base64} 
                                                    alt="Foto de Perfil" className="img-thumbnail" />
                                                
                                                    </>
                                                )
                                            })
                                        }
                                            {/*<img src="./assets/img/sloth.png" alt="Foto de Perfil" className="img-thumbnail" />*/}
                                            
                                            <h3 className="mt-3">@{sesion}</h3>
                                            <Link to="/ModificarPerfil" className="btn btn-primary btn-block">Configuración</Link>
                                            <Link to="/Inicio" className="btn btn-danger btn-block">Cerrar Sesión</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                               
                                    {/* Aquí va el contenido del perfil */}
                                </div>
                            </div>
                        </div>

                    </main>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <h3  className="mt-3">Grupos</h3>
                        <div className="container mt-5">
                            <div className="row justify-content-center">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-body text-center">
                                        {
                                            allImg.map((val,key)=>{
                                                return(
                                                    <>
                                                    <img src={'data:image/jpeg;base64,'+val.base64} 
                                                    alt="Foto de Perfil" className="img-thumbnail" />
                                                
                                                    </>
                                                )
                                            })
                                        }
                                            {/*<img src="./assets/img/sloth.png" alt="Foto de Perfil" className="img-thumbnail" />*/}
                                            
                                            <h3 className="mt-3">@{sesion}</h3>
                                            <Link to="/ModificarPerfil" className="btn btn-primary btn-block">Configuración</Link>
                                            <Link to="/Inicio" className="btn btn-danger btn-block">Cerrar Sesión</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                               
                                    {/* Aquí va el contenido del perfil */}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Perfil;
