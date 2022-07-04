import React from "react";
import { useLocation, Link } from "react-router-dom";
import LChart from "./bmiChart";
import Typography from "@mui/material/Typography";
import WorkoutSummary from "./WorkoutSummary";

import ls from "local-storage";

const DashBoard = () => {
  const location = useLocation();
  const state = location.state;
  const bmiRecords = ls.get("bmiRecords");
  const workoutData = ls.get("workoutRecords");
  console.log(bmiRecords);
  console.log(workoutData);

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        sx={{
          m: 3,
        }}
      >
        BMI Index History{" "}
      </Typography>
      <LChart chartData={bmiRecords} />
      {/* {state && (
        <>
          {state.map((bmiRecord, index) => {
            return (
              <div key={index}>
                {" "}
                {bmiRecord.date} : {bmiRecord.bmi}
              </div>
            );
          })}
        </>
      )} */}
      <WorkoutSummary workoutData = {workoutData} />
    </>
  );
};

export default DashBoard;
