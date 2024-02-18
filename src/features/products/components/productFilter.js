import React from "react";

export default ({
  handleReportLink,
  reportLinks,
  prdValue,
  handleClick,
  prdLinks,
  disclaimerTrigger,
  dataChatsContent
}) => {
  // Disclaimer renders a div if the product category === "Car Seat"
  function Disclaimer(props) {
    const disclaimer = props.disclaimer;

    if (disclaimer === "Car Seat") {
      return (
        <div id="disclaimer">
          <p>
            <span>DISCLAIMER: </span>Recall.it pulls safety information from
            CPSC which does not cover car seats used in vehicles. To learn more
            about this product’s safety visit:{" "}
            <a
              href="https://www.nhtsa.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.nhtsa.gov
            </a>
          </p>
        </div>
      );
    } else {
      return <div className="hide"></div>;
    }
  }

  const displayRecalls = () => {
    // display main links and sub links
    // data-context attribute holds name of the link
    // when li is clicked pass data-context value to function
    // that responsible to display list of products of data-context value
    // in order to display product list or chart data
    let consumerReport;
    if (reportLinks.length > 0)
      consumerReport = (
        <li
          className="consumer"
          data-context={reportLinks[0].val}
          onClick={(e) => handleClick(e)}
        >
          Incident Reports
        </li>
      );
    return (
      <div>
        <ul className="mainMenu listOfProductBtn">
          <li
            className="category activeFilter"
            data-context={prdLinks[0]}
            onClick={(e) => handleClick(e)}
          >
            Recalls
          </li>
          {dataChatsContent && (<li
            className="emergency"
            data-context="Emergency rooms"
            onClick={(e) => handleClick(e)}
          >
            Injuries
          </li>)}
          {consumerReport}
        </ul>
        <ul className="subLinks listOfProductBtn">
          {prdLinks.map((item, key) => (
            <li
              className={item}
              data-context={item}
              key={key}
              onClick={(e) => handleClick(e)}
            >
              {item}
            </li>
          ))}
        </ul>
        <Disclaimer disclaimer={disclaimerTrigger.disclaimerTrigger} />
      </div>
    );
  };

  const displayChart = () => {
    // display only sub links
    // prdLinks holds array of sub link elements[Product, Category, Manufacturer]
    // prdLinks[0][0] if first element of sub link
    let consumerReport;
    if (reportLinks.length > 0)
      consumerReport = (
        <li
          className="consumer"
          data-context={reportLinks[0].val}
          onClick={(e) => handleClick(e)}
        >
          Incident Reports
        </li>
      );
    return (
      <ul className="mainMenu listOfProductBtn">
        <li
          className="category"
          data-context={prdLinks[0]}
          onClick={(e) => handleClick(e)}
        >
          Recalls
        </li>
          {dataChatsContent && (<li
          className="emergency activeFilter"
          data-context="Emergency rooms"
          onClick={(e) => handleClick(e)}
        >
          Injuries
        </li>)}
        {consumerReport}
      </ul>
    );
  };

  const displayReport = () => {
    // find active links for consumer reports
    let reportSubLinks = reportLinks.map((link, index) => {
      return (
        <li
          className={link.val}
          data-context={link.val}
          onClick={(e) => handleReportLink(e)}
          key={index}
        >
          {link.name}
        </li>
      );
    });
    return (
      <div>
        <ul className="mainMenu listOfProductBtn">
          <li data-context={prdLinks[0]} onClick={(e) => handleClick(e)}>
            Recalls
          </li>
          {dataChatsContent && (<li data-context="Emergency rooms" onClick={(e) => handleClick(e)}>
            Injuries
          </li>)}
          <li className="activeFilter">Incident Reports</li>
        </ul>

        <ul className="subLinks listOfProductBtn">{reportSubLinks}</ul>
        <Disclaimer disclaimer={disclaimerTrigger.disclaimerTrigger} />
      </div>
    );
  };

  const displayLinks = () => {
    // prdValue is current lin
    // based on current link display sub links or main links and sub links together
    // if current link is emergency rooms display
    if (prdValue === "Emergency rooms") return displayChart();
    else if (
      prdValue === "reportBrand" ||
      prdValue === "reportCategory" ||
      prdValue === "reportManufacturer"
    )
      return displayReport();
    else return displayRecalls();
  };

  return <div className="listContainer">{displayLinks()}</div>;
};
