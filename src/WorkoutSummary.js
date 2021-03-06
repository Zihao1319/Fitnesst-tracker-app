import React, { useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import moment from "moment";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import ListItem from "@mui/material/ListItem";

class WorkoutSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.workoutData;
    let workoutNames = Object.keys(data);
    const currDate = moment().format("LL");

    return (
      <TableContainer
        // maxWidth="sm"
        sx={{
          bgcolor: "#e8f5ff",
          p: 2,
          width: "auto",
        }}
      >
        <TableHead> Workouts done on {currDate}: </TableHead>
        {workoutNames.map((workout, index) => {
           
          return (
            <>
              <Box sx={{ mt: 2 }} key={index}>
                {workout}:
              </Box>

              {data[workout]!=="" && data[workout].map((data, index) => {
                return (
                  <ListItem sx={{ display: "list-item", p: 0.5 }}>
                    {data.weight} kg x {data.reps} reps
                  </ListItem>
                );
              })}
            </>
          );
        } )}
      </TableContainer>
    );
  }
}

export default WorkoutSummary;
