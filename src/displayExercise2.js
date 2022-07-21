import React from "react";
import options from "./options";
import { checkFilled } from "./utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { fontSize } from "@mui/system";
import Divider from "@mui/material/Divider";

class DisplayExercise2 extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   workoutRows: this.props.workoutRows,
    //   //{ Abs: [{id: 0, exercise: '', weight: '', reps: ''}], Shoulder: [{id: 0, exercise: '', weight: '', reps: ''}]}
    //   workoutRecords: [],
    //   savedData: [],
    // };
    // console.log(this.state);
  }
  toggleColor = (event) => {
    this.props.onToggleColor(event);
    console.log("toggled color");
  };

  //   toggleColor = () => {
  //     this.setState((prevState) => ({
  //       check: !prevState.check,
  //     }));
  //   };

  //   addRow = (event) => {
  //     console.log(event);
  //     console.log(this.state);
  //     // getting a copy of the entire object ie. { Abs: [{id: 0, exercise: '', weight: '', reps: ''}], Shoulder: [{id: 0, exercise: '', weight: '', reps: ''}]}
  //     let currWorkoutRows = { ...this.props.workoutRows };
  //     console.log(currWorkoutRows);

  //     const bodyPart = event.target.id; //receiving body parts like chest, shoulder etc.
  //     console.log(bodyPart);

  //     // getting the array of the clicked bodyparts ie. [{id: 0, exercise: '', weight: '', reps: ''}, [{id: 1, exercise: '', weight: '', reps: ''}...]
  //     const prevRows = currWorkoutRows[bodyPart];
  //     console.log(bodyPart, prevRows);

  //     // if there is no previous rows
  //     if (prevRows.length === 0) {
  //       //   console.log("no previous row");
  //       prevRows.push({ id: 0, weight: "", reps: "" });
  //     } else {
  //       const length = prevRows.length;

  //       // creating a new ID for the new row
  //       const newId = prevRows[length - 1].id + 1;
  //       const newRow = {
  //         id: newId,
  //         // exercise: "",
  //         weight: "",
  //         reps: "",
  //       };

  //       // [{...}, [{...}], [{id: 2, exercise: '', weight: '', reps: ''}]
  //       prevRows.push(newRow);
  //     }

  //     // reassigning back to the workoutRows
  //     currWorkoutRows[bodyPart] = prevRows;

  //     this.setState({
  //       // workoutRows: currWorkoutRows,
  //       workoutRows: currWorkoutRows,
  //     });
  //     console.log(this.state);
  //   };

  addRow = (event) => {
    this.props.onAddRow(event);
  };

  //   handleRemoveRow = (event, index) => {
  //     event.preventDefault();
  //     console.log(event, index);
  //     const bodyPart = event.target.id; //receiving body parts like chest, shoulder etc.
  //     // console.log(this.state.workoutRows[bodyPart]);
  //     let currWorkoutRows = { ...this.props.workoutRows };
  //     console.log(currWorkoutRows);
  //     let toRemoveData = [...currWorkoutRows[bodyPart]];
  //     console.log(toRemoveData);
  //     toRemoveData.splice(index, 1);
  //     currWorkoutRows[bodyPart] = toRemoveData;

  //     this.setState({
  //       workoutRows: currWorkoutRows,
  //     });
  //   };

  handleRemoveRow = (event, index) => {
    this.props.onDelRow(event, index);

    // event.preventDefault();
    // console.log(event, index);
    // const bodyPart = event.target.id; //receiving body parts like chest, shoulder etc.
    // // console.log(this.state.workoutRows[bodyPart]);
    // let currWorkoutRows = { ...this.props.workoutRows };
    // console.log(currWorkoutRows);
    // let toRemoveData = [...currWorkoutRows[bodyPart]];
    // console.log(toRemoveData);
    // toRemoveData.splice(index, 1);
    // currWorkoutRows[bodyPart] = toRemoveData;

    // this.setState({
    //   workoutRows: currWorkoutRows,
    // });
  };

  handleFormChange = (index, event) => {
    this.props.onHandleFormChange(index, event);
  };

  //   handleFormChange = (index, bodyParts, event) => {
  //     // event.preventDefault();
  //     console.log(index, event);

  //     // getting a copy of the entire object ie. { Abs: [{id: 0, exercise: '', weight: '', reps: ''}], Shoulder: [{id: 0, exercise: '', weight: '', reps: ''}]}
  //     let currWorkoutRows = { ...this.state.workoutRows };

  //     // getting the copy of the array of the clicked bodyparts ie. [{id: 0, exercise: '', weight: '', reps: ''}, [{id: 1, exercise: '', weight: '', reps: ''}...]
  //     let data = currWorkoutRows[bodyParts];

  //     //altering the data based on index and target name and assign the key-ed in value
  //     data[index][event.target.name] = event.target.value;
  //     console.log(data);

  //     // reassigning back to the workoutRows
  //     currWorkoutRows[bodyParts] = data;

  //     //

  //     this.setState({
  //       workoutRows: currWorkoutRows,
  //     });
  //     console.log(this.state);
  //   };

  //   handleFormSubmit = (index, event) => {
  //     this.props.onHandleFormSubmit(index, event);
  //   };

  render() {
    // console.log(this.state);
    const bodyParts = this.props.bodyParts;
    const workoutRows = this.props.workoutRows;
    // const isDataFilled = checkFilled(this.state.workoutRows[bodyParts]);

    // console.log(bodyParts);
    // console.log(this.props.workoutRows, "aaa");
    return (
      <div>
        {/* <form onSubmit={this.handleFormSubmit}> */}
        {bodyParts.map((bodyPart, index) => {
          return (
            <TableContainer sx={{ width: "inherit", mt: 5 }}>
              <Table
                sx={{ minWidth: "inherit" }}
                size="small"
                // aria-label="a dense table"
              >
                <TableHead>
                  <TableRow component="th">{bodyPart.label}</TableRow>
                </TableHead>
                {workoutRows[bodyPart.label].map((input, index) => {
                  return (
                    <div>
                      <TableBody>
                        <TableRow className={this.props.check ? "green" : ""}>
                          <TableCell
                            style={{
                              width: "20%",
                              fontSize: "12pt",
                              textAlign: "center",
                            }}
                          >
                            Set: {index + 1}
                          </TableCell>
                          <TableCell
                            style={{
                              width: "40%",
                              fontSize: "12pt",
                              padding: 4,
                            }}
                          >
                            <TextField
                              type="number"
                              required
                              name="weight"
                              placeholder="Enter kg"
                              id={bodyPart.label}
                              size="small"
                              onChange={(event) =>
                                this.handleFormChange(index, event)
                              }
                            ></TextField>
                          </TableCell>
                          <TableCell
                            style={{
                              width: "40%",
                              fontSize: "1pt",
                              padding: 4,
                            }}
                          >
                            <TextField
                              type="number"
                              required
                              name="reps"
                              placeholder="Enter reps"
                              id={bodyPart.label}
                              size="small"
                              onChange={(event) =>
                                this.handleFormChange(index, event)
                              }
                            ></TextField>
                          </TableCell>
                          {/* <TableCell>
                            <Button
                              type="button"
                              onClick={(event) =>
                                this.toggleColor(event, index)
                              }
                            >
                              Done
                            </Button>
                          </TableCell> */}
                          <TableCell>
                            <Button
                              type="button"
                              id={bodyPart.label}
                              onClick={(event) =>
                                this.handleRemoveRow(event, index)
                              }
                              style={{
                                width: "1%",
                                padding: 1,
                              }}
                            >
                              X
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </div>
                  );
                })}
                <Button type="button" id={bodyPart.label} onClick={this.addRow}>
                  Add row
                </Button>
              </Table>
            </TableContainer>
          );
        })}
        <Divider />
      </div>
    );
  }
}

export default DisplayExercise2;
