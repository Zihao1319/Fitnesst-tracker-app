import React from "react";

class ReadOnlyRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.workoutData.map((element, i) => (
          <tr id={i}>
            <td>{element.exercise}</td>
            <td>{element.set}</td>
            <td>{element.weight}</td>
            <td>{element.reps}</td>
          </tr>
        ))}
      </>
    );
  }
}

export default ReadOnlyRow;
