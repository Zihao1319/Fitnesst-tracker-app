import React from "react";
import options from "./options";
import ExerciseRow from "./ExerciseRow";

class BodyRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Exercise for {this.props.bodyParts}</th>
            </tr>
          </thead>
          <tbody>
            <ExerciseRow />
          </tbody>
          <button>Add row</button>
        </table>
      </>
    );
  }
}

export default BodyRow;
