export const orderByTimestamp = (trackArr) => {
  let dateA;
  let dateB;
  return trackArr.sort((trackA, trackB) => {
    dateA = new Date(trackA.createdAt);
    dateB = new Date(trackB.createdAt);
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });
};
