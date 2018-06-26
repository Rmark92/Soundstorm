export const sortTracksByPopularity = (trackArr) => {
  let trackAScore;
  let trackBScore;
  return trackArr.sort((trackA, trackB) => {
    trackAScore = trackA.numLikes + trackA.numPlays;
    trackBScore = trackB.numLikes + trackB.numPlays;
    if (trackAScore > trackBScore) {
      return -1;
    } else if (trackAScore < trackBScore) {
      return 1;
    } else {
      return 0;
    }
  });
};


export const sortByDate = (arr) => {
  let dateA;
  let dateB;
  return arr.sort((elA, elB) => {
    dateA = new Date(elA.createdAt);
    dateB = new Date(elB.createdAt);
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });
};
