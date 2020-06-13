import {
  NUMBER_OF_MS_IN_DAY,
  NUMBER_OF_DAYS_IN_WEEK,
  TOTAL_NUMBER_OF_DAYS_PREGNANT
} from '../constants.js';
import { addDaysToDate, newDate } from './dates.js';

export const calculateStartDate = (dueDate) => {
  return addDaysToDate(-TOTAL_NUMBER_OF_DAYS_PREGNANT, dueDate);
};

export const calculateGestationalAge = (startDate) => {
  const numberOfDaysPregnant = Math.floor(
    (newDate() - newDate(startDate)) / NUMBER_OF_MS_IN_DAY
  );

  return {
    weeks: Math.floor(numberOfDaysPregnant / NUMBER_OF_DAYS_IN_WEEK),
    days: numberOfDaysPregnant % NUMBER_OF_DAYS_IN_WEEK
  };
};

export const getGestationalAgeText = (startDate) => {
  const gestationalAge = calculateGestationalAge(startDate);
  const { weeks, days } = gestationalAge;

  if (days) {
    return `You are ${weeks} weeks and ${days} ${days === 1 ? 'day' : 'days'} pregnant!`;
  }
  return `You are ${weeks} weeks pregnant today!`;
}
