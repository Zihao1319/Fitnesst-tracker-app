//creating chart here
import React from "react";
import { Line } from "react-chartjs-2";
import { extractToArr } from "./utils";
import Chart from "chart.js/auto";

class LChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bmiChart">
        <Line
          data={{
            labels: extractToArr(this.props.chartData, "date"),
            datasets: [
              {
                label: "BMI data",
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: extractToArr(this.props.chartData, "bmi"),
              },
            ],
          }}
          options={{
            title: {
              display: true,
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

export default LChart;
