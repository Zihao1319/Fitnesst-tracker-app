import "./App.css";
import React from "react";
import { bmiCalculator } from "./utils";
import moment from "moment";
import LChart from "./bmiChart";
import WorkoutPage from "./workoutpage";
import SelectBodyParts from "./SelectBodyParts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      bmi: "",
      message: "",
      // currDate: "June 26, 2022",
      currDate: moment().format("LL"),
      bmiRecords: [
        { date: "Jan 16, 2022", bmi: "21.2" },
        { date: "Feb 16, 2022", bmi: "23" },
        { date: "Mar 23, 2022", bmi: "19.2" },
        { date: "Apr 16, 2022", bmi: "21.2" },
        { date: "May 16, 2022", bmi: "20.2" },
        { date: "June 15, 2022", bmi: "23.2" },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.bmiRecords !== this.state.bmiRecords) {
  //     this.setState({
  //       bmiRecords: this.state.bmiRecords,
  //     });
  //   }
  // }

  handleChange(e) {
    const input = e.target.value;
    this.setState({
      [e.target.name]: input,
    });
    this.handleSubmit();
  }

  displayMessage = (value) => {
    if (value < 18.5) {
      return "You're underweight";
    } else if (value >= 18.5 && value < 25) {
      return "You're normal weight";
    } else if (value >= 25 && value < 30) {
      return "You're overweight";
    } else if (value >= 30) {
      return "You're obese";
    } else {
      return "";
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const bmiValue = bmiCalculator(this.state.weight, this.state.height);
    const message = this.displayMessage(bmiValue);

    this.setState({
      bmi: bmiValue,
      message: message,
    });
  }

  saveData = () => {
    //if bmi value is empty, 0 or NaN, don't need to update
    const isEmpty = this.state.bmi === "";
    const isNan = isNaN(this.state.bmi);
    const isNull = this.state.bmi === 0;

    if (isEmpty || isNan || isNull) {
      console.log("BMI value is not in right format");
      return;
    }

    // if the day today is different from the last updated date, only update the latest bmi value
    const length = this.state.bmiRecords.length;
    const isCurrentDay =
      this.state.bmiRecords[length - 1].date === this.state.currDate;

    if (isCurrentDay) {
      let shallowBmiRecord = [...this.state.bmiRecords];
      let shallowLength = shallowBmiRecord.length;
      let latestPair = { ...shallowBmiRecord[shallowLength - 1] };
      latestPair.bmi = this.state.bmi;
      shallowBmiRecord[shallowLength - 1] = latestPair;

      this.setState({
        bmiRecords: shallowBmiRecord,
      });

      console.log("BMI value updated");
    } else {
      //otherwise run this
      this.setState({
        bmiRecords: [
          ...this.state.bmiRecords,
          {
            date: this.state.currDate,
            bmi: this.state.bmi,
          },
        ],
      });
    }
  };

  render() {
    const bmiResult = this.state.bmi;
    const isFilled = !isNaN(bmiResult);
    const message = this.state.message;
    // console.log(this.state.bmiRecords);

    return (
      <div className="App">
        <h1>BMI calculator</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Height:
            <input
              type="float"
              name="height"
              value={this.state.value}
              placeholder="in (m)"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              name="weight"
              value={this.state.value}
              placeholder="in (kg)"
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" name="submit" value="Calculate" />
        </form>

        {isFilled ? bmiResult : "Please key in the correct value"}
        {isFilled ? message : ""}

        <button onClick={this.saveData}>Save data</button>
        {this.state.bmiRecords.map((bmiRecords, i) => {
          return (
            <div key={i}>
              {" "}
              {bmiRecords.date} : {bmiRecords.bmi}
            </div>
          );
        })}

        <div>
          {/* <LChart chartData={this.state.bmiRecords} /> */}
          {/* <WorkoutPage /> */}
          <br></br>
          <br></br>
          <SelectBodyParts />
        </div>
      </div>
    );
  }
}

export default App;
