import React from "react";
import Select from "react-select";
import bodyPartOptions from "./options";
import makeAnimated from "react-select/animated";
import DisplayExercise from "./displayExercise";
import DisplayExercise2 from "./displayExercise2";
import { createRow, checkFilled } from "./utils";

const animatedComponents = makeAnimated();

class SelectBodyParts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
      chosenOptions: [],
      bodyRows: {},
      isDataFilled: false,
      
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

    const rows = this.state.bodyRows
    const rowsLength = selectedOptions.length
    
    // for (let i = 0; i < rowsLength; i++) {
    //   const workout = this.state.selectedOptions[i].label
    //   console.log(workout)
    //   if (workout in rows) {
    //     if (workout.includes(workout))
    //     return

    //   } else {
    //     rows[workout] = []
    //   }

    // }
  
    this.state.selectedOptions.map ((exercise, index) => {
      const workout = exercise.label
    
        if (workout in rows) {
          return
  
        } else {
          rows[workout] = []
        }
        console.log(workout, this.state.bodyRows[workout])
      
    })
    
    this.setState({
      chosenOptions: selectedOptions,
      bodyRows: rows,
    });
    console.log(this.state);
    console.log(this.state.bodyRows)

  }

  // when save workout button is clicked
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("handle form submit");
    // const selectedOptions = this.state.selectedOptions;
    // const rows = createRow(
    //   this.state.selectedOptions,
    //   this.state.selectedOptions.length
    // );

    // this.setState({
    //   chosenOptions: selectedOptions,
    //   bodyRows: rows,
    // });
    console.log(this.state);
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
      isDataFilled: checkFilled(currWorkoutRows)
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
      isDataFilled: checkFilled(currWorkoutRows)
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

  render() {
    const { selectedOptions } = this.state;
    // console.log(this.state.bodyRows);
    // console.log(
    //   createRow(this.state.chosenOptions, this.state.chosenOptions.length)
    // );
    return (
      <React.Fragment>
        What would you like to focus on today?
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <Select
            required="required"
            closeMenuOnSelect={false}
            components={animatedComponents}
            // defaultValue={[bodyPartOptions[0], bodyPartOptions[2]]}
            isMulti
            options={bodyPartOptions}
            isMultiValue={selectedOptions}
            onChange={this.handleChange}
          />

          <button type="submit">Proceed</button>
        </form>
        {/* <form onSubmit={this.handleSubmit}>
          {this.state.chosenOptions.map((input, index) => {
            return (
              <DisplayExercise
                index={index}
                input={input.label}
                workoutRows={createRow(
                  this.state.chosenOptions,
                  this.state.chosenOptions.length
                )}
              />
            );
          })}
        </form> */}
        //{" "}
        <form onSubmit={this.handleFormSubmit}>
          <DisplayExercise2
            bodyParts={this.state.chosenOptions}
            workoutRows={this.state.bodyRows}
            onAddRow={this.addRow}
            onDelRow={this.handleRemoveRow}
            onHandleFormChange={this.handleFormChange}
            onHandleFormSubmit={this.handleFormSubmit}
          />
          <button
            type="submit"
            onClick={this.handleFormSubmit}
            disabled={!this.state.isDataFilled}
          >
            Save Workout!
          </button>
        </form>
        {/* {/* <button onSubmit={this.handleSubmit}>DONE!</button> */}
      </React.Fragment>
    );
  }
}

export default SelectBodyParts;
