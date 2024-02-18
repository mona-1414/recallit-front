import React, { Component, Fragment } from "react";
import ChartsPie from "./charts/ChartsPie";
import ChartsBar from "./charts/ChartsBar";

class Neiss extends Component {
  //METHOD TO BUILD AGE CHART DATA
  chartAgeGetData = () => {
    const chartAges = {
      totalAgesBoysAndGirls: {
        datasets: [
          {
            data: this.props.dataChats.girlsCount,
            backgroundColor: "#FFD202",
            label: "Count Of Girls' Cases",
            borderColor: "rgba(15, 50, 64, .8)",
            borderWidth: 0.5,
          },
          {
            data: this.props.dataChats.boysCount,
            backgroundColor: "#0085C3",
            label: "Count Of Boys' Cases",
            borderColor: "rgba(15, 50, 64, .8)",
            borderWidth: 0.5,
          },
        ],

        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      },
    };
    return chartAges;
  };
  //MOTHOD TO BUILD DIAGNOSIS AND DISPOSITION DATA
  getPieChartsData = () => {
    const dataChart = {
      dataDiagnosis: {
        labels: this.props.dataChats.diagnosisLabel,
        datasets: [
          {
            label: "Diagnosis",
            data: this.props.dataChats.diagnosisData,
            backgroundColor: this.props.dataChats.diagnosisColors,
            borderColor: "rgba(15, 50, 64, .8)",
            borderWidth: 0.5,
          },
        ],
      },
      dataDisposition: {
        labels: this.props.dataChats.dispositionLabel,
        datasets: [
          {
            label: "Disposition",
            data: this.props.dataChats.dispositionData,
            backgroundColor: this.props.dataChats.dispositionColors,
            borderColor: "rgba(15, 50, 64, .8)",
            borderWidth: 0.5,
          },
        ],
      },
    };
    return dataChart;
  };
  // checking if this.getPieChartsData has data, otherwise render nothing
  render() {
    return (
      <Fragment>
        {this.getPieChartsData !== false ? (
          <Fragment>
            <ChartsPie data={this.getPieChartsData} />
            <ChartsBar data={this.chartAgeGetData} />
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}
export default Neiss;
