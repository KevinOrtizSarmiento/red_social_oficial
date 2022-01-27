import React from "react";
import { logout } from "../redux/apiCalls/authApiCalls";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "../styles/nav.css";

const Nav = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cerrar = (e) => {
    e.preventDefault();
    logout(dispatch);
  };
  return (
    <header id="nef" className=" nav-nav ">
      <div
        id="tex"
        className="container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <NavLink id="academica" className="navbar-brand " to={"/"}>
         Academica
        </NavLink>
        {currentUser?<NavLink style={{color:'black'}} className="amigos nav-link" to="/friends">Amigos</NavLink>:null}
        {currentUser ? (
          <ul id="navKevin">
            <NavLink to={"/profile/"+currentUser._id}>
              {currentUser.imgProfile ? (
                <img
                  style={{ borderRadius: "40px", marginTop: "8px" }}
                  width="40px"
                  height="40px"
                  src={currentUser.imgProfile}
                  alt=""
                />):null}
            </NavLink>
            <button
              class="nav-link buton "
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi i-NavBar bi-caret-down-fill"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "#000",
                  paddingTop: "0.3rem",
                  paddingBottom: "0.2rem",
                  paddingLeft: "1rem",
                }}
                id="logout"
                class="dropdown-item"
                to={"/profile/"+currentUser._id}
              >
                Perfil
              </NavLink>
              <li className="li">
                <hr class="dropdown-divider" />
              </li>
              <button
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "#000",
                  paddingLeft: "1rem",
                }}
                id="logout"
                class="dropdown-item"
                onClick={cerrar}
              >
                Cerrar sesion
              </button>
            </ul>
          </ul>) : null}
      </div>
    </header>
  );
};

export default Nav;
