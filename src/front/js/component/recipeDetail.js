import React from "react";
import PropTypes from "prop-types";
import Trivias from "./trivias";

const RecipeDetail = (props) => {
  return (
    <div className="row">
      <div className="col-md-6" style={{ minHeight: "400px" }}>
        <div className="card-detail">
          <div className="front">
            <img src={props.image} className="image-detail" alt="..." />
          </div>
          <div className="back overflow-auto">
            <div className="text-back text-center">
              <h5 className="title-back pb-2 mt-3">
                <i class="fas fa-pencil-alt text-muted pe-2"></i> Ingredientes:
              </h5>
              <ul>
                {props.ingredients.map((value, index) => {
                  return <li key={index}>{value.name}</li>;
                })}
              </ul>
            </div>
            <p className="time mx-5 pb-3 text-center "> {props.cookingtime}</p>
          </div>
        </div>
      </div>

      <div className="description-detail col-md-6 ps-5 overflow-auto" style={{ minHeight: "400px" }}>
        <div className="box-title d-flex justify-content-between align-items-center pe-5">
          <h4 className="title-detail">{props.name}</h4>
          <i className="fas fa-heart text-muted"></i>
        </div>
        <div className="icons-description d-flex my-3">
          <div className="categorie d-inline-flex">
            {props.categories.map((value, index) => {
              return <p key={index}>{value}</p>;
            })}
          </div>
        </div>
        <p className="card-text3">{props.description}</p>
      </div>
      <div className="col-12">
        <h4 className="title-trivia mt-5 pt-5">
          Conoce más sobre esta receta..
        </h4>

        {props.ingredients.map((value, index) => {
          return (
            <Trivias
              trivias={value.trivia}
              ingredientName={value.name}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  categories: PropTypes.array,
  ingredients: PropTypes.array,
  cookingtime: PropTypes.string,
};
export default RecipeDetail;
