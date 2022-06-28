import React from "react";
import options from "./options";

class EditOnlyRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>
          <select
            name="exercise"
            onChange={this.handleFormChange}
            defaultValue="Choose an exercise"
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
            name="sets"
            value="sets"
            onChange={this.handleFormChange}
          ></input>
        </td>
        <td>
          <input
            type="number"
            name="weight"
            value="Weight (kg) "
            onChange={this.handleFormChange}
          ></input>
        </td>
        <td>
          <input
            type="number"
            name="reps"
            value="Reps"
            onChange={this.handleFormChange}
          ></input>
        </td>
      </tr>
    );
  }
}

export default EditOnlyRow;
