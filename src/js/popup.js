import {
  SOMETHING_WENT_WRONG_TEXT,
  START_FIRST_TRIMESTER,
  TOTAL_NUMBER_OF_WEEKS_PREGNANT
} from './constants.js';

import { addWeeksToToday, formatDate } from './utils/dates.js';
import { getSourceText, getFetusInfoFromData, getNHSData } from './utils/fetusSize.js';
import { calculateStartDate, getGestationalAgeText } from './utils/gestationalAge.js';

let pregnancyInfoElement = document.getElementById('pregnancy-info');
let pregnancyFormElement = document.getElementById('pregnancy-form');
let dueDateInputElement = document.getElementById('due-date-input');

let gestationalAgeElement = document.getElementById('gestational-age');
let fetusSizeElement = document.getElementById('fetus-size');
let captionElement = document.getElementById('caption');

const addEventListeners = () => {
  let changeDueDateButton = document.getElementById('change-due-date-button');
  changeDueDateButton.addEventListener('click', (e) => {
    e.preventDefault();
    renderPregnancyFormElement();
  });

  pregnancyFormElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const dueDate = e.target[0]['value'];
    const startDate = calculateStartDate(dueDate);

    chrome.storage.sync.set({ startDate });
    renderPregnancyInfoElement(startDate);
  });
};

const renderFetusSizeAndSource = (startDate, fetusSizeText) => {
  fetusSizeElement.innerHTML = fetusSizeText;
  captionElement.innerHTML = getSourceText(startDate);
};

const renderSomethingWentWrong = () => {
  fetusSizeElement.hidden = true;
  captionElement.innerHTML = SOMETHING_WENT_WRONG_TEXT;
};

const renderPregnancyInfoElement = (startDate) => {
  pregnancyFormElement.hidden = true
  pregnancyInfoElement.hidden = false

  gestationalAgeElement.innerHTML = getGestationalAgeText(startDate);

  getNHSData(startDate).then(data => {
    const fetusSizeText = getFetusInfoFromData(data);

    if (fetusSizeText) {
      renderFetusSizeAndSource(startDate, fetusSizeText);
    } else {
      renderSomethingWentWrong();
    }
  })
};

const renderPregnancyFormElement = () => {
  pregnancyInfoElement.hidden = true
  pregnancyFormElement.hidden = false

  const maxDate = addWeeksToToday(
    TOTAL_NUMBER_OF_WEEKS_PREGNANT - START_FIRST_TRIMESTER
  );
  dueDateInputElement.setAttribute('min', formatDate());
  dueDateInputElement.setAttribute('max', formatDate(maxDate));
};

chrome.storage.sync.get('startDate', (data) => {
  addEventListeners();

  const { startDate } = data;
  if (startDate) {
    renderPregnancyInfoElement(startDate);
  } else {
    renderPregnancyFormElement();
  }
});
