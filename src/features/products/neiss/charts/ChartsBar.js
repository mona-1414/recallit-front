import React, { Component} from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './ChartsBar.module.css';

class ChartsBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            chartAges: props.data
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'bottom',
        age: 'Age',
        scale: {
            xAxes: [{
                scaleLabel: {
                    display:true,
                    labelString:'Age'
                },
                stacked: true
            }],
            yAxes: [{
                scaleLabel: {
                    display:true,
                    labelString:'Cases\' Count'
                },
                stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    render(){
        let data = this.state.chartAges();
        if(data === 'undefined'){
            return null;
        }
        return (
            <div className={styles.Container}>
                <div className={styles.Age}>
                    <Bar
                        height={200} 
                        data={data.totalAgesBoysAndGirls}
                        options= {{
                            scales: this.props.scale,
                            legend:{
                                display:this.props.displayLegend,
                                position:this.props.legendPosition
                            },
                            tooltips: {
                                mode: 'x-axis'
                            },
                            title:{
                                display:this.props.displayTitle,
                                text:this.props.age,
                                fontSize:20
                            },
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ChartsBar;