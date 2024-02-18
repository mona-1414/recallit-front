import { post } from "./httpMethods";

export const scrapCpscMapping = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/cpsc_mapping",
    data
  );
};

export const scrapCategoryApprox = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/category_approx",
    data
  );
};

export const scrapCategoryDetails = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/category_details",
    data
  );
};

export const scrapTitleDetails = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/title_details",
    data
  );
};

export const scrapManufacturerDetails = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/manufacturer_details",
    data
  );
};

export const scrapManufacturerApprox = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/manufacturer_approx",
    data
  );
};

export const scrapboyandgirlValues = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/boyandgirl_values",
    data
  );
};

export const scrapdiagnosisdispositionValues = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/diagnosisdisposition_values",
    data
  );
};

export const scrapforecast = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/forecast_er",
    data
  );
};

export const scrapReportManufacturer = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/incident_manufacturer_details",
    data
  )
};

export const scrapReportTitle = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/incident_title_details",
    data
  );
};

export const scrapReportCategory = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/incident_category_details",
    data
  );
};

export const recordFeedback = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/record_feedback",
    data
  );
};

export const getSmokeWords = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/smoke_words"
  );
};

export const getAll = data => {
  return post(
    "https://app.recall-it.live/api/scraping/get/all",
    data
  )
}

// /scraping/get/incident_manufacturer_details
// /scraping/get/incident_title_details
// /scraping/get/incident_category_details
// parameter: "manufacturer", "title", "category"
