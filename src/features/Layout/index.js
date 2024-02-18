/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import Logo from "../../components/logo";
import Products from "../products";
import feedbackIcon from "../../assets/images/feedback.png";
import Result from "../../components/result";
import { getData, getDataAll, getSize } from "./utils";
import iconRisky from "../../assets/images/risky.png";
import iconMed from "../../assets/images/medium.png";
import iconNeut from "../../assets/images/neutral.png";
import iconNon from "../../assets/images/none.png";
import iconLoad from "../../assets/images/001gif.gif";
import kid from "../../assets/images/kid.png";
import PopUp from "../feedback/popup";
import "../../assets/css/theme.css"

export default () => {
  const datafetching = useRef(false);
  const datafetched = useRef(false);
  const [displayProductsResult, setDisplayProductsResult] = useState(false);
  const [displayListOfProducts, setDisplayListOfProducts] = useState(false);
  const [productValue, setProductValue] = useState("");
  const [state, setState] = useState({
    productsByName: [],
    productsByType: [],
    productsByManufacturer: [],
  });
  const [disclaimerTrigger, setDisclaimerTrigger] = useState("");
  const [scrapData, setScrapData] = useState({});
  const [requested, setRequested] = useState(false);
  const [framseState, setFrameState] = useState({
    fullscreen: false,
    maxContentHeight: document.body.offsetHeight,
  });
  const [parentIframe, setParentIframe] = useState(null);
  const [parentDisableAutoSize, setParentDisableAutoSize] = useState(false);
  const [icon, setIcon] = useState(iconLoad);
  const [consumReport, setConsumReport] = useState({
    reportName: [],
    reportCategory: [],
    reportManufacturer: [],
  });
  const [displayForm, setDisplayForm] = useState(false);
  const [fromResultPage, setFromResultPage] = useState(false);
  const [displayThanks, setDisplayThanks] = useState(false);
  const [smokeWordsState, setSmokeWordsState] = useState([]);


  if(!datafetched.current && !datafetching.current) {
    (async () => {
      try {
        datafetching.current = true;
        let {
          productsByName,
          productsByType,
          productsByManufacturer,
          dataChatsContent,
          dataChats,
          scrapData,
          reportName,
          reportCategory,
          reportManufacturer,
          disclaimerTrigger,
          smokeWords,
        } = await getDataAll();

        setSmokeWordsState(smokeWords.smoke_words);
  
        setDisclaimerTrigger({
          disclaimerTrigger,
        }); 
  
        setState({
          productsByName,
          productsByType,
          productsByManufacturer,
          dataChatsContent,
          dataChats,
        });
  
        setScrapData({ scrapData });
  
        // set values for each report
        setConsumReport({
          reportName,
          reportCategory,
          reportManufacturer,
        });
  
        //after request is completed
        // change the icon
        setRequested(true);
        if (productsByName.length > 0) {
          setIcon(iconRisky);
        } else if (productsByManufacturer.length > 5 && productsByType.length > 5) {
          setIcon(iconMed);
        } else if (
          productsByName.length === 0 &&
          productsByType.length === 0 &&
          productsByManufacturer.length === 0
        ) {
          setIcon(iconNon);
        } else {
          setIcon(iconNeut);
        }

        datafetched.current = true;
      } catch (e) {
        console.log(e);
      }
    })();
  }

  useEffect(() => {
    window.iFrameResizer = {
      readyCallback: () => {
        setParentIframe(window.parentIFrame);
        window.parentIFrame.getPageInfo((data) => {
          let newHeight = data.clientHeight;
          if (framseState.maxContentHeight !== newHeight) {
            setFrameState({
              ...framseState,
              clientHeight: data.clientHeight,
              maxContentHeight: newHeight,
            });
          }
        });
      },
    };

  }, [framseState, smokeWordsState]);

  useEffect(() => {
    const updateSize = () => {
      if (parentIframe) {
        let estimated = getSize(
          displayProductsResult,
          displayListOfProducts,
          displayForm,
          displayThanks
        );
        parentIframe.size(estimated[0], estimated[1], estimated[2], estimated[3]);
  
        if (parentDisableAutoSize === false) {
          parentIframe.autoResize(false);
          setParentDisableAutoSize(true);
        }
      }
    };  
    updateSize();
  }, [
    displayProductsResult,
    displayListOfProducts,
    displayForm,
    parentDisableAutoSize,
    displayThanks,
    parentIframe,
  ]);

  return (
    <div className="App">
           {(displayProductsResult) && (
            <div
              style={{top:"5px", right:"20px", backgroundColor: "transparent"}}
              className="close-button"
              onClick={() => {
                if (displayProductsResult) {
                  setDisplayProductsResult(false);
                }
                if (displayForm) {
                  setDisplayForm(false);
                }
                if(displayListOfProducts){
                  setDisplayListOfProducts(false);
                }
              }}
            >
               <button className="close-button">X</button>
            </div>)
            }
            {(displayListOfProducts || displayForm) && (
             <div
             style={{top:"127px", right:"35px", backgroundColor: "transparent"}}
               className="close-button"
               onClick={() => {
                 if (displayProductsResult) {
                   setDisplayProductsResult(false);
                 }
                 if (displayForm) {
                   setDisplayForm(false);
                 }
                 if(displayListOfProducts){
                   setDisplayListOfProducts(false);
                 }
               }}
             >
                <button className="close-button">X</button>
             </div>)
             }
      <React.Fragment>
        {displayProductsResult && (
          <Result
            productsByNameNumber={state.productsByName.length}
            productsByTypeNumber={state.productsByType.length}
            productsByManufacturerNumber={state.productsByManufacturer.length}
            dataChatsContent={state.dataChatsContent}
            resultsOff={(val) => {
              setDisplayProductsResult(!displayProductsResult);
              setDisplayListOfProducts(!displayListOfProducts);
              setProductValue(val);
            }}
            consumReport={consumReport}
          />
        )}
       
        {displayListOfProducts && (
          <Products
            prdValue={productValue}
            productsData={[
              state.productsByName,
              state.productsByType,
              state.productsByManufacturer,
            ]}
            dataChatsContent={state.dataChatsContent}
            dataChats={state.dataChats}
            scrapData={scrapData}
            consumReport={consumReport}
            disclaimerTrigger={disclaimerTrigger}
            smokeWords={smokeWordsState}
          />
        )
        }
        <Logo
          showResults={() => {
            setDisplayProductsResult(!displayProductsResult);
            setDisplayListOfProducts(false);
            setDisplayForm(false);
          }}
          requested={requested}
          icon={icon}
        />
        {displayForm && (
          <PopUp
            setDisplayForm={setDisplayForm}
            setDisplayProductsResult={setDisplayProductsResult}
            setDisplayListOfProducts={setDisplayListOfProducts}
            setDisplayThanks={setDisplayThanks}
          />
        )}
        {displayThanks && (
          <div className="thanks">
            <p>Thank you! Redirecting you to the product results...</p>
          </div>
        )}
        {(displayProductsResult || displayListOfProducts || displayForm) && (
          <div>
            <div
              onClick={() => {
                if (displayProductsResult) {
                  setDisplayProductsResult(false);
                }
                if (displayListOfProducts) {
                  setDisplayListOfProducts(false);
                  setDisplayProductsResult(true);
                }
                if (displayForm) {
                  setDisplayForm(false);
                  setDisplayProductsResult(true);
                }
              }}>
              <img
                className="kid"
                src={kid}
                alt="kid-icon"
              />
            </div>
            <div
              className="btn" //feedback-button
              onClick={() => {
                if (displayProductsResult) {
                  setFromResultPage(true);
                }
                if (!displayForm) {
                  setDisplayProductsResult(false);
                  setDisplayListOfProducts(false);
                  setDisplayForm(true);
                } else {
                  setDisplayForm(false);
                  if (fromResultPage) {
                    setDisplayListOfProducts(false);
                    setFromResultPage(false);
                    setDisplayProductsResult(true);
                  } else {
                    setDisplayProductsResult(false);
                    setDisplayListOfProducts(true);
                  }
                }
              }}
            >
              <button className="feedback-button">
                <span class="tooltiptext">send feedback</span>
                <img src={feedbackIcon} alt="feedback-icon" />
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};
