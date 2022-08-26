import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Recipe from "../component/recipe";

export const RecipeAll = () => {
  const params = useParams();
  const { actions } = useContext(Context);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    actions.loadRecipeCategory(params.name).then((response) => {
      setRecipes(response);
    });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="title-all mt-5">{params.name}</h3>
        </div>
        {recipes.map((recipe, index) => {
          return (
            <div className="col-12 col-md-3 mt-5" id="recipes" key={index}>
              <Recipe
                name={recipe.name}
                id={recipe.id}
                image={recipe.image}
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
    </div>
  );
};

export default RecipeAll;
