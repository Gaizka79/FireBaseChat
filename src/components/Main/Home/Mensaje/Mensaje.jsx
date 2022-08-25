import React, { useContext } from "react";
import { userContext } from "../../../../context/userContext";

function Mensaje (props) { 
  const { user } = useContext(userContext);
  const {texto, usuario} = props.data;
  let mio;
  
  if (usuario === user ){
    mio = "mio";
  } else {
    mio = "noMio";
  }

  return (
    <section className="cajaPadre">
      <div className={`mensaje${mio}`}>
        <p className="nombreUser">{usuario}</p> 
        <p className="textoMensaje">{texto}</p>
        {/* <p className="fechaMensaje">{fecha}</p>  */}
      </div>
    </section>
  )
  
}

export default Mensaje;
