import React from "react";

const Trivias = (props) => {
  return (
    <div>
      {props.trivias.map((trivia, index) => {
        return (
          <div key={index}>
            <div className="card-ingredient">
              <div class="row g-0">
                <div className="col-md-4" style={{ minHeight: "250px" }}>
                  <img src={trivia.image} className="card-img-top" alt="..." width="100%" height="100%" />
                </div>
                <div className="col-md-6" style={{ minHeight: "250px", minWidt: "100%" }}
                >
                  <div className="card-body mx-2 mt-1" style={{ minWidth: "100%" }}>
                    <h5 className="name-trivia pt-2">
                      {props.ingredientName}:
                    </h5>
                    <p className="card-text pt-2">{trivia.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Trivias;
