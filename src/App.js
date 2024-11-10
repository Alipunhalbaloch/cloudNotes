import "./App.css";
import React, { useState } from 'react';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./context/notes/NoteState";

import { Routes, Route } from "react-router-dom";
import Alert from "./Components/Alert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=> {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
 }

  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route exact path="/About" element={<About />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
