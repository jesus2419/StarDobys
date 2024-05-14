//import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom
import './CrearGrupo.css';  // Importar el archivo CSS personalizado
import startLogo from './assets/img/start_loog.png';  // Importar la imagen
import Header from './Header';
import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import { useLocation } from 'react-router-dom';
import Axios from "axios";
import React, { useEffect, useState } from "react";


function ModificarGrupo() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const sesion = JSON.parse(localStorage.getItem('sesion'));


    // Definir estado para los valores del grupo
    const [valores, setValores] = useState([]);

    const[allImg, setAllmg] = useState([]);
    const [otrosDatos, setOtrosDatos] = useState([]);



    const [Nomb,  setNom] = useState ('');
    const[descripcion, setdescripcion] = useState('');
    const[Categoria, setCategoria] = useState('');
    const[archivo, setArchivo] = useState();


    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Primera petición para obtener la imagen del usuario
                const imagenResponse = await Axios.get(`http://localhost:3001/getcategoria`);
                if (imagenResponse.data === "No categorias") {
                    alert("No hay categorias");
                } else {
                    setAllmg(imagenResponse.data);
                }

                
    
                // Segunda petición para obtener otro conjunto de datos  
                const otraRespuesta = await Axios.post(`http://localhost:3001/modgrupoinfo?sesion=${encodeURIComponent(id)}`);

                // Verificar si los datos están presentes en otraRespuesta

                if (otraRespuesta.data === "No grupo") {
                   // alert("No hay grupo en el usuario");
                } else {
                    setOtrosDatos(otraRespuesta.data);
                }

                
                
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };
    
        // Llamar a la función fetchData para iniciar las peticiones al montar el componente
        fetchData();
    }, []); // El segundo parámetro [] asegura que el efecto se ejecute solo una vez al montar el componente
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValores({
            ...valores,
            [name]: value
        });
    };

const submit = (e) =>{
    e.preventDefault();

    console.log("Valor de Categoria:", Categoria); // Agrega este console.log
    const frmData = new FormData();
    frmData.append("file", archivo);
    frmData.append("descripcion", descripcion);
    frmData.append("Categoria", Categoria);
    frmData.append("Nomb", Nomb);


    Axios.post(`http://localhost:3001/updategrupo?nomb=${encodeURIComponent(id)}`,
    frmData,
    {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then((data)=>{

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




function mostrarImagen(event) {
    const input = event.target;
    const imgMostrada = document.getElementById('imagenMostrada');
   
     // Asegúrate de que se haya seleccionado un archivo
     if (input.files && input.files[0]) {
      const reader = new FileReader();
   
     reader.onload = function(e) {
       imgMostrada.src = e.target.result;
       imgMostrada.style.display = 'block';  // Muestra la imagen
     };
   
      reader.readAsDataURL(input.files[0]);  // Lee el archivo como una URL de datos
     }
     }
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
                            </div>
                        </div>
                    </nav>
                    {/* Contenido principal */}
                    
                    
                   



                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    { //ID, Categoria_ID, NombreGrupo, NombreCategoria, NombreUsuarioCreador, Fotousuario, Descripción, Fecha_de_creación, Foto, Estado
                    otrosDatos.map((val, key) => {

                       

                         return (
                        <div className="container d-flex justify-content-center"  key={key}>
                            <div className="card p-4" style={{ width: '600px' }}>
                                <h2 className="text-center">Información del Grupo {id}</h2>

                                <form enctype="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="nombreGrupo" className="form-label">Nombre Actual del Grupo</label>
                                        <input type="text" className="form-control" id="nombreGrupo" name="nombreGrupo" value={val.NombreGrupo} readonly required />

                                        <label htmlFor="nombreGrupo" className="form-label">Nombre Nuevo del Grupo</label>
                                        <input type="text" className="form-control" id="nombreGrupo" name="nombreGrupo" required onChange={(e)=>{setNom(e.target.value)}}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="categoriaGrupo" className="form-label">Categoría Actual del Grupo</label>
                                        
                        
                                        <select className="form-select" id="categoriaGrupo" name="categoriaGrupo" value={val.Categoria_ID}  required >
                                        {
                                            allImg.map((val,key)=>{
                                                return(
                                                    <>
                                                    <option value= {val.ID}>{val.Nombre}</option>

                                                   
                                                    
                                                    </>
                                                )
                                            })
                                        }
                                         </select>
                                        
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="categoriaGrupo" className="form-label">Categoría Nueva del Grupo</label>
                                        
                        
                                        <select className="form-select" id="categoriaGrupo" name="categoriaGrupo"   required onChange={(e)=>{setCategoria(e.target.value)}}>
                                        {
                                            allImg.map((val,key)=>{
                                                return(
                                                    <>
                                                    <option value= {val.ID}>{val.Nombre}</option>

                                                   
                                                    
                                                    </>
                                                )
                                            })
                                        }
                                         </select>
                                        
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="descripcionGrupo" className="form-label">Descripción Actual del Grupo</label>
                                        <textarea className="form-control" id="descripcionGrupo" name="descripcionGrupo" rows="3" value={val.Descripción} required></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="descripcionGrupo" className="form-label">Descripción Nueva del Grupo</label>
                                        <textarea className="form-control" id="descripcionGrupo" name="descripcionGrupo" rows="3" required onChange={(e)=>{setdescripcion(e.target.value)}}></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="imagenGrupo" className="form-label">Seleccionar Archivo de Imagen</label>
                                
                                     <input 
                                        type="file"  
                                        class="form-control" 
                                        id="imagen" 
                                        name="imagen" 
                                        accept="image/png"
                                        onChange={(e) => {
                                            setArchivo(e.target.files[0]); // Primera acción: Actualizar el estado con el archivo seleccionado
                                            mostrarImagen(e); // Segunda acción: Llamar a la función mostrarImagen con el evento e
                                        }} 
                                    />
                                                                        
                                    <img 
                                        id="imagenMostrada" 
                                        src={'data:image/jpeg;base64,'+val.Foto} // Asigna la URL de la imagen del grupo al atributo src
                                        alt="Vista previa de la imagen" 
                                        style={{ display: 'none', maxWidth: '100%', height: 'auto' }} 
                                    />


                                            <label htmlFor="imagenGrupo" className="form-label">Foto anterior</label>
                                                <img src={'data:image/jpeg;base64,'+val.Foto} 
                                                    alt="Foto de Perfil" className="img-thumbnail" />


                                    </div>

                                    <button type="submit" className="btn btn-primary"  onClick={submit}>Guardar Información </button>
                                </form>
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

export default ModificarGrupo;
