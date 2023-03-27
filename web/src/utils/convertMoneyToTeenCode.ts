export const convertMoneyToTeenCode = (value: number) => {
  if (value > 1000 && value < 1000000) {
    return `${(value / 1000).toFixed(0)}k`;
  }

  if (value >= 1000000 && value < 1000000000) {
    return `${(value / 1000000).toFixed(0)}m`;
  }

  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(0)}b`;
  }

  return `${value}`;
};
