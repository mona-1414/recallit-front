import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import {
  scrapCategoryApprox,
  scrapCategoryDetails,
  scrapManufacturerApprox,
  scrapManufacturerDetails,
  scrapTitleDetails,
  scrapboyandgirlValues,
  scrapdiagnosisdispositionValues,
  scrapforecast,
  scrapReportManufacturer,
  scrapReportCategory,
  scrapReportTitle,
  scrapCpscMapping,
  getSmokeWords,
  getAll
} from "../../apis/product";
import { parseQueryString } from "../../utils";

export const getDataAll = async() => {
  let { by, title, category, domain } = parseQueryString();
  let retval = await getAll({
    by: by,
    title: title,
    category: category,
    domain: domain
  });
  return retval.all;
}

export const getData = async () => {
  let { by, title, category, domain } = parseQueryString();

  console.log(parseQueryString());

  let categories = category.split("_").reverse();

  let manufacturerAprox = await scrapManufacturerApprox({
    manufacturer: decodeURI(by),
  });
  let manufacturerDetails = await scrapManufacturerDetails({
    manufacturer: manufacturerAprox.manufacturer_approx,
  });

  let categoryDetails = "";
  let categoryAprox;

  //Find the category using the mapping (scrapCpscMapping)
  try {
    // for (let i = 0; i < categories.length; i++) {
    categoryAprox = await scrapCpscMapping({
      ecommerce_category_path: category,
      ecommerce_platform: domain,
    });

    categoryDetails = await scrapCategoryDetails({
      category: get(categoryAprox, "cpsc_category", ""),
    });

    // if (get(categoryDetails, "results_category", []).length > 0) break;
    if (categoryAprox.success !== true) throw Error("moving to secondApi!");
    // }
  } catch {
    for (let i = 0; i < categories.length; i++) {
      categoryAprox = await scrapCategoryApprox({
        category: decodeURI(categories[i]),
      });
      categoryDetails = await scrapCategoryDetails({
        category: get(categoryAprox, "category_approx", ""),
      });

      if (get(categoryDetails, "results_category", []).length > 0) break;
    }
  }

  //delete duplicate objs
  const uniqData = function (arr) {
    return arr.filter(
      (v, i, a) => a.findIndex((ele) => ele.url === v.url) === i
    );
  };

  let productsByType = uniqData(get(categoryDetails, "results_category", []));
  let productsByManufacturer = uniqData(
    get(manufacturerDetails, "results_manufacturer", [])
  );

  let dataCombined = productsByType.filter((o1) =>
    productsByManufacturer.some((o2) => isEqual(o1, o2))
  );

  //API
  let dataByTitle = await scrapTitleDetails({
    title: decodeURI(title),
    dataCombined: dataCombined,
  });

  let productsByName = get(dataByTitle, "results_title", []);

  let barChartValues = await scrapboyandgirlValues({
    category: get(categoryAprox, "category_approx", category[0]),
  });
  let pieChartValue = await scrapdiagnosisdispositionValues({
    category: get(categoryAprox, "category_approx", category[0]),
  });
  let forecast = await scrapforecast({
    productid: pieChartValue.forecastproductid,
  });

  let scrapData = {
    actual: pieChartValue.actual,
    forecastEstimate: forecast.forecastestimate,
    forecastProdName: forecast.forecastproductname,
  };

  // send post req with manufacturer parameter to get consumer reports by manufacturer
  // if response will come with success === true, return array with consumer reports
  // else return empty array
  let reportManufacturer = await scrapReportManufacturer({
    manufacturer: manufacturerAprox.manufacturer_approx,
  });

  if (reportManufacturer.success === true)
    reportManufacturer = reportManufacturer.results_manufacturer;
  else reportManufacturer = [];

  /* reportName used to be equal to aprox_title, but it would not get a harmonized result, 
	becouse the serach was only on the first word of the title, normally the manufacturer.
	let aprox_title = decodeURI(title).split(" ");*/

  // send post req with "title" parameter to get consumer reports by title
  let reportName = await scrapReportTitle({
    title: decodeURI(title),
  });

  if (reportName.success === true && reportName.count_title !== 0)
    reportName = reportName.results_title;
  else reportName = [];

  // send post req with "category" param to get consum report by category
  let reportCategory = await scrapReportCategory({
    category: categoryAprox.category_approx,
  });

  // declare variable to export and conditionally render the Disclaimer
  let disclaimerTrigger = categoryAprox.category_approx;

  if (reportCategory.success === true)
    reportCategory = reportCategory.results_category;
  else reportCategory = [];

  //get the smoke words to use on filterSmokeWords
  let smokeWords = await getSmokeWords();

  return {
    productsByManufacturer,
    productsByName,
    productsByType,
    dataChats: {
      boysCount: get(barChartValues, "boy_values", ""),
      girlsCount: get(barChartValues, "girl_values", ""),
      diagnosisLabel: get(pieChartValue, ["diagnosis_values", "0"], ""),
      diagnosisData: get(pieChartValue, ["diagnosis_values", "1"]),
      diagnosisColors: get(pieChartValue, ["diagnosis_values", "2"]),
      dispositionLabel: get(pieChartValue, ["disposition_values", "0"]),
      dispositionData: get(pieChartValue, ["disposition_values", "1"]),
      dispositionColors: get(pieChartValue, ["disposition_values", "2"]),
    },
    scrapData,
    reportName,
    reportCategory,
    reportManufacturer,
    disclaimerTrigger,
    smokeWords,
  };
};

export const getSize = (
  displayProductsResult,
  displayListOfProducts,
  displayForm,
  displayThanks
) => {
  if (displayProductsResult || displayThanks) {
    return [250, 460];
  } else if (displayListOfProducts || displayForm) {
    return [780, 500];
  } else return [65, 65];
};

export const filterSmokeWords = (text, smokeWords) => {
  const regex = new RegExp(`(${smokeWords.join("|")})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts
        .filter((part) => part)
        .map((part, i) =>
          regex.test(part) ? (
            <mark key={i}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
    </span>
  );
};
