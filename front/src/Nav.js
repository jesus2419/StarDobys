import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import popicon from './assets/img/pop-icon.png';
import tumbadoicon from './assets/img/tumbado.jpg';
import crearGrupoIcon from './assets/img/mas.png';
import agregarGrupoIcon from './assets/img/mas.png';
import startLogo from './assets/img/start_loog.png';  // Importar la image
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom
import { NavLink } from 'react-router-dom';  // Importar Link desde react-router-dom

import Axios from "axios";
import React, { useEffect, useState } from "react";


const Nav = () => {

    const[allImg, setAllmg] = useState([]);
    const sesion = JSON.parse(localStorage.getItem('sesion'))
    


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
    
                
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };
    
        // Llamar a la función fetchData para iniciar las peticiones al montar el componente
        fetchData();
    }, []); //
    
    return (
        

        <div className="position-sticky">
            {
                allImg.map((val,key)=>{
                    return(
                        <>
                        <Link to="/Perfil">
                        <button type="button" className="list-group-item list-group-item-action">
                        <img src={'data:image/jpeg;base64,'+val.base64} 
                        alt="Foto de Perfil" className="icon"  />
                           <a>{val.nomU}</a> 
                        </button>
                        </Link>
                        
                    
                        </>
                    )
                })
            }
            
            <div className="list-group mt-3">
                <NavLink to={`/VerGrupos?id=${1}&category=${"Rock"}`}>
                <button type="button" className="list-group-item list-group-item-action">
                    <img src={rockIcon} alt="Rock" className="icon" />
                    Rock
                </button>
                </NavLink>
                <NavLink to={`/VerGrupos?id=${2}&category=${"Kpop"}`}>
                <button type="button" className="list-group-item list-group-item-action">
                    <img src={kpopIcon} alt="Kpop" className="icon" />
                    Kpop
                </button>
                </NavLink>
                <NavLink to={`/VerGrupos?id=${3}&category=${"Jazz"}`}>
                <button type="button" className="list-group-item list-group-item-action">
                    <img src={jazzIcon} alt="Jazz" className="icon" />
                    Jazz
                </button>
                </NavLink>
                <NavLink to={`/VerGrupos?id=${4}&category=${"Electrónica"}`}>
                <button type="button" className="list-group-item list-group-item-action">
                    <img src={electronicaIcon} alt="Electrónica" className="icon" />
                    Electrónica
                </button>
                </NavLink>
                <NavLink to={`/VerGrupos?id=${5}&category=${"Corridos tumbados"}`}>
                <button type="button" className="list-group-item list-group-item-action">
                    <img src={tumbadoicon} alt="Corridos tumbados " className="icon" />
                    Corridos tumbados
                </button>
                </NavLink>
                <NavLink to={`/VerGrupos?id=${6}&category=${"Pop"}`}>
                <button type="button" className="list-group-item list-group-item-action">
                    <img src={popicon} alt="Pop" className="icon" />
                    Pop
                </button>
                </NavLink>
                
                <Link to="/Perfil" className="list-group-item list-group-item-action">
                    <img src={perfilIcon} alt="Perfil" className="icon" />
                    Perfil
                </Link>
                <Link to="/CrearGrupo" className="list-group-item list-group-item-action">
                    <img src={agregarGrupoIcon} alt="Agregar Grupo" className="icon" />
                    Agregar Grupo
                </Link>
            </div>
    </div>
        
            
            
    );
};

export default Nav;