import { NUMBER_OF_DAYS_IN_WEEK, NUMBER_OF_MS_IN_DAY } from '../constants.js';

export const newDate = (date=null) => {
  return date ? new Date(date) : new Date();
};

export const formatDate = (date=null) => {
  return newDate(date).toISOString().split('T')[0]
};

export const addDaysToDate = (numberOfDays, date=null) => {
  return newDate(date) - (-numberOfDays * NUMBER_OF_MS_IN_DAY);
};

export const addWeeksToToday = (numberOfWeeks) => {
  return addDaysToDate(numberOfWeeks * NUMBER_OF_DAYS_IN_WEEK);
};
