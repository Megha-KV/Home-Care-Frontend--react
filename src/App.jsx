import "./App.css";
import Header from "./components/Header/AdminHeader.jsx";
import SideBar from "./components/SideBar.jsx";
import Routing from './components/Routing.jsx'
import { useUser } from "./context/userContext.jsx";
import { useEffect } from 'react';


function App() {
  const user = useUser();
  useEffect(()=>{
    console.log(user)
},[user])
  return (
    <>
      <div style={{ display: "flex" , height:"100vh"}}>
        {user?.user?.access && <SideBar/> }
        <div style={{ width:"100%" ,backgroundColor:"#fffaf5", padding:"0.1rem" }} >
          {/* <Header />  */}
          <Routing />
        </div>
      </div>
    </>
  );
}

export default App;