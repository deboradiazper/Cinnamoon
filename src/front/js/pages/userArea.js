import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import FavUser from "../component/favUser";
import TableUser from "../component/tableUser";
import imgfav from "../../img/imgfav.png";

export const UserArea = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      actions.setToken(
        localStorage.getItem("token"),
        localStorage.getItem("user")
      );
    }
    if (!store.token) {
      navigate("/user");
    }
    actions.loadToprecipe();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-3 pt-3">
          <h4 className="user-name text-center"> Hola </h4>{" "}
          <p className="user-mail text-center"> {store.mail} </p>{" "}
          <div className="d-flex justify-content-center">
            Bienvenid @ de nuevo.Recuerda que aquí puedes gestionar tus
            favoritos y añadir nuevas recetas.No olvides leer la guía si es la
            primera vez que compartes tus creaciones.{" "}
          </div>{" "}
        </div>{" "}
        <div className="col-md-6 my-5">
          <FavUser />
        </div>{" "}
        <div className="col-md-6 my-5">
          <TableUser />
        </div>{" "}
      </div>{" "}
    </div>
  );
};
