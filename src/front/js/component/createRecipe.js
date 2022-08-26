import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import cinnamoon from "../../img/cinnamoon.png";

const CreateRecipe = () => {
    const { store, actions } = useContext(Context);
    const [newrecipe, setNewrecipe] = useState();
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const [categories, setCategory] = useState(store.categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
            status: false
        }
    }));

    useEffect(() => {
        if (!store.token) {
            navigate("/user");
        }
    }, []);

    const handleChange = (event) => {
        setNewrecipe({ ...newrecipe, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append(
            "categories", categories.filter(category => category.status == true).map(category => category.id).join()

        )
        fetch(process.env.BACKEND_URL + "/api/addrecipes", {
            method: "POST",
            body: formData,
            headers: {
                // "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
                navigate(`/detail/${data.recipe_id}`)
            })
    };
    const handleFileInput = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <div className="col-12 my-3 pt-5">
                <div className="d-flex justify-content-center flex-column">
                    <h3 className="text-center">Gracias</h3>
                    <p className="text-3 text-center">
                        Por hacer crecer nuesra comunidad. Con tu aportación más personas
                        podrán disfrutar de una alimentación más adaptada, saludable y
                        variada.
                    </p>
                </div>
            </div>
            <div className="col-12 d-flex justify-content-center">
                <div class="card-newrecipe">
                    <div class="header">
                        <div class="img-box d-flex justify-content-center">
                            <img
                                src={cinnamoon}
                                className="img-logo"
                                alt="logo"
                                width="70"
                                height="70"
                            />
                        </div>
                        <p class="text-3 titleNewrecipe">¿Es tu primera vez? Lee esto..</p>
                    </div>

                    <div class="content pt-1 pb-3 px-2">
                        <p>
                            En Cinnamoon valoramos mucho tu tiempo, es por ello que hemos
                            creado este senciilo formulario donde puedes añadir en cada campo
                            información sobre tu receta. Es muy importante que selecciones
                            bien la categoria, puesto que asi otros usuarios interesados
                            podrán acceder a tu receta de manera sencila. Recuerda subir una
                            imagen en el formato y medidas aceptadas y no olvides darle click
                            al botón de añadir y ¡LISTO!, tu receta ya es visible para el
                            resto de la comunidad.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-12 my-5">
                <div className="formCreateRecipe p-5">
                    <form onSubmit={handleSubmit} encType={"multipart/form-data"}>
                        <div className="form-group pt-3">
                            <label for="inputTitulo" className="title-all2 mb-2">
                                Escribe un título
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control w-100"
                                id="inputTitulo"
                                placeholder="Título receta"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group pt-3">
                            <label for="inputTitulo" className="title-all2 mb-2">
                                Sube una imagen
                            </label>

                            <div className="input-group">
                                <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    id="inputGroupFile04"
                                    aria-describedby="inputGroupFileAddon04"
                                    aria-label="Upload"
                                    onChange={handleFileInput}
                                />
                                <button
                                    className="button1 border"
                                    type="button"
                                    id="inputGroupFileAddon04"
                                >
                                    SUBIR
                                </button>
                            </div>
                        </div>

                        <div className="form-group pt-3">
                            <label for="inputIngredients" className="title-all2 mb-2">
                                ¿Qué ingredientes lleva?
                            </label>
                            <input
                                type="text"
                                name="ingredientes"
                                className="form-control w-100"
                                id="inputIngredients"
                                placeholder="Ingredientes"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group pt-3">
                            <label for="inputTime" className="title-all2 mb-2">
                                ¿Cuánto tiempo tardas en cocinarlo?
                            </label>
                            <input
                                type="text"
                                name="cookingtime"
                                className="form-control w-100"
                                id="inputTime"
                                placeholder="Tiempo de cocinado"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group pt-3">
                            <label for="inputDescription" className="title-all2 mb-2">
                                Describe los pasos de la receta
                            </label>
                            <textarea
                                className="form-control w-100"
                                name="description"
                                aria-label="With textarea"
                                placeholder="Escribe aqui tu receta"
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group pt-3">
                            <label
                                for="exampleFormControlSelect1"
                                className="title-all2 mb-2"
                            >
                                Escoge una categoria
                            </label>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <button className={`m-4 btn btn-${category.status ? "secondary" : "light"}`} type="button" onClick={() => {
                                            setCategory(categories.map((item) => {
                                                if (item.id == category.id) {
                                                    item.status = !item.status
                                                }
                                                return item
                                            }))
                                        }}>{category.name}</button>
                                    )
                                })
                            }
                        </div>
                        <div className="button-newrecipe text-center pt-5">
                            <button className="ctaNewrecipe" type="submit">
                                <span>AÑADIR</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    );
};
export default CreateRecipe;
