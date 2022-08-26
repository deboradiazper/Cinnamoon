import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Recipe from "./recipe";

export const SearchBar = () => {
  //lo q introduce el usuario
  const [search, setSearch] = useState("");
  // lo q tenemos en api
  const [recipe, setRecipe] = useState([]);
  //store
  const { actions, store } = useContext(Context);

  //render vista
  useEffect(() => {
    setSearch(store.searchRecipes);
    actions.search(search).then((result) => {
      setRecipe(result);
      actions.cleanSearch();
    });
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const subtmitHandler = async (e) => {
    e.preventDefault();
    const searchResults = await actions.search(search);
    setRecipe(searchResults);
  };

  return (
    <>
      <div className="row justify-content-center text-center my-5">
        <form
          onSubmit={subtmitHandler}
          className="formBusca d-flex justify-content-center"
        >
          <div className="input-group pb-2 mt-5 px-lg-5 px-sm-5 w-75">
            <input
              className="form-control searchIngredients2"
              id="searchinput"
              type="text"
              placeholder="¿Qué ingredientes tienes a mano?"
              defaultValue={search}
              onChange={searcher}
            />

            <button className="botonreceta"><i class="fas fa-search px-3"></i></button>
          </div>
        </form>
      </div>
      <div className="row">
        {recipe.map((recipe, index) => {
          return (
            <div className="recipes col-12 col-md-4" key={index}>
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
    </>
  );
};
