import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext";
import firebaseConfig from "../../../utils/firebaseConfig";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, collectionGroup, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

import Mensaje from "./Mensaje";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Home () {

  const { user } = useContext(userContext);
  const [ msgs, setMsgs ] = useState([]);
  const [ datos, setDatos ] = useState({
    usuario: "",
    fecha: "",
    texto: ""
  });
  const [ oldMsgs, setOldMsgs ] = useState([]);

  useEffect(() => {
    paintMsgs();
  },[])

 /*  useEffect(() => {
    const datos = async()=>await getDocs(collection(db, "Gaizka Arrondo"));
    console.table(datos);
    //const querySnapshot = await getDocs(collection(db, user));
    const querySnapshot = async () => await getDocs(collection(db, "Sala1"));
    //const querySnapshot = await getDocs(collectionGroup(db));
    console.log(querySnapshot);
    //querySnapshot.docs.map((doc) => console.log(doc.data().texto)); ==> FUNCIONA!!
    let newArray = querySnapshot.docs.map((doc) => doc.data());
    console.log(newArray);
    setOldMsgs(newArray);
    console.log(oldMsgs);


    //paintMsgs();
    /* datos.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
    }) */
    /* paintMsgs();
  },[]);  */

  const sendMsg = async (e) => {
    e.preventDefault();
    console.log(e.target.msg.value);
    let texto = e.target.msg.value;
    let fecha = new Date();
    let usuario = user;
    setDatos({usuario, fecha, texto});
  
    console.log(datos);
    //let guardar = doc(db, user, e.target.msg.value);
    //setDoc(guardar, { capital: false }, { merge: true }); */
    //await addDoc(collection(db, "Sala1", user, "date"), {
    await addDoc(collection(db, "Sala1"),datos); /* {
      user: user,
      fecha: date,
      texto: e.target.msg.value
    }) *///, { merge: true });
    
    paintMsgs();
  }

  const paintMsgs = async () => {
    
    //const querySnapshot = await getDocs(collection(db, user));
    const querySnapshot = await getDocs(collection(db, "Sala1"));
    //const querySnapshot = await getDocs(collectionGroup(db));
    console.log(querySnapshot.docs);
    //querySnapshot.docs.map((doc) => console.log(doc.data().texto)); ==> FUNCIONA!!
    setMsgs(querySnapshot.docs.map((doc) => doc.data()));
    
    //let newArray = await querySnapshot.docs.map((doc) => doc.data());
    //console.log(newArray);
    //setMsgs([...newArray]);
    console.log(msgs); 
    //setMsgs(querySnapshot.docs.map((doc) => [...msgs,doc.data().texto]));
    //console.log(msgs);

    /* querySnapshot.forEach((doc) => {
      console.log(doc.data().texto);
      //setMsgs([msgs + doc.data().texto]);
      setMsgs(msgs => [...msgs,doc.data()])
      console.log(msgs);
      //console.log(`${doc.id} => ${doc.data().texto}`);
    }); */
  }

  return (
    <main>
      <div className="usuarios">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, laboriosam!</p>
      </div>
      <div>
        {msgs !=="" ?
        msgs.map((mens, i) => <Mensaje data={mens} key={i} /> )
        :""}
      </div>
      <div className="chat">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam adipisci beatae atque debitis cumque pariatur. Eaque corrupti blanditiis porro nesciunt possimus eum, aspernatur, hic impedit beatae quidem ipsum, officia temporibus dolore quod incidunt nam deleniti.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, nemo!</p>
        <form onSubmit={sendMsg}>
          <input type="text" name="msg" />
          <input type="submit" value="Enviar"/>
          {/* <button onClick={paintMsgs}>coleccion</button> */}
        </form>
        <button onClick={paintMsgs}>coleccion</button>
      </div>


    </main>



  )
  
}

export default Home;
