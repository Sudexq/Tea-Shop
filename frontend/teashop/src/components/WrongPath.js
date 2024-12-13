import React from "react";
import { Link } from "react-router-dom";

export const WrongPath = () => {
  return (
    <div className="wrongPath">
      <h1>Wrong Way:/</h1>
      <p>Please be sure for correct way</p>
      <Link to="/">Home</Link>
    </div>
  );
};
