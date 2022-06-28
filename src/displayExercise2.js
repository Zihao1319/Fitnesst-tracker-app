import "./DisplayExercise.css";
import React from "react";
import options from "./options";
import { checkFilled } from "./utils";

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

  render() {
    // console.log(this.state);
    const bodyParts = this.props.bodyParts;
    const workoutRows = this.props.workoutRows;
    // const isDataFilled = checkFilled(this.state.workoutRows[bodyParts]);

    // console.log(bodyParts);
    // console.log(this.props.workoutRows, "aaa");
    return (
      <div>
        {bodyParts.map((bodyPart, index) => {
          return (
            <table>
              <thead>
                <tr>
                  <th>Exercise for {bodyPart.label}</th>
                </tr>
              </thead>
              {workoutRows[bodyPart.label].map((input, index) => {
                return (
                  <div>
                    <tbody>
                      <tr>
                        <td>Set: {index + 1}</td>
                        <td>
                          <input
                            type="number"
                            required
                            name="weight"
                            placeholder="Enter weights (kg)"
                            id={bodyPart.label}
                            // value={this.state.workoutRows[bodyParts].weight}
                            onChange={(event) =>
                              this.handleFormChange(index, event)
                            }
                            // onChange={this.handleFormChange}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="number"
                            required
                            name="reps"
                            placeholder="Enter reps"
                            id={bodyPart.label}
                            //   value={this.state.workoutRows[bodyParts].reps}
                            onChange={(event) =>
                              this.handleFormChange(index, event)
                            }
                          ></input>
                        </td>
                        <td>
                          <button
                            type="button"
                            //   onClick={(event) =>
                            //     this.changeColor(event, index, bodyParts)
                            //   }
                          >
                            Done
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            id={bodyPart.label}
                            onClick={(event) =>
                              this.handleRemoveRow(event, index)
                            }
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </div>
                );
              })}
              <button type="button" id={bodyPart.label} onClick={this.addRow}>
                Add row
              </button>
            </table>
          );
        })}
      </div>
    );
  }
}

export default DisplayExercise2;
