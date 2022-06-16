//calculating

export function bmiCalculator(weight, height) {
  const bmi = parseFloat(weight) / Math.pow(parseFloat(height), 2);
  return bmi.toFixed(1);
}
