import React, { Component } from "react";
import { Link } from "react-router-dom";


export const Footer = () => {
  return (
    <div className="container-fluid p-0 mt-5">
      <footer className="footer mt-auto py-3 text-center pt-4">
        <p>
          <strong>Síguenos en las redes sociales</strong>
        </p>
        <div className="iconsFooter">
          <img
            className="instagram mx-4 img-fluid"
            src="https://cdn-icons-png.flaticon.com/128/1077/1077042.png"
          ></img>
          <img
            className="tweet img-fluid"
            src="https://cdn-icons-png.flaticon.com/128/250/250558.png"
          ></img>
          <img
            className="pinterest mx-4 img-fluid"
            src="https://cdn-icons-png.flaticon.com/128/104/104628.png"
          />
        </div>
      </footer>
    </div>
  );
};
