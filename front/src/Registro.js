import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React from 'react'
import {Link} from 'react-router-dom';
import {useState} from 'react';
import Axios from 'axios';
import logol from './start_loog.png'; 

function Registro(){
  const[user, setUser] = useState('');
  const[email, setEmail] = useState('');
  const[pass, setPass] = useState('');
  const [Nomb,  setNom] = useState ('');
  const[archivo, setArchivo] = useState();
  const defaultImage = 'url_de_tu_imagen_por_defecto';
  
  const alertDatos = () =>{
    alert(user + " " + email + " " + pass);
  }

  const sendDatos = () =>{
   // console.log("Usuario:", user);
    //console.log("Correo:", email);
   // console.log("Contraseña:", pass);
   // console.log("Nombre Completo:", Nomb);
  // console.log("Datos a enviar:", { usuario: user, correo: email, contra: pass, nombre: Nomb });
  console.log("Valor de Nomb antes de enviar la solicitud:", Nomb);

  const frmData = new FormData();
        frmData.append("file", archivo);
        frmData.append("user", user);
        frmData.append("email", email);
        frmData.append("pass", pass);
        frmData.append("Nomb", Nomb);

        Axios.post("http://localhost:3001/usuario",
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
        window.location.href = "/Inicio";
      })



        /*
    Axios.post("http://localhost:3001/create",
    {usuario: user,
     correo: email,
     contra: pass,
     nombre: Nomb
    }).then (
      ()=>{
        alert("informacion enviada");
        window.location.href = "/Inicio";
      })*/
    
    
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

  return(
    <div className="fondo-gris"> 

    <div className="registrationBox">
    <div className="d-flex justify-content-center">
        <div className="logo-container d-flex justify-content-center align-items-center">
          <img src={logol} alt="Logo" />
          
        </div>
      </div>

      <div className="mb-3 box1">
        <label className="form-label">Nombre de usuario</label>
        <input type="text" className="form-control" placeholder="Usuario" 
          onChange={(e)=>{setUser(e.target.value)}} />

 <label className="form-label">Nombre completo</label>
        <input type="text" className="form-control" placeholder="Nombre completo" 
          onChange={(e)=>{setNom(e.target.value)}} />

        <label className="form-label">Correo</label>
        <input type="email" className="form-control" placeholder="Correo"
          onChange={(e)=>{setEmail(e.target.value)}} />

        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" placeholder="Contraseña"
          onChange={(e)=>{setPass(e.target.value)}} />

        <label>Archivo</label>
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
    src="#" 
    alt="Vista previa de la imagen" 
    style={{ display: 'none', maxWidth: '100%', height: 'auto' }} 
/>

  {
}



        <button className="btn btn-primary" onClick={sendDatos}>Registrar</button>

        <Link to="/Inicio" className="btn btn-outline-info">Iniciar sesión</Link>
        
      </div>
    </div>
    </div>
  );
}



export default Registro;