import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Test from './components/Test';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {

  const [hasAcc,setHassAcc] = useState(true);
  return (
    <div className="App">
 

 <img src="./logo.png" alt="" srcSet="" width={100} className="m-auto" />
        {hasAcc?<Login setHassAcc={setHassAcc}/>:<Register setHassAcc={setHassAcc}/>}
        
        {/* <Test/> */}

    </div>
  );
}

export default App;
