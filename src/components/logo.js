import React, { useState } from "react";
import iconLoad from "../assets/images/001gif.gif";



export default ({ showResults, icon, requested }) => {
  const [hovered, setHovered] = useState(false);
  const btnClass = hovered ? "loading" : "none";

  function toggleClass() {
    setHovered(!hovered);
  }
  
  if (icon === iconLoad && requested === false) {
    return (
      <div className="logo_window">
      </div>
    );
  } else {
    return (
      <div className="logo_window">
        <div className="logo">
          <img src={icon} alt="icon" 
            onClick={() => showResults()}  
          />
        </div>
      </div>
    );
  }
};
