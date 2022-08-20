import React, { useState, useContext } from "react";
import { userContext } from "../../../../context/userContext";

function Mensaje (props) { 
  //console.log("Estamos en mensajes");
  const { user } = useContext(userContext);
  //console.log(props.data);
  const {texto, usuario} = props.data;
  //const [ mio, setMio ] = useState("");
  let mio;
  console.log(user);
  if (usuario === user ){
    mio = "mio";
  } else {
    mio = "noMio";
  }

  return (
    <section className={`mensaje${mio}`}>
      <p className="nombreUser">{usuario}</p> 
      <p className="textoMensaje">{texto}</p>

    </section>
    
  )
  
}

export default Mensaje;
