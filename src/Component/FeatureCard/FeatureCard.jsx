import React from "react";
import "./FeatureCard.css";
const FeatureCard = (props) => {
  return (
    <div className="container">
      <div className="card">
        <figure className="card__thumb">
          <img
            src={props.img}
            alt="Picture by Kyle Cottrell"
            className="card__image"
          />
          <figcaption className="card__caption">
            <h2 className="card__title">{props.heading}</h2>
            <p className="card__snippet">{props.subheading}</p>
            <a href="" className="card__button">
              Read more
            </a>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default FeatureCard;
