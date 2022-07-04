import React from "react";
import { useLocation } from "react-router-dom";
import LChart from "./bmiChart";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

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
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      direction="row"
    >
      <Container
        // maxWidth="sm"
        sx={{
          // bgcolor: "#e8f5ff",
          p: 2,
          m: 5,
        }}
      >
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

        <Typography
          variant="h5"
          align="center"
          sx={{
            m: 3,
          }}
        >
          Workout Summary
        </Typography>

        <WorkoutSummary workoutData={workoutData} />
      </Container>
    </Stack>
  );
};

export default DashBoard;
