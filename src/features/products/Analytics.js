import React from "react";
import Neiss from "./neiss/Neiss";

import styles from "./Analytics.module.css";

const App = ({ scrapData, dataChats }) => {
  return (
    <div>
      {/* if scrap data is false, there's no incident data */}
      {scrapData.scrapData.actual !== undefined ? (
        <div className={styles.Analytics}>
          <p>
            The national estimate of emergency department visits in 2018 is{" "}
            {scrapData.scrapData.forecastEstimate.toLocaleString()} for{" "}
            {scrapData.scrapData.forecastProdName.toLowerCase()}.
          </p>

          <h2 className="emergencyRoomTitle">
            Analysis of Emergency Department Visits
          </h2>
          <Neiss dataChats={dataChats} />
        </div>
      ) : (
        <div className="itemOverview noData">
          <p>
            Unfortunately there is not enough data on this category to generate
            the injuries report.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
