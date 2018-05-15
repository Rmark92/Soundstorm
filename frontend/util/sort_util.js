// export const orderByTimestamp = (trackArr) => {
//   let dateA;
//   let dateB;
//   return trackArr.sort((trackA, trackB) => {
//     dateA = new Date(trackA.createdAt);
//     dateB = new Date(trackB.createdAt);
//     if (dateA > dateB) {
//       return -1;
//     } else if (dateA < dateB) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
// };
// return SortUtil.sortTracksByPopularity;
// case 'recent':
// return SortUtil.sortByDate;
// case 'random':
// return SortUtil.sortRandom;

// export const toUnsortedList = (obj) => {
//   if (!obj) {
//     return [];
//   } else {
//     return Object.keys(obj).map(key => obj[key]);
//   }
// };

export const sortTracksByPopularity = (trackArr) => {
  // const trackArr = toUnsortedList(trackObj);
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
  // const arr = toUnsortedList(obj);
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

// export const sortRandom = (obj) => {
//   return toUnsortedList(obj);
// };
