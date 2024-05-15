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
import './Grupo.css';  // Importar el archivo CSS personalizado

import Axios from "axios";
import React, { useEffect, useState } from "react";


const Comentarios = ({ id_publicacion }) => {
    const [comentarioss, setComentarios] = useState([]);

    useEffect(() => {
        // Realizar la petición al servidor para obtener los comentarios
        Axios.post(`http://localhost:3001/mostrarcomentario?id_publicacion=${id_publicacion}`)
            .then(response => {
                if(response === "No comentario"){
                    alert("No hay comentarios");
                }else{
                    setComentarios(response.data);
                }
                
                
            })
            .catch(error => {
                console.error('Error al obtener los comentarios:', error);
            });
    }, [id_publicacion]); // Se ejecutará cuando cambie el valor de id_publicacion
    //Comentario_ID, ID_publicacion, Nombre_Usuario, Usuario_Base64, Contenido, Fecha_de_creación, Estado

    return (
        
            
            <ul>
                
                {Array.isArray(comentarioss) && comentarioss.length > 0 && comentarioss.map((val, key) => (
                    <li key={key}>
                        <div className="card-header">
                            <div className="card-ico">
                                <img className="card-ico-img" src={'data:image/jpeg;base64,' + val.Usuario_Base64} alt="Icono de perfil" />
                            </div>
                            <div className="card-username">
                                <span className="comment-username">@{val.Nombre_Usuario}:</span> {val.Contenido}
                            </div>
                        </div>
                    </li>
                ))}


            </ul>
       
    );
};

export default Comentarios;