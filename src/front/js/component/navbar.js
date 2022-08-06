import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  return (
    <nav className="navbar d-flex justify-content-around align-items-center px-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <span className="logo">
            <h3>CINNAMOON</h3>
          </span>
        </Link>
        <div className="icons d-flex justify-content-around align-items-center">
          <i className="far fa-moon me-3"></i>

          {store.token ? (
            <button
              onClick={() => {
                actions.logout(navigate("/"));
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/user");
              }}
            >
              <i className="far fa-user me-2"></i>
            </button>
          )}
          <div className="btn dropstart">
            <button
              type="button"
              className="bars btn dropdown border-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="drop-down"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
              ></img>
            </button>
            <ul className="dropdown-menu p-3 mb-5 bg-body rounded border-0">
              <li>Recipes</li>
              <li>Curiosities</li>
              <li>About us</li>
              <li>Contact</li>
              <li>Settings</li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>Loging</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
