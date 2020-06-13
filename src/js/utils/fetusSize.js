import {
  BASE_NHS_URL,
  START_FIRST_TRIMESTER,
  END_FIRST_TRIMESTER,
  END_SECOND_TRIMESTER,
  END_THIRD_TRIMESTER,
} from '../constants.js';
import { calculateGestationalAge } from './gestationalAge.js';

const calculateTrimester = (week) => {
  if (week < START_FIRST_TRIMESTER || week > END_THIRD_TRIMESTER) {
    return null;
  }
  else if (week <= END_FIRST_TRIMESTER) {
    return '1st';
  }
  else if (week <= END_SECOND_TRIMESTER) {
    return '2nd';
  }
  return '3rd';
};

export const getFetusInfoFromData = (data) => {
  if (data) {
    const trimmedData = data.split('What does my baby look like?</h2>\n<p>')[1];
    if (trimmedData) {
      return trimmedData.split('</p>')[0];
    }
  }

  return null;
};

export const generateNHSUrl = (startDate) => {
  const week = calculateGestationalAge(startDate).weeks;
  const trimester = calculateTrimester(week);

  if (!week || !trimester) {
    return null;
  }
  return `${BASE_NHS_URL}/${trimester}-trimester/week-${week}/`;
};

export const getSourceText = (startDate) => {
  const NHSUrl = generateNHSUrl(startDate);
  return `Source: <a href=${NHSUrl} target="_blank">NHS start4life</a>`;
};

export const getNHSData = (startDate) => {
  return fetch(generateNHSUrl(startDate))
    .then(response => {
      return response.text();
    })
    .catch(() => {
      return null
    });
};
