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
    <div className="container">
      <div className="search justify-content-center">
        <form onSubmit={subtmitHandler}>
          <input
            type="search"
            placeholder="¿Qué ingredientes tienes a mano?"
            defaultValue={search}
            onChange={searcher}
          />
          <button className="search__button">
            <svg
              className="search__icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </form>

        {recipe.map((recipe) => {
          return (
            <div className="recipes">
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
