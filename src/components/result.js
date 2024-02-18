import React, {useEffect, useState} from "react";
import get from "lodash/get";
import { getData, getDataAll, getSize } from "../features/Layout/utils";

export default ({ consumReport, dataChatsContent, resultsOff, ...props }) => {
  const elements = [
    {
      name: "Product",
      propsName: "productsByNameNumber",
      by: "product"
    },
    {
      name: "Category",
      propsName: "productsByTypeNumber",
      by: "category"
    },
    {
      name: "Manufacturer",
      propsName: "productsByManufacturerNumber",
      by: "manufacturer"
    }
  ];

  const reportsResult = [consumReport.reportName.length, consumReport.reportCategory.length, consumReport.reportManufacturer.length];
  const reportLinks = ["reportBrand", "reportCategory", "reportManufacturer"];
  const [displayProductsResult, setDisplayProductsResult] = useState(false);
  const [parentIframe, setParentIframe] = useState(null);
  const [parentDisableAutoSize, setParentDisableAutoSize] = useState(false);


  useEffect(() => {
    const hoverEffect = () => {
      let products = document.getElementsByClassName("products");
      let emergencyElem = document.getElementsByClassName("emergencyRoom");
      let reports = document.getElementsByClassName("reports");

      if (dataChatsContent) {emergencyElem[0].addEventListener("mouseenter", (e) => {
        emergencyElem[0].style.textDecoration="underline"
      });
  
      emergencyElem[0].addEventListener("mouseleave", (e) => {
        emergencyElem[0].style.textDecoration="none"
      })
      }
  
      for(let i=0; i<products.length; i++){
        if(get(props, elements[i].propsName, "") > 0){
          products[i].addEventListener("mouseenter", () => {
            //add hover effect to this element
            products[i].style.textDecoration="underline"
          });
          products[i].addEventListener("mouseleave", () => {
            //add hover effect to this element
            products[i].style.textDecoration="none"
          })
        }
        if(reportsResult[i] > 0){
          reports[i].addEventListener("mouseenter", () => {
            //add hover effect to this element
            reports[i].style.textDecoration="underline"
          });
          reports[i].addEventListener("mouseleave", () => {
            //add hover effect to this element
            reports[i].style.textDecoration="none"
          });
        }
      }
    }
    hoverEffect();
  },[elements, props, reportsResult]);

  return (
    <div className="resultWindow">
      <div className="resultWrapper">
        {elements.map((item, i) => {
            return  <div key={i+1} className = "test">  
                      <p  
                        className = "productLinks products" 
                        key = {i+2} 
                        data-value = {item.name} 
                        onClick = {e => { 
                          if(get(props, item.propsName, "") > 0) resultsOff(e.target.dataset.value) }
                        }
                      > 
                        Found {get(props, item.propsName, "")} recalls  
                      </p>
                      <span style={{fontSize:"14px"}}>{" "} and {" "}</span>
                      <p    
                        className="productLinks reports"
                        key={i+3} 
                        data-value = { reportLinks[i] } 
                        onClick = { e => {
                          if(reportsResult[i] > 0) resultsOff(e.target.dataset.value)} 
                        }
                      > 
                         {reportsResult[i]} reports by {item.by}
                      </p>
                    </div>
      })}
      {dataChatsContent && (<p  
          id = "neissLink" 
          className = "productLinks emergencyRoom" 
          data-value = "Emergency rooms" 
          onClick = {e => { 
            if(dataChatsContent) resultsOff(e.target.dataset.value) }
          }>
        Click here to learn more about injuries related to this category
      </p>)}
      </div>
    </div>
  );
};
