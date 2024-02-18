import _ from 'lodash';

//HELPER TO BUILD UNIQUE AND COUNT OF CATEGORIES
export const uniqAndCountFunc = (arrFilteredTerm, strCriteria) => {
    let uniqueLabels = [];
    let countOfUniqueCases = [];
    let countTotalByLineOfStrCriteria = [];
    let countByLineMap =[];
   
    if(arrFilteredTerm.length > 0){
        uniqueLabels = _.uniq(_.map(arrFilteredTerm, strCriteria)).sort((a,b)=>a-b);
        //ENTIRE ARRAY OF PRESENT DIAGNOSIS WITHIN AN ARRAY OF SUGGESTIONS
        countTotalByLineOfStrCriteria = arrFilteredTerm.map(el => el[strCriteria]);

        //RETRIEVE COUNT OF EACH UNIQUE DIAGNOSIS PER AN ARRAY OF SUGGESTIONS
        countByLineMap =_.countBy(countTotalByLineOfStrCriteria);
        countOfUniqueCases = _.values(countByLineMap);
    }
    return [countOfUniqueCases, uniqueLabels];
};

//HELPER TO BUILD FINAL DATA INCLUDING GROUP "OTHER"
export const groupOtherFunc = (countArr, labelArr) =>{
    let data=[];
    let labels=[];
    let otherGroup=[];
    let sorted=[];
    let result =[];

    //10 PERSENT FORMULA TO ACCOUNT FOR UNDER 10% OF THE CATEGORIES?
    let tenPer = (countArr.reduce((a,b)=> a+b)) * 0.1;

    let arrOfCounts =[];
    let arrOfLabels=[];

    //BUILDING ARRAYS OF COUNTS AND LABELS WHICH ARE MORE THEN 10% OF THE CATEGORIES
    for(let i = 0; i < countArr.length; ++i){
        if(countArr[i] >= tenPer){
            arrOfCounts.push(countArr[i]);
            arrOfLabels.push(labelArr[countArr.indexOf(countArr[i])]);
        }
    }

    if(countArr.length > 0 && arrOfCounts.length > 0){
        //BUILDING OTHER GROUP OF CATEGORIES(GROUP WHICH LESS THEN 10% OF TOTAL COUNT
        otherGroup = countArr.reduce((a,b)=> a+b) - arrOfCounts.reduce((a,b)=>a+b);

        //UPDATE ARRAYS WITH 'OTHER' GROUP
        arrOfCounts.push(otherGroup);
        for(let j in labelArr){
            if(labelArr[j] > 10){
                arrOfLabels.push(71);
                //CREATE OBJECT KEY/VALUE FROM ARR OF COUNTS AND LABELS
                result = _.zipObject(arrOfLabels, arrOfCounts);

                //CONVERTING RESULT OBJ INTO AN ARRAY, WHICH CONTAINS SUBARRAYS, AND SORT BASED ON COUNTS IN DESCENDING ORDER
                sorted = _.toPairs(result).sort((a,b)=> b[1] - a[1]);

                //FINAL DIAGNOSIS DATA TO RENDER INTO THE CHAR
                data= sorted.map(el => el[1]);

                //FINAL DIAGNOSIS LABEL TO RENDER INTO THE CHAR
                labels = sorted.map(el => el[0]);
                return [labels, data];

            }else{
                arrOfLabels.push(9);
                //CREATE OBJECT KEY/VALUE FROM ARR OF COUNTS AND LABELS
                result = _.zipObject(arrOfLabels, arrOfCounts);

                //CONVERTING RESULT OBJ INTO AN ARRAY, WHICH CONTAINS SUBARRAYS, AND SORT BASED ON COUNTS IN DESCENDING ORDER
                sorted = _.toPairs(result).sort((a,b)=> b[1] - a[1]);

                //FINAL DIAGNOSIS DATA TO RENDER INTO THE CHAR
                data= sorted.map(el => el[1]);

                //FINAL DIAGNOSIS LABEL TO RENDER INTO THE CHAR
                labels = sorted.map(el => el[0]);
                return [labels, data];
            }

        }
    }
};

//HELPER TO LABBLE
export const helperToLable = (arrOfLabels, arrofAllCodes) => {
    let keys = Object.keys(arrofAllCodes);

    let labaledResult = [];
    for(let i in arrOfLabels){
        for(let j in keys){
            if(arrOfLabels[i] === keys[j]){
                labaledResult.push(arrofAllCodes[keys[j]]);
            }
        }
    }
    return labaledResult;
};



