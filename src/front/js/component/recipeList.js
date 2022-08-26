import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Recipe from "./recipe";

const RecipeList = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="scroll-container d-flex">
      {store.recipes.map((recipe, index) => {
        return (
          <div className="col-12 col-md-3" key={index}>
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default RecipeList;
