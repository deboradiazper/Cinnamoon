import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { UserRegistration } from "./pages/userRegistration";
import { UserLogin } from "./pages/userLogin";
import { User } from "./pages/user";
import { UserArea } from "./pages/userArea";
import { RegistrationValidated } from "./pages/registrationValidated";
import { SearchApp } from "./pages/searchApp";
import { AboutUs } from "./pages/aboutUs";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Detail } from "./pages/detail";
import RecipeAll from "./pages/recipesAll";
import RecipesFavorits from "./component/recipesFavorits";
import { NewRecipe } from "./pages/newRecipe";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<User />} path="/user" />
            <Route element={<UserRegistration />} path="/userRegistration" />
            <Route element={<UserLogin />} path="/userLogin" />
            <Route element={<UserArea />} path="/userArea" />
            <Route
              element={<RegistrationValidated />}
              path="/registrationValidated"
            />
            <Route element={<RecipeAll />} path="/recipeAll/:name" />
            <Route element={<Detail />} path="/detail/:id" />
            <Route element={<SearchApp />} path="/searchApp" />
            <Route element={<RecipesFavorits />} path="/recipefav" />
            <Route element={<NewRecipe />} path="/newrecipe" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
