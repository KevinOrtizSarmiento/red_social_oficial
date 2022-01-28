import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/home.css"
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound"
import Profile from "./views/Profile"
import Nav from "./components/Nav";
function App() {
  const {currentUser} = useSelector((state) => state.auth)
  return (
  <div className="app">
    <BrowserRouter>
    <Nav/>
    <div className="app-container container">
    
      <Routes>
        <Route path="/" element={currentUser?<Home />:<Login/>} />
        <Route path="/register" element={currentUser?<NotFound/>:<Register/>}/>
        <Route path="/profile/:id" element={currentUser?<Profile/>:<Login/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;