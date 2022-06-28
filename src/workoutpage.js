import React from "react";
import ReadOnlyRow from "./readOnly";
import EditOnlyRow from "./editOnly";
import options from "./options";

class WorkoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: options,
      exercise: "",
      set: "",
      weight: "",
      reps: "",
      workoutData: [],
      test: "",
    };
  }

  handleFormChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    this.setState({
      [e.target.name]: input,
    });
    console.log(this.state.workoutData);
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({
      workoutData: [
        ...this.state.workoutData,
        {
          exercise: this.state.exercise,
          set: this.state.set,
          weight: this.state.weight,
          reps: this.state.reps,
        },
      ],
    });
    console.log(this.state.workoutData);
  };

  createNewRow = () => {
    this.setState({
      test: [
        ...this.state.test,
        {
          test: "Test",
        },
      ],
    });
  };

  render() {
    return (
      <div className="workoutlog">
        <h2>Workout log</h2>
        <form>
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Set</th>
                <th>Weight(kg)</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {/* <ReadOnlyRow workoutData={this.state.workoutData} />
              <EditOnlyRow onHandleFormChange={this.handleFormChange} /> */}
            </tbody>
          </table>
        </form>

        <div>
          <br></br>
          <h2>Add a new row:</h2>
          <form onSubmit={this.handleFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Set</th>
                  <th>Weight(kg)</th>
                  <th>Reps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      name="exercise"
                      onChange={this.handleFormChange}
                      defaultValue="Choose an exercise"
                    >
                      {this.state.options.map((option, index) => {
                        return (
                          <option id={index} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="set"
                      placeholder="Sets"
                      onChange={this.handleFormChange}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="weight"
                      placeholder="Weight (kg) "
                      onChange={this.handleFormChange}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="reps"
                      placeholder="Reps"
                      onChange={this.handleFormChange}
                    ></input>
                  </td>
                  <td>
                    <button type="submit">Add row</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div>
          <button onClick={this.createNewRow}>Add Row 2</button>
          {this.state.test}
        </div>
      </div>
    );
  }
}

export default WorkoutPage;
