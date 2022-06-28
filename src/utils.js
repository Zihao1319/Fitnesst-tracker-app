import { findAllByTestId } from "@testing-library/react";
import moment from "moment";

//calculating

export function bmiCalculator(weight, height) {
  const bmi = parseFloat(weight) / Math.pow(parseFloat(height), 2);
  return bmi.toFixed(1);
}

export function extractToArr(obj, key) {
  let length = obj.length;
  let arr = [];

  for (let i = 0; i < length; i++) {
    if (key === "date") {
      arr.push(obj[i].date);
    } else if (key === "bmi") {
      arr.push(obj[i].bmi);
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

export function checkFilled(arr) {
  const arrLength = arr.length;
  let result = false;
  for (let i = 0; i < arr.length; i++) {
    let weight = arr[i].weight;
    let reps = arr[i].reps;

    console.log(weight, reps);

    if (weight !== "" && reps !== "") {
      result = true;
    } else {
      result = false;
    }
  }
  return result;
}

export function checkFilled2(obj) {
  console.log(obj);
  let result = false;

  for (const key in obj) {
    let arr = obj[key];
    for (let i = 0; i < arr.length; i++) {
      let weight = arr[i].weight;
      let reps = arr[i].reps;

      console.log(weight, reps);

      if (weight !== "" && reps !== "") {
        result = true;
      } else {
        result = false;
      }
    }
  }

  return result;
}
