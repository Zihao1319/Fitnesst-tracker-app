import React from "react";
import { useLocation, Link } from "react-router-dom";
import LChart from "./bmiChart";
import Typography from "@mui/material/Typography";

import ls from "local-storage";

const DashBoard = () => {
  const location = useLocation();
  const state = location.state;
  const localS = ls.get("bmiRecords");

  console.log(localS);

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
      <LChart chartData={localS} />
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
    </>
  );
};

export default DashBoard;
