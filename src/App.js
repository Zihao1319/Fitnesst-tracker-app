import "./App.css";
import React from "react";
import { bmiCalculator } from "./utils";
import moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      bmi: "",
      message: "",
      currDate: moment().format("LL"),
      bmiRecords: [{ currDate: "", bmi: "" }],
    };
  }

  handleChange = (e) => {
    const input = e.target.value;
    this.setState({
      [e.target.name]: input,
    });
    this.handleSubmit();
    console.log(this.state.height, this.state.weight);
  };

  displayMessage = (value) => {
    // const result = this.state.bmi;

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

  handleSubmit = (e) => {
    e.preventDefault();
    const bmiValue = bmiCalculator(this.state.weight, this.state.height);
    const message = this.displayMessage(bmiValue);
    this.setState({
      bmi: bmiValue,
      message: message,
    });
    console.log("BMI is: " + this.state.bmi);
  };

  saveData = () => {
    //if bmi value is empty, 0 or NaN, don't need to update
    const isEmpty = this.state.bmi === "";
    const isNan = isNaN(this.state.bmi);
    const isNull = this.state.bmi === 0;

    if (isEmpty || isNan || isNull) {
      console.log("BMI value is not in right format");
      return;
    }

    // if the day today is different from the last updated date, don't update
    const length = this.state.bmiRecords.length;
    const isCurrentDay =
      this.state.bmiRecords[length - 1].currDate === this.state.currDate;

    if (isCurrentDay) {
      console.log("BMI value updated");
      return;
    }

    //otherwise run this
    this.setState({
      bmiRecords: [
        ...this.state.bmiRecords,
        { currDate: this.state.currDate, bmi: this.state.bmi },
      ],
    });
    console.log(this.state.bmiRecords[length - 1].currDate);
  };

  render() {
    const bmiResult = this.state.bmi;
    const isFilled = !isNaN(bmiResult);
    const message = this.state.message;

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
              {bmiRecords.currDate}:{bmiRecords.bmi}{" "}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
