import React, { useContext, useEffect, useState } from "react";
import login from "../../assets/sign_in.jpg";
import btLogout from "../../assets/logout.png";
import { userContext } from '../../context/userContext';

import firebaseConfig from "../../utils/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function Header () {

  const provider = new GoogleAuthProvider();
  const { user, logout, changeUser } = useContext(userContext);
  console.log(user);
  //const [usuario, setUsuario] = useState(user);
  //console.log(usuario);

  useEffect(() => {
    // si no hay usuario.....
    //hay ke utilizar localstorage para mantener sesion abierta
    if (user) {
      console.log("Tenemos al usuario: " + user)
    } else {
      console.log("no tenemos usuario");
    }
  }, [user]);

  const loginGoogle = () => {
    const auth = getAuth();
    console.log(auth);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user.displayName);
        //setUsuario(user.displayName);
        changeUser(user.displayName);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      changeUser("");
      console.log("Logout con éxito!");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
  
  return (
    <header>
      <h1>Fire Chat</h1>
      {/* <img src={login} alt="login" className="btLogin" onClick={loginGoogle}/>  */}
      {/* <img src={btLogout} alt="logout" className="btLogout" onClick={logOut}/> */}
      <userContext.Consumer> 
        {({user}, usuario) => 
          user?
            <>
              <p>Hola, {user}</p>
              <img src={btLogout} alt="logout" className="btLogout" onClick={logOut}/>
            </>:
            <img src={login} alt="login" className="btLogin" onClick={loginGoogle}/> 
        }
      </userContext.Consumer>
    </header>
  )
}

export default Header;
