import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import { UserRegistration } from "./userRegistration";
import { UserLogin } from "./userLogin";

export const User = () => {
  const style = {
    backgroundImage: 'url("/fotolado.jpg")',
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <UserLogin />
        </div>
        <div className="col-md-6">
          <UserRegistration />
        </div>
      </div>
    </div>
  );
};
