import {React } from "react";
import "./card.css";

const Card = ({ image, description, memeId }) => {
  return (
    <div className="card mb-3" key={memeId}>
      <div className="card__img__container">
        <img className="card__img" src={image}></img>
      </div>  
      <div className="card__descr-wrapper">
        <p className="card__title">
        {description}
      </p>
      </div>
    </div>
  );
};

export default Card;