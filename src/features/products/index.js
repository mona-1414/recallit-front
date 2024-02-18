import React, { useState, useEffect } from "react";
import get from "lodash/get";
import ProductItem from "./components/productItem";
import ProductFilter from "./components/productFilter";
import Analytics from "./Analytics";
import Reports from "./Reports";
import "./ressources/style.css";

export default ({
  consumReport,
  scrapData,
  prdValue,
  productsData,
  dataChatsContent,
  dataChats,
  disclaimerTrigger,
  smokeWords,
}) => {
  const [productVal, setProductVal] = useState(prdValue);
  const [filterBy, setFilterBy] = useState(productVal);
  const [reportLinks, setReportLinks] = useState([]);
  const [prdLinks, setPrdLinks] = useState([]);
  const [activeLink, setActiveLink] = useState(prdValue);
  const setActiveSubMenu = function (value) {
    const oldLink = document.querySelector(`.activeSubLink`);
    if (oldLink) {
      oldLink.classList.remove("activeSubLink");
    }
    const newLink = document.querySelector(`.${value}`);
    // in case element hasn't loaded yet
    if (newLink) {
      newLink.classList.add("activeSubLink");
    } else {
      setTimeout(() => {
        setActiveSubMenu(value);
      }, 100);
    }
  };

  const getProducts = (value) => {
    setActiveSubMenu(value);
    switch (value) {
      case "Product":
        return get(productsData, "0", []);
      case "Category":
        return get(productsData, "1", []);
      case "Manufacturer":
        return get(productsData, "2", []);
      default:
        return [];
    }
  };
  // returning reports based on active link of consumer report
  const getReports = (reportBy) => {
    setActiveSubMenu(reportBy);
    switch (reportBy) {
      case "reportBrand":
        return consumReport.reportName;
      case "reportCategory":
        return consumReport.reportCategory;
      case "reportManufacturer":
        return consumReport.reportManufacturer;
      default:
        return [];
    }
  };

  // 1. find links that has a result and pass as props to Report component
  // 2. set default link for activeLink variable - when user switches to consumer reports
  // 3. when sub link of reports in clicked change active link state with current target

  const createReportLinks = () => {
    let links = [];
    if (consumReport.reportName.length > 0)
      links.push({ name: "Brand", val: "reportBrand" });
    if (consumReport.reportCategory.length > 0)
      links.push({ name: "Category", val: "reportCategory" });
    if (consumReport.reportManufacturer.length > 0)
      links.push({ name: "Manufacturer", val: "reportManufacturer" });
    setReportLinks(links);
  };

  useEffect(() => {
    createReportLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createProductLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createProductLinks = () => {
    let links = [];
    if (productsData[0].length > 0) links.push("Product");
    if (productsData[1].length > 0) links.push("Category");
    if (productsData[2].length > 0) links.push("Manufacturer");
    setPrdLinks(links);
  };

  //Conditionally render a invisible item to push the results down,
  //avoiding being covered by the disclaimer.
  function PushItem(props) {
    const disclaimer = props.disclaimer;

    if (disclaimer === "Car Seat") {
      return <div className="pushItem"></div>;
    } else {
      return <div className="hide"></div>;
    }
  }

  return (
    <div className="listOfProducts">
      <ProductFilter
        prdLinks={prdLinks}
        handleClick={(e) => {
          setProductVal(e.currentTarget.dataset.context);
          setFilterBy(e.currentTarget.dataset.context);
          setActiveLink(e.currentTarget.dataset.context);
        }}
        handleReportLink={(e) => {
          setActiveLink(e.currentTarget.dataset.context);
          // setActiveSubMenu(e.currentTarget.dataset.context);
        }}
        prdValue={productVal}
        reportLinks={reportLinks}
        disclaimerTrigger={disclaimerTrigger}
        smokeWords={smokeWords}
        dataChatsContent={dataChatsContent}
      />
      {/*if current link is not Neiss return ProductItem component*/}
      {filterBy === "Product" ||
      filterBy === "Category" ||
      filterBy === "Manufacturer" ? (
        <div className="productContainer">
          <PushItem disclaimer={disclaimerTrigger.disclaimerTrigger} />
          {getProducts(filterBy).map((product, key) => (
            <ProductItem
              key={key}
              product={product}
              disclaimerTrigger={disclaimerTrigger}
              smokeWords={smokeWords}
            />
          ))}
        </div>
      ) : filterBy === "reportBrand" ||
        filterBy === "reportCategory" ||
        filterBy === "reportManufacturer" ? (
        <div className="productContainer">
          <PushItem disclaimer={disclaimerTrigger.disclaimerTrigger} />
          {getReports(activeLink).map((report, key) => (
            <Reports key={key} report={report} smokeWords={smokeWords} />
          ))}
        </div>
      ) : (
        dataChatsContent && (
        <div className="productContainer emergencyRoomsContainer">
          <Analytics scrapData={scrapData} dataChats={dataChats} />
        </div>
        )
      )}
    </div>
  );
};
