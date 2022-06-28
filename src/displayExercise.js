import "./DisplayExercise.css";
import React from "react";
import options from "./options";
import { checkFilled } from "./utils";

class DisplayExercise extends React.Component {
  constructor(props) {
    super(props);
    let items = this.props.workoutRows;

    this.state = {
      workoutRows: items,
      //{ Abs: [{id: 0, exercise: '', weight: '', reps: ''}], Shoulder: [{id: 0, exercise: '', weight: '', reps: ''}]}

      workoutRecords: [],
      savedData: [],
    };
  }

  handleFormChange = (index, bodyParts, event) => {
    // event.preventDefault();
    console.log(index, event);

    // getting a copy of the entire object ie. { Abs: [{id: 0, exercise: '', weight: '', reps: ''}], Shoulder: [{id: 0, exercise: '', weight: '', reps: ''}]}
    let currWorkoutRows = { ...this.state.workoutRows };

    // getting the copy of the array of the clicked bodyparts ie. [{id: 0, exercise: '', weight: '', reps: ''}, [{id: 1, exercise: '', weight: '', reps: ''}...]
    let data = currWorkoutRows[bodyParts];

    //altering the data based on index and target name and assign the key-ed in value
    data[index][event.target.name] = event.target.value;
    console.log(data);

    // reassigning back to the workoutRows
    currWorkoutRows[bodyParts] = data;

    //

    this.setState({
      workoutRows: currWorkoutRows,
    });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted", event);
    this.setState((prev) => ({
      workoutRecords: [...prev.workoutRecords, prev.workoutRows],
    }));
    console.log(this.state);
  };

  addRow = (event) => {
    // getting a copy of the entire object ie. { Abs: [{id: 0, exercise: '', weight: '', reps: ''}], Shoulder: [{id: 0, exercise: '', weight: '', reps: ''}]}
    let currWorkoutRows = { ...this.state.workoutRows };
    // console.log(currWorkoutRows);

    const bodyParts = this.props.input; //receiving body parts like chest, shoulder etc.

    // getting the array of the clicked bodyparts ie. [{id: 0, exercise: '', weight: '', reps: ''}, [{id: 1, exercise: '', weight: '', reps: ''}...]
    const prevRows = currWorkoutRows[bodyParts];
    // console.log(bodyParts, prevRows);

    // if there is no previous rows
    if (prevRows.length === 0) {
      //   console.log("passed");
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
    currWorkoutRows[bodyParts] = prevRows;

    this.setState({
      // workoutRows: currWorkoutRows,
      workoutRows: currWorkoutRows,
    });
    // console.log(this.state);
  };

  handleRemoveRow = (event, index, bodyParts) => {
    console.log(event, index, bodyParts);
    event.preventDefault();
    console.log(bodyParts, this.state.workoutRows[bodyParts]);
    let currWorkoutRows = { ...this.state.workoutRows };
    let toRemoveData = [...currWorkoutRows[bodyParts]];
    toRemoveData.splice(index, 1);
    currWorkoutRows[bodyParts] = toRemoveData;

    this.setState({
      workoutRows: currWorkoutRows,
    });
  };

  saveData = (event, index) => {
    event.preventDefault();
    const bodyParts = this.props.input; //receiving body parts like chest, shoulder etc.

    console.log("save data pressed", event, index, bodyParts);

    let currWorkoutRows = { ...this.state.workoutRows };
    let data = [...currWorkoutRows[bodyParts]];
    console.log(data);

    // this.setState({
    //   workoutRows: currWorkoutRows,
    // });

    // this.setState({});
  };

  render() {
    // console.log(this.state.workoutRows);
    // console.log(selectedExercise);
    // console.log(this.state.workoutRows);

    const bodyParts = this.props.input;
    console.log(this.state.workoutRows);
    console.log(this.state.workoutRows[bodyParts]);
    const isDataFilled = checkFilled(this.state.workoutRows[bodyParts]);
    console.log(bodyParts, isDataFilled);

    // const isArrEmpty = this.state.workoutRows[bodyParts].length == 0;
    // console.log(this.state.workoutRows[bodyParts]);
    return (
      <div>
        <div>
          {/* <form id={bodyParts} onSubmit={(event) => this.handleSubmit(event)}> */}
          <table>
            <thead>
              <tr>
                {" "}
                <th>Exercise for {bodyParts}</th>
              </tr>
            </thead>
            {this.state.workoutRows[bodyParts].map((input, index) => {
              //   console.log(bodyParts, input);
              return (
                <div key={index} id={bodyParts}>
                  <tbody>
                    <tr className="green">
                      {/* <td>{bodyParts}</td> */}
                      <td>Set: {index + 1}</td>
                      {/* <td>
                        <select
                          required
                          name="exercise"
                          id={bodyParts}
                          onChange={(event) =>
                            this.handleFormChange(index, bodyParts, event)
                          }
                          // onChange={this.handleFormChange}
                        >
                          {options.map((option, index) => {
                            return (
                              <option id={index} value={option.value}>
                                {option.label}
                              </option>
                            );
                          })}
                        </select>
                      </td> */}
                      <td>
                        <input
                          type="number"
                          required
                          name="weight"
                          placeholder="Enter weights (kg)"
                          id={bodyParts}
                          value={this.state.workoutRows[bodyParts].weight}
                          onChange={(event) =>
                            this.handleFormChange(index, bodyParts, event)
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
                          id={bodyParts}
                          value={this.state.workoutRows[bodyParts].reps}
                          onChange={(event) =>
                            this.handleFormChange(index, bodyParts, event)
                          }
                        ></input>
                      </td>
                      <td>
                        <button
                          type="submit"
                          onClick={(event) =>
                            this.changeColor(event, index, bodyParts)
                          }
                        >
                          Done
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={(event) =>
                            this.handleRemoveRow(event, index, bodyParts)
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
          </table>
          {/* <button onClick={(event) => this.saveData(event)}>Save</button> */}
          {/* </form> */}
          {}
          <button
            type="button"
            id={bodyParts}
            //   onClick={(event) => this.addRow(event, bodyParts)}
            onClick={this.addRow}
          >
            Add row
          </button>
          <button
            type="submit"
            id={bodyParts}
            disabled={!isDataFilled}
            //   onClick={(event) => this.addRow(event, bodyParts)}
            onClick={this.saveData}
          >
            Save data
          </button>
          {this.state.workoutRows[bodyParts].map((input, index) => {
            return (
              <div key={index}>
                {" "}
                ID: {input.id}
                Weight: {input.weight}
                Reps: {input.reps}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DisplayExercise;
