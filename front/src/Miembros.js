import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';  // Asegúrate de tener este archivo en la ruta correcta.
import Header from './Header';  // Importar Header

import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import agregarGrupoIcon from './assets/img/mas.png';
import kpopGroupIcon from './assets/img/kpop-icon.png';
import Nav from './Nav'

import { useLocation } from 'react-router-dom';
import './Grupo.css';  // Importar el archivo CSS personalizado

import Axios from "axios";
import { useEffect } from "react";


function Miembros() {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    
    const sesion = JSON.parse(localStorage.getItem('sesion'))

    const[allImg, setAllmg] = useState([]);
    const [otrosDatos, setOtrosDatos] = useState([]);
    const [adminn, setadmin] = useState([]);




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
                const otraRespuesta = await Axios.post(`http://localhost:3001/vermiembrosgrupo?nomb=${encodeURIComponent(id)}`);

                // Verificar si los datos están presentes en otraRespuesta

                if (otraRespuesta.data === "No grupo") {
                   // alert("No hay grupo en el usuario");
                } else {
                    setOtrosDatos(otraRespuesta.data);
                }


                // Segunda petición para obtener otro conjunto de datos  
                const admin = await Axios.post(`http://localhost:3001/usuarioadmin?sesion=${encodeURIComponent(sesion)}&id=${id}`);

                // Verificar si los datos están presentes en otraRespuesta

                if (admin.data === "No grupo") {
                   // alert("No hay grupo en el usuario");
                } else {
                    setadmin(admin.data);
                }



                
                
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };
    
        // Llamar a la función fetchData para iniciar las peticiones al montar el componente
        fetchData();
    }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente
    

    
    const expulsar = (nombre) => {
    

   


    Axios.post(`http://localhost:3001/banusergrupo?sesion=${encodeURIComponent(nombre)}&id=${id}`).then((data)=>{

    if(data.data.alert === "Success"){
    console.log(data.data);
    }
    if(data.data.alert === "Error"){
    alert("error");
    }
    alert("informacion enviada");
    //window.location.href = "/Perfil";
    })
}

    const [subseccionesContenido, setSubseccionesContenido] = useState('');

    const mostrarSubsecciones = (categoria) => {
        let contenido = '';

        switch (categoria) {
            case 'rock':
                contenido = `
                    <h3>Rock</h3>
                    <ul>
                        <li>Rock Indie</li>
                        <li>Rock Alternativo</li>
                    </ul>
                `;
                break;
            case 'kpop':
                contenido = `
                    <h3>Kpop</h3>
                    <ul>
                        <li>Kpop Clásico</li>
                        <li>Kpop Moderno</li>
                    </ul>
                `;
                break;
            case 'jazz':
                contenido = `
                    <h3>Jazz</h3>
                    <ul>
                        <li>Jazz Clásico</li>
                        <li>Jazz Moderno</li>
                    </ul>
                `;
                break;
            case 'electronica':
                contenido = `
                    <h3>Electrónica</h3>
                    <ul>
                        <li>Electrónica Dance</li>
                        <li>Electrónica Chill</li>
                    </ul>
                `;
                break;
            default:
                break;
        }

        setSubseccionesContenido(contenido);
    };

    const cerrarModal = () => {
        setSubseccionesContenido('');
    };

    const generateMembersList = () => {


        return otrosDatos.map((val, key) => {
            


                //MiembroID, Grupo_ID, Usuario_ID, Fecha_agregado, MiembroEstado, NombreUsuario, Base64Usuario, UsuarioEstado
                return (

                <li key={key}>
                <img src={'data:image/jpeg;base64,' + val.Base64Usuario} className="card-img-top" alt={val.NombreUsuario} />
                {val.NombreUsuario}
                <div className="member-buttons">
                    <button className="expulsar-button">Expulsar</button>
                    <button className="banear-button">Banear</button>
                </div>
                </li>

                )
                    
            
        })
        
    };


    /*
        const members = [
            'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hank', 'Ivy',
            'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel',
            'Sam', 'Tom'
        ];

        return members.map(member => (
            <li key={member}>
                {member}
                <div className="member-buttons">
                    <button className="expulsar-button">Expulsar</button>
                    <button className="banear-button">Banear</button>
                </div>
            </li>
        ));

        */

    return (
        <>
            <Header /> {/* Añadir el componente Header */}

            <div className="d-flex">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                <Nav></Nav>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="main-content" style={{ overflowY: 'auto', paddingRight: '15px' }}>
                    

                        <div className="group">
                            {allImg.map((val,key)=>{
                                return(
                            <div key={key} >
                               
                                                        <h1>{val.NombreGrupo}</h1>
                                                        <h4>Categoría: {val.NombreCategoria}</h4>
                                                        
                                                        


                                                       
                                                   
                                                   
                                                        <img src={'data:image/jpeg;base64,'+val.Foto} alt="Foto de perfil" />
                                                    
                                                   
                            </div>
                                                        
                             )})}

                             {/*
                                                        <img src={kpopGroupIcon} alt="Kpop Icon" />
                                <h3>Kpop Enthusiasts</h3>*/ }
                            
                            <div className="group-members">
                                <h4>Lista de Miembros:</h4>
                                <ul>
                                    {/*generateMembersList()*/}
                                    {otrosDatos.map((val, key) => {
            


                                        //MiembroID, Grupo_ID, Usuario_ID, Fecha_agregado, MiembroEstado, NombreUsuario, Base64Usuario, UsuarioEstado
                                        return (

                                        <li key={key}>
                                        
                                        
                                        <div className="member-buttons">
                                        <img src={'data:image/jpeg;base64,' + val.Base64Usuario} className="card-img-top" alt={val.NombreUsuario} />
                                        {val.NombreUsuario}
                                            


                                        {
                                                        adminn.length > 0 ? (
                                                            adminn.map((val1, key2) => (
                                                                <div key={key2} >
                                                                    {val.NombreUsuario === sesion ? (
                                                                    null
                                                                ) : <button className="expulsar-button" onClick={() => expulsar(val.NombreUsuario)}>Expulsar</button>}
                                                                    
                                                                    <button className="banear-button">ver perfil</button>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div >
                                                                <button className="banear-button">ver perfil</button>

                                                            </div>
                                                        )

                                                        
                                                    }
                                            
                                        </div>
                                        </li>

                                        

                                        )
                                            
                                    
                                })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        </>
    );
}

export default Miembros;
