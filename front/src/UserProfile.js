//import React from 'react';
import './UserProfile.css';

import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom

const UserProfile = () => {
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
            /*
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
                */
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };
    
        // Llamar a la función fetchData para iniciar las peticiones al montar el componente
        fetchData();
    }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente
    
    return (
        <div className="profile-frame">
            <div className="profile-center">
                <div className="profile-section">
                    
                    {
                        allImg.map((val,key)=>{
                            //ID, rol, nomU, nomCompleto, emU, passwU, Fecha_de_creación, base64, Estado
                            return(
                                <>

                                <div className="profile-image">
                                    <div className="profile-circle-1"></div>
                                    <div className="profile-circle-2"></div>
                                    <img src={'data:image/jpeg;base64,'+val.base64}  width="70" height="70"alt="Foto de Perfil" />
                                </div>
                                
                                <div className="profile-name">@{val.nomU}</div>
                                <div className="profile-job">Nombre Completo: {val.nomCompleto}</div>
                                <div className="profile-job">Email: {val.emU}</div>
                                
                            
                                </>
                            )
                        })
                    }
                    
                    {/*<div className="profile-actions">
                        <button className="profile-btn">Follow</button>
                        <button className="profile-btn">Message</button>
                    </div>*/}
                    <div className="profile-actions">
                        <Link to="/ModificarPerfil">
                        <button className="profile-btn">Modificar</button>
                        </Link>
                        <Link to="/">
                        <button className="profile-btn">Cerrar sesión</button>
                        </Link>
                    </div>
                    
                </div>
                {/*<div className="profile-stats">
                    <div className="profile-box">
                        <span className="profile-value">523</span>
                        <span className="profile-parameter">Posts</span>
                    </div>
                    <div className="profile-box">
                        <span className="profile-value">1387</span>
                        <span className="profile-parameter">Likes</span>
                    </div>
                    <div className="profile-box">
                        <span className="profile-value">146</span>
                        <span className="profile-parameter">Followers</span>
                    </div>
                </div>*/}
            </div>
        </div>
    );
};

export default UserProfile;
