import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Axios from "axios";




function CargarImagen(){
    
    const[user, setUser] = useState('');
    const[archivo, setArchivo] = useState();
    const[allImg, setAllmg] = useState([]);

    const[nombre, setnombre] = useState('');
    const[audio, setaudio] = useState();
    const[allaudio, setallaudio] = useState([]);
    

useEffect(()=>{
    const fetchData = async () => {
        try {
            // Primera petición para obtener la imagen del usuario
            const imagenResponse = await Axios.get("http://localhost:3001/getAllImg");
            if(imagenResponse.data === "No imagen"){
                alert("No hay imagenes");
            }else{
                setAllmg(imagenResponse.data);
            }
            

            // Segunda petición para obtener otro conjunto de datos  
            const otraRespuesta = await Axios.get(`http://localhost:3001/getAllaudio`);
            if(otraRespuesta.data === "No imagen"){
               // alert("No hay grupo en el usuario");
            } else {
                setallaudio(otraRespuesta.data);
            }



            
            
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }
    };

    // Llamar a la función fetchData para iniciar las peticiones al montar el componente
    fetchData();
    
}, []);

    const submit = (e) =>{
        e.preventDefault();
        alert("enviado");

        const frmData = new FormData();
        frmData.append("file", archivo);
        frmData.append("user", user);

        Axios.post("http://localhost:3001/file",
        frmData,
        {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        ).then((data)=>{
            if(data.data.alert === "Success"){
                console.log(data.data);
            }
            if(data.data.alert === "Error"){
                alert("error");
            }
            
        }).catch((error)=>{
            console.log(error);
        });
      }


      const enviaraudio = (e) =>{
        e.preventDefault();
        alert("enviado");

        const frmData = new FormData();
        frmData.append("file", audio);
        frmData.append("user", nombre);

        Axios.post("http://localhost:3001/audio",
        frmData,
        {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        ).then((data)=>{
            if(data.data.alert === "Success"){
                console.log(data.data);
            }
            if(data.data.alert === "Error"){
                alert("error");
            }
            
        }).catch((error)=>{
            console.log(error);
        });
      }
      
      

    return(
        <>
        <div>
            <label>Nombre de usuario</label>
            <input type="text" placeholder="Usuario"
             value={user}  onChange={(e)=>{setUser(e.target.value)}} />
        
            <label>Archivo</label>
            <input type="file" 
            onChange={(e)=>{setArchivo(e.target.files[0])}} />
        
            <button className="btn btn-primary" 
            onClick={submit}>Enviar</button>
        </div>

        {
            allImg.map((val,key)=>{
                return(
                    <>
                    <img src={'data:image/jpeg;base64,'+val.base64} 
                    className="casr-img-top" style={{width: '18rem'}}/>
                    <h5 className="car-title">{val.user}</h5>
                    </>
                )
            })
        }








        <div>
            <label>Nombre de audio</label>
            <input type="text" placeholder="Usuario"
             value={nombre}  onChange={(e)=>{setnombre(e.target.value)}} />
        
            <label>Archivo</label>
            <input type="file" accept="audio/*"
            onChange={(e)=>{setaudio(e.target.files[0])}} />
        
            <button className="btn btn-primary" 
            onClick={enviaraudio}>Enviar</button>
        </div>

        {
            allaudio.map((val,key)=>{
                return(
                    <>
                    <audio key={key} controls>
                        <source src={'data:audio/mp3;base64,' + val.base64} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                    <h5 className="car-title">{val.user}</h5>
                    </>
                )
            })
        }
        </>
    )
}

export default CargarImagen