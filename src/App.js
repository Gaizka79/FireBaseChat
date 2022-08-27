import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { userContext } from './context/userContext';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {

  const [user, setUser] = useState(""); // hook useState

  const login = (name) => {
    setUser(name);
  }
  
  //Change user
  const changeUser = (usuario) => {
    setUser(usuario);
  }

  const userData = {
    user,
    login,
    //logout,
    changeUser
  }

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={userData}>
          <Header/>
          <Main/>
        </userContext.Provider>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
