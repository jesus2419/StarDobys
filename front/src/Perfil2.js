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
import Nav from './Nav'

import Axios from "axios";
import React, { useEffect, useState } from "react";

import Profile from "./UserProfile";


function Perfil() {

    const sesion = JSON.parse(localStorage.getItem('sesion'))

    const[allImg, setAllmg] = useState([]);
    const [otrosDatos, setOtrosDatos] = useState([]);

    const [misgrupos, setmisgrupos] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Primera petición para obtener la imagen del usuario
                const imagenResponse = await Axios.post(`http://localhost:3001/imagenusuario?nomb=${encodeURIComponent(sesion)}`);
                if (imagenResponse.data === "No imagen") {
                    alert("No hay imagen en el usuario");
                } else {
                    setAllmg(imagenResponse.data);
                }
    
                // Segunda petición para obtener otro conjunto de datos  
                const otraRespuesta = await Axios.post(`http://localhost:3001/vergrupo?nomb=${encodeURIComponent(sesion)}`);
                // Verificar si los datos están presentes en otraRespuesta

                if (otraRespuesta.data === "No grupo") {
                    alert("No hay grupo en el usuario");
                } else {
                    setOtrosDatos(otraRespuesta.data);
                }


                const grupos = await Axios.post(`http://localhost:3001/misgrupos?nomb=${encodeURIComponent(sesion)}`);
                // Verificar si los datos están presentes en otraRespuesta

                if (grupos.data === "No grupo") {
                    alert("No hay grupo en el usuario");
                } else {
                    setmisgrupos(grupos.data);
                }
                
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };
    
        // Llamar a la función fetchData para iniciar las peticiones al montar el componente
        fetchData();
    }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente
    
    return (
        <>
            <Header />
            <div className="container-fluid mt-4">
                <div className="row">
                    {/* Barra lateral */}
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                    <Nav></Nav>
                    </nav>
                    {/* Contenido principal */}
                    
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                      
                      
                    
                    <h3  className="mt-3">Perfil</h3>
                        
                               
                                <Profile />

                          

                    </main>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center align-items-center">
                    
                     <h3  className="mt-3">Grupos creados</h3>
               </main>
                   
               <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center align-items-center">
                    {otrosDatos.map((val, key) => {
                        return (
                            <div className="card-container" key={key}>
                                <div className="card mt-4">
                                    <Link to={`/Grupo?id=${val.ID}`} className="card-link">
                                        <img src={'data:image/jpeg;base64,' + val.Foto} className="card-img-top" alt={val.Nombre} />
                                        <div className="card-body">
                                            <span className="navbar-text">{val.Fecha_de_creación}</span>
                                            <h5 className="card-title">{val.Nombre}</h5>
                                            <p className="card-text">{val.Descripción}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </main>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center align-items-center">
                   
                     <h3  className="mt-3">Grupos donde eres miembro</h3>
               </main>
                   
               <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center align-items-center">
                    {//Miembro_ID, Nombre_Grupo, decripcion, fecha, foto, id_usuario, UsuarioCreador_ID, ID
                    misgrupos.map((val, key) => {
                        return (
                            <div className="card-container" key={key}>
                                <div className="card mt-4">
                                    <Link to={`/Grupo?id=${val.ID}`} className="card-link">
                                        <img src={'data:image/jpeg;base64,' + val.foto} className="card-img-top" alt={val.Nombre} />
                                        <div className="card-body">
                                            <span className="navbar-text">{val.fecha}</span>
                                            <h5 className="card-title">{val.Nombre_Grupo}</h5>
                                            <p className="card-text">{val.decripcion}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </main>


                </div>
            </div>
        </>
    );
}

export default Perfil;
