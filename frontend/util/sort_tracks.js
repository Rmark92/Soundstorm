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
// return SortUtil.sortByPopularity;
// case 'recent':
// return SortUtil.sortByDate;
// case 'random':
// return SortUtil.sortRandom;

export const toUnsortedList = (trackObj) => {
  if (!trackObj) {
    return [];
  } else {
    return Object.keys(trackObj).map(key => trackObj[key]);
  }
};

export const sortByPopularity = (trackObj) => {
  const trackArr = toUnsortedList(trackObj);
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


export const sortByDate = (trackObj) => {
  let dateA;
  let dateB;
  const trackArr = toUnsortedList(trackObj);
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

export const sortRandom = (trackObj) => {
  return toUnsortedList(trackObj);
};
