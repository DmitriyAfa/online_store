export const calculationRate = (dividend, divisor) => {
  let result = dividend / divisor;
  return (result = result % 1 > 0 ? result.toFixed(1) : result);
};
