import { useState } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DomainAuction from "./components/DomainAuction";
import Home from "./components/Home";
import Navbar from './components/Navbar/index';

function App() {
  const [hasAcc, setHassAcc] = useState(true);
  return (
    <div className="App">
      {localStorage.getItem("acc-token") ? (
        <>
          <Navbar />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/domain/:id" element={<DomainAuction />} />
            </Routes>
          </Router>
        </>
      ) : (
        <>
          <img
            src="./logo.png"
            alt=""
            srcSet=""
            width={100}
            className="m-auto"
          />
          {hasAcc ? (
            <Login setHassAcc={setHassAcc} />
          ) : (
            <Register setHassAcc={setHassAcc} />
          )}
        </>
      )}

      {/* <Test/> */}
    </div>
  );
}

export default App;
