const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
const SECONDS_PER_WEEK = SECONDS_PER_DAY * 7;
const SECONDS_PER_MONTH = SECONDS_PER_DAY * 30;
const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365;

const orderedSecondConversions = {
  year: SECONDS_PER_YEAR,
  month: SECONDS_PER_MONTH,
  week: SECONDS_PER_WEEK,
  day: SECONDS_PER_DAY,
  hour: SECONDS_PER_HOUR,
  minute: SECONDS_PER_MINUTE,
  second: 1
};

export const timeSince = (prevTime) => {
  const secondsElapsed = (new Date() - prevTime) / 1000;
  let idx;

  const unit = Object.keys(orderedSecondConversions).find( key => orderedSecondConversions[key] <= secondsElapsed );
  const numUnits = Math.floor(secondsElapsed / orderedSecondConversions[unit]);
  if (!unit) {
    return 'Less than 1 second ago';
  } else if (numUnits === 1) {
    return `1 ${unit} ago`;
  } else {
    return `${numUnits} ${unit}s ago`;
  }
};

export const formatTime = (seconds) => {
  if (!(seconds || seconds === 0)) {
    return '--:--';
  } else {
    const numMinutes = Math.floor(seconds / SECONDS_PER_MINUTE);
    const numSeconds = Math.floor(seconds % SECONDS_PER_MINUTE);
    return String(numMinutes).padStart(2, '0') + ':' + String(numSeconds).padStart(2, '0');
  }
};
