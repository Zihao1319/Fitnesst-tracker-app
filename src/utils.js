import { findAllByTestId } from "@testing-library/react";
import moment from "moment";

//calculating

export function bmiCalculator(weight, height) {
  const bmi = parseFloat(weight) / Math.pow(parseFloat(height), 2);
  return bmi.toFixed(1);
}

export function extractToArr(obj, key) {
  console.log(obj);
  let length = obj.length;
  let arr = [];

  for (let i = 0; i < length; i++) {
    if (key === "date") {
      arr.push(obj[i].date);
    } else if (key === "bmi") {
      arr.push(obj[i].bmi);
    } else if (key === "label") {
      arr.push(obj[i].label);
    }
  }
  // console.log(arr);
  return arr;
}

export function createRow(obj, num) {
  let hash = {};

  for (let i = 0; i < num; i++) {
    let workoutTemplate = [];

    hash[obj[i].label] = workoutTemplate;
  }
  // console.log(hash);
  return hash;
}

// export function checkFilled(arr) {
//   const arrLength = arr.length;
//   let result = false;
//   for (let i = 0; i < arr.length; i++) {
//     let weight = arr[i].weight;
//     let reps = arr[i].reps;

//     console.log(weight, reps);

//     if (weight !== "" && reps !== "") {
//       result = true;
//     } else {
//       result = false;
//     }
//   }
//   return result;
// }

export function checkFilled(obj) {
  console.log(obj);
  let result = false;

  for (const key in obj) {
    let arr = obj[key];
    for (let i = 0; i < arr.length; i++) {
      let weight = arr[i].weight;
      let reps = arr[i].reps;

      // console.log(obj[key], weight, reps);

      if (weight !== "" && reps !== "") {
        result = true;
      } else {
        result = false;
        return result;
      }
    }
  }

  return result;
}

export function checkHWData(height, weight) {
  let result = false;

  if (height > 0 && weight > 0) {
    result = true;
  } else {
    result = false;
    console.log(result);
    return result;
  }
  console.log(result);
  return result;
}

export function displayColor(value) {
  if (value < 18.5) {
    return "blue";
  } else if (value >= 18.5 && value < 25) {
    return "green";
  } else if (value >= 25 && value < 30) {
    return "#adb012";
  } else if (value >= 30) {
    return "red";
  } else {
    return "lightgrey";
  }
}
