import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

import styles from "./ChartsPie.module.css";

class ChartsPie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOne: props.data
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
    diagnosis: "Diagnosis",
    disposition: "Disposition",
    year: "CPSC Case Number by Year"
  };

  render() {
    let data = this.state.chartOne();
    if (data === "undefined") {
      return null;
    }
    return (
      <>
        <div className={styles.Container}>
          <div className={styles.Diagnosis}>
            <div id="no-data-diagnosis">Unfortunately there is not enough diagnosis data on this category to generate the injuries report.</div>
            <Pie
              id="diagnosisPieChart"
              height={200}
              data={data.dataDiagnosis}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: this.props.diagnosis,
                  fontSize: 20
                },
                legend: {
                  display: this.props.displayLegend,
                  position: this.props.legendPosition
                },
                animation: {
                  onComplete: function(animation) {
                    var firstSet = animation.chart.config.data.datasets[0].data,
                      dataSum = firstSet.reduce((accumulator, currentValue) => accumulator + currentValue);
              
                    if (typeof firstSet !== "object" || dataSum === 0) {
                      document.getElementById('no-data-diagnosis').style.display = 'block';
                      document.getElementById('diagnosisPieChart').style.display = 'none'
                    }
                  }
                },
                responsive: true
              }}
            />
          </div>
        </div>
        <div className={styles.Container}>
          <div className={styles.Disposition}>
            <div id="no-data-disposition">Unfortunately there is not enough disposition data on this category to generate the injuries report.</div>
            <Pie
              id="dispositionPieChart"
              height={220}
              data={data.dataDisposition}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: this.props.disposition,
                  fontSize: 20
                },
                legend: {
                  display: this.props.displayLegend,
                  position: this.props.legendPosition
                },
                animation: {
                  onComplete: function(animation) {
                    var firstSet = animation.chart.config.data.datasets[0].data,
                      dataSum = firstSet.reduce((accumulator, currentValue) => accumulator + currentValue);
              
                    if (typeof firstSet !== "object" || dataSum === 0) {
                      document.getElementById('no-data-disposition').style.display = 'block';
                      document.getElementById('dispositionPieChart').style.display = 'none'
                    }
                  }
                },
                responsive: true
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ChartsPie;
