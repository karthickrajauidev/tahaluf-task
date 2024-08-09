// Details.js

import React from "react";
import "../styles.css";

const Details = ({ university, goBack }) => {
  if (!university) return <div>No details available</div>;

  return (
    <div>
      <h2>{university.name}</h2>
      <p>{university.country}</p>
      <a
        href={university.web_pages[0]}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Website
      </a>
      <br />
      <button onClick={goBack}>Back to Listing</button>
    </div>
  );
};

export default Details;
