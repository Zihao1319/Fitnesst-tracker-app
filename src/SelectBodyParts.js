import React from "react";
import Select from "react-select";
import bodyPartOptions from "./options";
import makeAnimated from "react-select/animated";
import DisplayExercise2 from "./displayExercise2";
import { checkFilled, extractToArr } from "./utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ls from "local-storage";
import SuccessAlerts from "./AlertMsg";

const animatedComponents = makeAnimated();

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

class SelectBodyParts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      chosenOptions: [],
      bodyRows: {},
      isDataFilled: false,
      check: false,
      displayData: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(selectedOptions) {
    this.setState({
      selectedOptions,
    });
  }

  // when proceed button is clicked
  handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    const selectedOptions = this.state.selectedOptions;
    // const rows = createRow(
    //   this.state.selectedOptions,
    //   this.state.selectedOptions.length
    // );

    const rows = this.state.bodyRows;
    console.log(rows);

    this.state.selectedOptions.map((exercise, index) => {
      const workout = exercise.label;

      // creating workouts in the rows to be displayed
      if (workout in rows) {
        return;
      } else {
        rows[workout] = [];
      }
      console.log(workout, this.state.bodyRows[workout]);
    });

    const selectedOptionsArr = extractToArr(selectedOptions, "label");
    const rowKeys = Object.keys(rows);
    const rowLength = rowKeys.length;

    // delete any workoutRows that have been removed
    for (let i = 0; i < rowLength; i++) {
      if (!selectedOptionsArr.includes(rowKeys[i])) {
        console.log(rowKeys[i], "has to be removed");
        delete rows[rowKeys[i]];
      }
    }

    this.setState({
      chosenOptions: selectedOptions,
      bodyRows: rows,
    });
    console.log(this.state);
  }

  // when save workout button is clicked
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("handle form submit");
    const displayData = this.state.bodyRows;

    this.setState(
      {
        displayData: displayData,
        // bodyRows: {},
        // selectedOptions: [],
        // chosenOptions: [],
        // isDataFilled: false,
      },
      () => {
        this.submitToDashBoard();
      }
    );

    this.reset();
    console.log(this.state.displayData);
  };

  submitToDashBoard = () => {
    ls.set("workoutRecords", this.state.displayData);
    console.log(ls.get("workoutRecords"));
  };

  reset = (e) => {
    this.setState({
      bodyRows: {},
      selectedOptions: [],
      chosenOptions: [],
      isDataFilled: false,
    });
  };

  // setRows = (event) => {
  //   const rows = createRow(
  //     this.state.chosenOptions,
  //     this.state.chosenOptions.length
  //   );

  //   this.setState({
  //     bodyRows: rows,
  //   });
  //   console.log(this.state);
  // };

  addRow = (event) => {
    console.log(event);
    console.log(this.state);
    // getting a copy of the entire object ie. { Abs: [{id: 0, exercise: '', weight: '', reps: ''}], Shoulder: [{id: 0, exercise: '', weight: '', reps: ''}]}
    let currWorkoutRows = { ...this.state.bodyRows };
    console.log(currWorkoutRows);

    const bodyPart = event.target.id; //receiving body parts like chest, shoulder etc.
    console.log(bodyPart);

    // getting the array of the clicked bodyparts ie. [{id: 0, exercise: '', weight: '', reps: ''}, [{id: 1, exercise: '', weight: '', reps: ''}...]
    const prevRows = currWorkoutRows[bodyPart];
    console.log(bodyPart, prevRows);

    // if there is no previous rows
    if (prevRows.length === 0) {
      //   console.log("no previous row");
      prevRows.push({ id: 0, weight: "", reps: "" });
    } else {
      const length = prevRows.length;

      // creating a new ID for the new row
      const newId = prevRows[length - 1].id + 1;
      const newRow = {
        id: newId,
        // exercise: "",
        weight: "",
        reps: "",
      };

      // [{...}, [{...}], [{id: 2, exercise: '', weight: '', reps: ''}]
      prevRows.push(newRow);
    }

    // reassigning back to the workoutRows
    currWorkoutRows[bodyPart] = prevRows;

    this.setState({
      // workoutRows: currWorkoutRows,
      bodyRows: currWorkoutRows,
      isDataFilled: checkFilled(currWorkoutRows),
    });
    // console.log("added new row", this.state);
  };

  handleRemoveRow = (event, index) => {
    event.preventDefault();
    console.log(event, index);
    const bodyPart = event.target.id; //receiving body parts like chest, shoulder etc.
    // console.log(this.state.workoutRows[bodyPart]);
    let currWorkoutRows = { ...this.state.bodyRows };
    console.log(currWorkoutRows);
    let toRemoveData = [...currWorkoutRows[bodyPart]];
    console.log(toRemoveData);
    toRemoveData.splice(index, 1);
    currWorkoutRows[bodyPart] = toRemoveData;

    this.setState({
      bodyRows: currWorkoutRows,
      isDataFilled: checkFilled(currWorkoutRows),
    });
    // console.log("delete row",this.state )
  };

  handleFormChange = (index, event) => {
    // event.preventDefault();
    console.log(index, event);

    // getting a copy of the entire object ie. { Abs: [{id: 0, exercise: '', weight: '', reps: ''}], Shoulder: [{id: 0, exercise: '', weight: '', reps: ''}]}
    let currWorkoutRows = { ...this.state.bodyRows };

    const bodyPart = event.target.id; //receiving body parts like chest, shoulder etc.

    // getting the copy of the array of the clicked bodyparts ie. [{id: 0, exercise: '', weight: '', reps: ''}, [{id: 1, exercise: '', weight: '', reps: ''}...]
    let data = currWorkoutRows[bodyPart];

    //altering the data based on index and target name and assign the key-ed in value
    data[index][event.target.name] = event.target.value;
    console.log(data);

    // reassigning back to the workoutRows
    currWorkoutRows[bodyPart] = data;

    this.setState({
      bodyRows: currWorkoutRows,
      isDataFilled: checkFilled(currWorkoutRows),
    });
    console.log("handleformchange", this.state);
  };

  // toggleColor = (index, event) => {
  //   this.setState((prevState) => ({
  //     check: !prevState.check,
  //   }));
  //   console.log(this.state.check);
  // };

  render() {
    const { selectedOptions } = this.state;
    // console.log(this.state.bodyRows);
    // console.log(
    //   createRow(this.state.chosenOptions, this.state.chosenOptions.length)
    // );
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="row"
          >
            <Container
              maxWidth="sm"
              sx={{
                bgcolor: "#e8f5ff",
                p: 2,
                m: 5,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{
                  m: 3,
                }}
              >
                What would you like to work on today?
              </Typography>
              <Grid item>
                <Box component="form" onSubmit={this.handleSubmit}>
                  <Select
                    required="required"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    label="What would you like to focus on today?"
                    isMulti
                    options={bodyPartOptions}
                    isMultiValue={selectedOptions}
                    onChange={this.handleChange}
                    variant="outlined"
                    autoWidth="true"
                  />
                  <Button
                    type="submit"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Proceed
                  </Button>
                </Box>
              </Grid>
              <Grid>
                <Box
                  component="form"
                  onSubmit={this.handleFormSubmit}
                  sx={{
                    fontWeight: "bold",
                    typography: "h5",
                    textAlign: "center",
                    m: 1,
                    t: 2,
                  }}
                >
                  {/* <form onSubmit={this.handleFormSubmit}> */}
                  <DisplayExercise2
                    bodyParts={this.state.chosenOptions}
                    workoutRows={this.state.bodyRows}
                    onAddRow={this.addRow}
                    onDelRow={this.handleRemoveRow}
                    onHandleFormChange={this.handleFormChange}
                    onHandleFormSubmit={this.handleFormSubmit}
                    onToggleColor={this.toggleColor}
                    check={this.state.check}
                  />
                  <Button
                    type="submit"
                    onClick={this.handleFormSubmit}
                    disabled={!this.state.isDataFilled}
                  >
                    Save Workout!
                  </Button>
                  {this.state.displayData && <SuccessAlerts />}
                </Box>
              </Grid>
            </Container>
          </Stack>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default SelectBodyParts;
