export const sliceText = (string, maxLength) => {
  if (string.length > maxLength) {
    return string.slice(0, maxLength - 3) + '...';
  } else {
    return string;
  }
};
