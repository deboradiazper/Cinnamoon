import React from "react";

export const AboutUs = () => {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="valores col-12 col-md-4 text-center px-5">
          <h3>Nuestros valores</h3>
          <p></p>
        </div>
        <div className="somos col-12 col-md-4 text-center px-5">
          <h3>Somos lo que comemos</h3>
          <p>
            Tan importante es alimentarse bien como hacerlo de forma consciente.
            Es por eso que nos gusta aportar información acerca de los
            ingredientes que utilizamos para las recetas. Como cocinar nos
            apasiona, también nos apasiona la historia de los ingredientes.
          </p>
        </div>
        <div className="comunidad col-12 col-md-4 text-center px-5">
          <h3>Crecer en comunidad</h3>
          <p>
            No queremos ser solamente una página web de recetas. Nuestro
            objetivo es crear una comunidad en la que cualquier persona afín a
            nuestros valores pueda aportar su granito de arena. Compartir es
            vivir.
          </p>
        </div>
      </div>
    </div>
  );
};
