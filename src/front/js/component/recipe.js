import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { Detail } from "../pages/detail";

const Recipe = (props) => {
  const { store, actions } = useContext(Context);
  const [Click, setClick] = useState(false);
  const handleClick = () => {
    //actions.addFavorites({user_id:props.id});
    Click == true ? setClick(false) : setClick(true);
    actions.addFavorites(props.id);
  };

  return (
    <div className="card border-0">
      <div className="position-relative">
        <img src={props.image} className="img-recipe" alt="receta" />
        <div className="buttonImage position-absolute bottom-0 start-0 m-3">
          <Link to={`/detail/${props.id}`} className="buttonDetail">
            VER
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h6 className="card-title">{props.name}</h6>
          {store.token ? (
            <button
              onClick={handleClick}
              className={
                Click === true || props.is_favorite == true
                  ? "love btn border-0 text-danger"
                  : "love2 btn border-0 text-muted"
              }
            >
              <i class="fas fa-heart"></i></button>
          ) : (
            ""
          )}
        </div>
        <div className="card-text">
          {props.categories.map((value, index) => {
            return (
              <div className="categorie d-inline-flex m-1" key={index}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Recipe.propTypes = {
  name: PropTypes.string,
  categories: PropTypes.array,
  image: PropTypes.string,
  id: PropTypes.number,
  categories: PropTypes.array,
  is_favorite: PropTypes.bool,
};

export default Recipe;
