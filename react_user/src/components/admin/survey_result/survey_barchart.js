import React from 'react';

import Container from 'react-bootstrap/Container';

import CanvasJSReact from "../../../canvasjs/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SurveyBarchar extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			title: props.title,
			rateArray: props.rateArray
        }
		this.createPareto = this.createPareto.bind(this);
    }
    
	componentDidMount(){
		this.createPareto();
	}
	createPareto(){
		
		var dps = [];
		var chart = this.chart;
		var yValue, yTotal = 0 , yPercent = 0;
		for(let i = 0; i < chart.data[0].dataPoints.length; i++)
			yTotal += chart.data[0].dataPoints[i].y;
		for(let i = 0; i < chart.data[0].dataPoints.length; i++){
			yValue = chart.data[0].dataPoints[i].y;
			yPercent = (yValue*100 / yTotal);
			yPercent = Number(yPercent.toPrecision(3));
			dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
		}
		chart.addTo("data", 
				{type:"line", 
				yValueFormatString: "0.##"%"", 
				dataPoints: dps} );
		chart.data[1].set("axisYType", "secondary", false);
		chart.axisY[0].set("maximum", yTotal);
		chart.axisY2[0].set("maximum", 100);
    }
    
	render() {
		const options = {
			title:{
				text: this.state.title
			},
			axisX : {
				title: "Scores"
			},
			axisY: {
				title: "Number of Participants",
				lineColor: "#4F81BC",
				tickColor: "#4F81BC",
				labelFontColor: "#4F81BC"
			},
			axisY2: {
				title: "Percent Score",
				suffix: "%",
				lineColor: "#C0504E",
				tickColor: "#C0504E",
				labelFontColor: "#C0504E"
			},
			data: [{
				type: "column",
				dataPoints: [
					{ label: "5", y: this.state.rateArray[4] },
					{ label: "4", y: this.state.rateArray[3] },
					{ label: "3", y: this.state.rateArray[2] },
					{ label: "2", y: this.state.rateArray[1] },
					{ label: "1", y: this.state.rateArray[0] }
				]
			}]
        }
        
		return (
		<Container>
            <CanvasJSChart 
                options = {options}
				onRef={ref => this.chart = ref}
			/>
		</Container>
		);
	}
}

export default SurveyBarchar; 