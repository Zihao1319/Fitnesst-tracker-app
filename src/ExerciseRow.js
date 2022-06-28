import React from "react";
import options from "./options";

class ExerciseRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td></td>
        <td>
          <select
            required
            name="workout"
            onChange={(event) => this.handleFormChange}
          >
            {options.map((option, index) => {
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
            required
            name="sets"
            placeholder="Enter sets"
            onChange={(event) => this.handleFormChange()}
          ></input>
        </td>
        <td>
          <input
            type="number"
            required
            name="weights"
            placeholder="Enter weights(kg)"
            onChange={(event) => this.handleFormChange()}
          ></input>
        </td>
        <td>
          <button>X</button>
        </td>
      </tr>
    );
  }
}

export default ExerciseRow;
