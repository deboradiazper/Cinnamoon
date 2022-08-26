import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Recipe from "./recipe";

const RecipesFavorits = () => {
  const { store, actions } = useContext(Context);
  // const listrecipesfav = store.recipesfavorites.map(() => {
  //  return <li>{item.name}</li>;
  // });
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
    actions.loadFavoritesRecipes();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <h3 className="mt-5 mt-5"> Mis Recetas favoritas </h3>
        {store.recipesfavorites.map((recipe, index) => {
          return (
            <div className="col-12 col-md-3 pt-3 mt-5" key={index}>
              <Recipe
                name={recipe.name}
                id={recipe.id}
                image={recipe.image}
                is_favorite={recipe.is_favorite ? recipe.is_favorite : false}
                categories={recipe.categories.map((value, index) => {
                  return (
                    <img className="categories" key={index} src={value.image} />
                  );
                })}
              />{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

export default RecipesFavorits;
