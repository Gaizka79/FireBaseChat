import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext";
import firebaseConfig from "../../../utils/firebaseConfig";

import { initializeApp } from "firebase/app";
import { getFirestore , orderBy, limit, query } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

import Mensaje from "./Mensaje";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Home () {

  const { user } = useContext(userContext);
  const [ msgs, setMsgs ] = useState([]);
  let datos = [{
    usuario: '',
    fecha: '',
    texto: ''
  }];
  let newArray = [];

  useEffect(() => {
    
    async function getMsgs() {
      const q = query(collection(db, "Sala1"),orderBy("fecha", "desc"),limit(10));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs);
      //querySnapshot.docs.map((doc) => console.log(doc.data().texto)); ==> FUNCIONA!!
      newArray = querySnapshot.docs.map((doc) => doc.data());
      console.log(newArray);
      setMsgs(newArray.reverse());
    };
    getMsgs();
  },[])

  const sendMsg = async (e) => {
    e.preventDefault();
    console.log(e.target.msg.value);
    const texto = e.target.msg.value;
    //const fecha = new Date().toDateString();
    const fecha = new Date();
    const usuario = user;
    datos = ({
      usuario: usuario,
      fecha: fecha,
      texto: texto
    });
    console.log(datos);
    await addDoc(collection(db, "Sala1"), datos);
    setMsgs([...msgs, datos]);
    e.target.msg.value = "";
  };

  return (
    <main>
      <div>
        {msgs?
        msgs.reverse().map((mens, i) => <Mensaje data={mens} key={i} /> )
        /* newArray.map((mens, i) => <Mensaje data={mens} key={i} /> ) */
        :<p>No hay array</p>}
      </div>
      <div className="chat">
        <form onSubmit={sendMsg}>
          <input type="text" name="msg" />
          <input type="submit" value="Enviar"/>
          {/* <button onClick={paintMsgs}>coleccion</button> */}
        </form>
      </div>
    </main>

  )
  
}

export default Home;
