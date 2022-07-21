import React from "react";
import "./index.css";
import { bmiCalculator, checkHWData, displayColor } from "./utils";
import moment from "moment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Stack from "@mui/material/Stack";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import Typography from "@mui/material/Typography";
import SuccessAlerts from "./AlertMsg";
import ls from "local-storage";

class BmiComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      weight: 0,
      bmi: "-",
      message: "",
      isDataFilled: false,
      isSaved: false,
      // currDate: "June 26, 2022",
      currDate: moment().format("LL"),
      bmiRecords: ls.get("bmiRecords") || [
        { date: "Jan 16, 2022", bmi: "21.2" },
        { date: "Feb 16, 2022", bmi: "23" },
        { date: "Mar 23, 2022", bmi: "19.2" },
        { date: "Apr 16, 2022", bmi: "21.2" },
        { date: "May 16, 2022", bmi: "20.2" },
        { date: "June 15, 2022", bmi: "23.2" },
      ],
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    let height = this.state.height;
    let weight = this.state.weight;

    if (e.target.name === "height") {
      height = e.target.value;
    }

    if (e.target.name === "weight") {
      weight = e.target.value;
    }

    this.setState({
      [e.target.name]: input,
      isDataFilled: checkHWData(height, weight),
    });

    console.log(this.state);
    // console.log(isEmpty, isNan, isNull);
  };

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

  handleSubmit = (e) => {
    e.preventDefault();
    const bmiValue = bmiCalculator(this.state.weight, this.state.height);
    const message = this.displayMessage(bmiValue);

    this.setState({
      bmi: bmiValue,
      message: message,
    });
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

      this.setState(
        {
          bmiRecords: shallowBmiRecord,
        },
        () => {
          this.submitToDashBoard();
        }
      );
      // ls.set("bmiRecords", this.state.bmiRecords);
      // console.log(ls.get("bmiRecords"));

      console.log("BMI value updated");
    } else {
      //otherwise run this
      this.setState(
        {
          bmiRecords: [
            ...this.state.bmiRecords,
            {
              date: this.state.currDate,
              bmi: this.state.bmi,
            },
          ],
        },
        () => {
          this.submitToDashBoard();
        }
      );
    }
    // this.submitToDashBoard();
    // ls.set("bmiRecords", this.state.bmiRecords);
    // console.log(ls.get("bmiRecords"));
  };

  submitToDashBoard = () => {
    ls.set("bmiRecords", this.state.bmiRecords);
    this.setState({
      isSaved: true,
    });
    console.log(ls.get("bmiRecords"));
  };

  render() {
    const bmiResult = this.state.bmi;
    const isFilled = !isNaN(bmiResult);
    const message = this.state.message;
    // console.log(displayColor(this.state.bmi));
    // const displayColor = displayColor(this.state.bmi);

    // console.log(this.state.bmiRecords);

    return (
      <div>
        <Grid container justify="center" display="flex">
          <Stack sx={{ m: 5 }} spacing={2}>
            <Typography variant="h4" align="center">
              BMI calculator
            </Typography>
            <Box component="div" sx={{ border: 1, p: 4 }}>
              <Grid container justify="center" display="flex">
                <SemiCircleProgressBar
                  stroke={displayColor(this.state.bmi)}
                  animationSpeed={5}
                  percentage={(this.state.bmi / 50) * 100}
                  // style={{ display: "center" }}
                ></SemiCircleProgressBar>
              </Grid>
              <Box
                sx={{
                  fontWeight: "bold",
                  typography: "h4",
                  textAlign: "center",
                  m: 1,
                  color: displayColor(this.state.bmi),
                }}
              >
                Your BMI Index: <br></br>
                {this.state.bmi}
              </Box>
              <Box
                sx={{
                  fontWeight: "bold",
                  typography: "h5",
                  textAlign: "center",
                  m: 1,
                }}
              >
                {" "}
                {this.state.message}
              </Box>

              <Box
                component="form"
                onSubmit={this.handleSubmit}
                sx={{
                  "& .MuiTextField-root": {
                    // display: "grid",
                    m: 1,
                    width: 1,
                    // bgcolor: "#e1fae8",
                    outlineColor: "blue",
                    border: 1,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="filled-height"
                  label="Height (m)"
                  name="height"
                  type="number"
                  // helperText={heightIsWrong ? "Incorrect entry" : " "}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m</InputAdornment>
                    ),
                  }}
                  variant="filled"
                  onChange={this.handleChange}
                />
                <TextField
                  required
                  id="filled-weight"
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  // label= {this.state.}
                  // "Error"
                  // helperText={weightIsWrong ? "Incorrect entry" : " "}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                  variant="filled"
                  onChange={this.handleChange}
                />

                <Box>
                  <Button
                    sx={{
                      backgroundColor: "green",
                      justifyContent: "center",
                      width: 1,
                      alignItems: "center",
                      m: 1,
                    }}
                    variant="contained"
                    size="large"
                    onClick={this.handleSubmit}
                    disabled={!this.state.isDataFilled}
                  >
                    Calculate
                  </Button>
                  <Button
                    sx={{
                      // backgroundColor: "lightblue",
                      justifyContent: "center",
                      width: 1,
                      alignItems: "center",
                      m: 1,
                    }}
                    variant="outlined"
                    size="large"
                    onClick={this.saveData}
                    disabled={
                      this.state.bmi === "-" || !this.state.isDataFilled
                    }
                    color="inherit"
                  >
                    Save Data
                  </Button>
                  {this.state.isSaved === true && <SuccessAlerts />}
                
                </Box>
              </Box>
            </Box>
          </Stack>
        </Grid>
      
      </div>
    );
  }
}

export default BmiComponent;
