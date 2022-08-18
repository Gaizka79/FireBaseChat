import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext";
import firebaseConfig from "../../../utils/firebaseConfig";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Home () {

  const { user } = useContext(userContext);
  const [ msgs, setMsgs ] = useState([]);

  useEffect(() => {
    const datos = async()=>await getDocs(collection(db, "Gaizka Arrondo"));
    console.table(datos);
    /* datos.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
    }) */
  });

  const sendMsg = async (e) => {
    e.preventDefault();
    console.log(e.target.msg.value);
    let date = new Date();
    /* let guardar = doc(db, user, e.target.msg.value);
    setDoc(guardar, { capital: false }, { merge: true }); */
    await setDoc(collection(db, "chatFB", user), {
      user: user,
      fecha: date,
      texto: e.target.msg.value
    })//, { merge: true });
  }

  const paintMsgs = async () => {
    const querySnapshot = await getDocs(collection(db, user));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
});

  }

  return (
    <main>
      <div className="usuarios">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, laboriosam!</p>
      </div>
      <div className="chat">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam adipisci beatae atque debitis cumque pariatur. Eaque corrupti blanditiis porro nesciunt possimus eum, aspernatur, hic impedit beatae quidem ipsum, officia temporibus dolore quod incidunt nam deleniti.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, nemo!</p>
        <form onSubmit={sendMsg}>
          <input type="text" name="msg" />
          <input type="submit" value="Enviar"/>
          <button onClick={paintMsgs}>coleccion</button>
        </form>
      </div>


    </main>



  )
  
}

export default Home;
