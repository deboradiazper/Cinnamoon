import React from "react";
import PropTypes from "prop-types";

const RecipeDetail = (props) => {
  return (
    <div className="row">
      <div className="col-12">
        <img
          src="https://nutririana.com/wp-content/uploads/2020/06/Poke-bowl-vegano-de-no-at%C3%BAn.jpg"
          className="image-detail"
          alt="..."
        />
      </div>

      <div className="col-10">
        <div className="d-flex justify-content-between mt-3">
          <h2 className="title py-3">Pokebowl vegan</h2>
          <span className="star">
            <i className="fas fa-star ms-3"></i>
            <i className="fas fa-star ms-3"></i>
            <i className="fas fa-star ms-3"></i>
            <i className="fas fa-star ms-3"></i>
            <i className="fas fa-star ms-3"></i>
          </span>
        </div>

        <p className="fs-5">vegan, lactose free</p>
        <p className="py-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur
          {props.description}
        </p>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  categories: PropTypes.string,
};
export default RecipeDetail;
