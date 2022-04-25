import React from "react";
import { useParams } from "react-router-dom";

function Portfolio() {
  const params = useParams();

  return <div>ID: {params.portfolioId}</div>;
}

export default Portfolio;
