import React, { useState } from "react";
import get from "lodash/get";
import moment from "moment";
import { filterSmokeWords } from "../../Layout/utils";

export default ({ product, smokeWords }) => {
  const [showDetails, setShowDetails] = useState(false);

  const productDescription = get(product, "description", "");

  const filteredProductDescription = filterSmokeWords(
    productDescription,
    smokeWords
  );

  return (
    <div className="itemContainer">
      <div className="itemOverview">
        <img
          src={get(product, "image", "https://dapp.dblog.org/img/default.jpg")}
          alt="n/a"
          className="imgWindow"
        />
        <div className="itemInnerContainer">
          <p className="recallLink">
            <strong style={{ color: "#0085C3" }}>Title:</strong>{" "}
            <a
              href={get(product, "url", "")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {get(product, "title", "")}
            </a>
          </p>
          <p className="itemRecallDate">
            recalled date{" "}
            {moment(get(product, "recalldate", "")).isValid()
              ? moment(product.recalldate).format("MMM DD, YYYY")
              : ""}
          </p>
          {showDetails && (
            <div className="showDetailsContainer">
              <p>
                <strong style={{ color: "#0085C3" }}>Hazard:</strong>{" "}
                {get(product, "hazard", "")}{" "}
              </p>
              <p>
                <strong style={{ color: "#0085C3" }}>Description:</strong>{" "}
                {filteredProductDescription}{" "}
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        className="showDetails"
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        {showDetails ? "HIDE DETAILS" : "VIEW DETAILS"}
      </button>
    </div>
  );
};
