import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import cinnamoon from "../../img/cinnamoon.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const isAuthenticate = () => {
    if (store.auth) {
      navigate("/userArea");
    } else {
      navigate("/user");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top d-flex justify-content-around align-items-center px-5 pb-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <span className="logo">
            <img
              src={cinnamoon}
              className="img-logo img-fluid"
              alt="logo"
              width="65"
              height="65"
            />
          </span>
        </Link>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse border-0 justify-content-end" id="navbarSupportedContent">
          <div className="d-flex flex-sm-column flex-md-column flex-lg-row align-items-sm-end  align-items-md-end align-items-lg-center">
            {store.auth ? (
              <div>
                <p className="userNavbar text-3 px-md-2 my-md-3"> Hola {store.user} </p>
              </div>
            ) : (
              ""
            )}
            <button className="ctamoon  mx-lg-4"> Moon </button>
            {store.auth ? (
              <>
                <Link to={"/userArea"} className="ctaLoging mx-lg-4">
                  AREA USUARIO
                </Link>
                <button
                  className="ctaLoging"
                  onClick={() => {
                    const result = actions.logout();
                    if (result) {
                      navigate("/");
                    }
                  }}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <button
                className="ctaLoging"
                onClick={() => {
                  isAuthenticate();
                }}
              >
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
