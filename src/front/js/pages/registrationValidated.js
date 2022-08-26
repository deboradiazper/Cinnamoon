import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import { UserRegistration } from "./userRegistration";
import { UserLogin } from "./userLogin";

export const RegistrationValidated = () => {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-6 text-center">
          <div class="position-absolute top-50 start-50 translate-middle">
            <h1>
              <i class="fas fa-seedling pb-3"></i>Todo ha ido sobre ruedas
              <i class="fas fa-seedling pb-3"></i>
            </h1>
            <h2>Por favor, inicia sesión para validar tu usuario</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
