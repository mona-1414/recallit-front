import React, { useState } from "react";

import { filterSmokeWords } from "../../features/Layout/utils";

export default ({ report, smokeWords }) => {
  const IncidentDescription = report.IncidentDescription;
  const filteredIncidentDescription = filterSmokeWords(
    IncidentDescription,
    smokeWords
  );

  const incidentTitle = report.IncidentProductDescription;
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="itemContainer">
      <div style={{ padding: " 0 10px" }} className="itemOverview">
        <div className="itemInnerContainer">
          {!showDetails && (
            <>
              <p style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "700", color: "#0085C3" }}>
                  Title:{" "}
                </span>
                {incidentTitle.slice(0, 58)}
                {incidentTitle !== incidentTitle.slice(0, 58) && "..."}
              </p>
              <p style={{ marginTop: 0 }}>
                <span style={{ fontWeight: "700", color: "#0085C3" }}>
                  Description:{" "}
                </span>
                {IncidentDescription.slice(0, 120)}
                ...
              </p>
              <p className="itemRecallDate">
                Report date{" "}
                {report.IncidentDate.split(" ").splice(1, 3).join(" ")}
              </p>
            </>
          )}

          {showDetails && (
            <>
              <p>
                <span style={{ fontWeight: "700", color: "#0085C3" }}>
                  Title:{" "}
                </span>
                {incidentTitle}
              </p>

              <p className="itemRecallDate">
                Report date{" "}
                {report.IncidentDate.split(" ").splice(1, 3).join(" ")}
              </p>
              <div className="showDetailsContainer">
                <p>
                  <span style={{ fontWeight: "700", color: "#0085C3" }}>
                    Description:{" "}
                  </span>

                  {filteredIncidentDescription}
                </p>
              </div>
            </>
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
