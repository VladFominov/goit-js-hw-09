import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const inputPicker = document.querySelector('#datetime-picker');
const timerRef = document.querySelector('.timer');

const btnStart = document.querySelector('button[data-start]');

const $days = document.querySelector('.value[data-days]');

const $hours = document.querySelector('.value[data-hours]');
const $minutes = document.querySelector('.value[data-minutes]');
const $seconds = document.querySelector('.value[data-seconds]');
btnStart.disabled = true;
let chosenData;
console.log(chosenData)

function timerStart(timerId) {
 const currentDate = new Date();
 const diff = chosenData - currentDate;
 if (diff <= 0) {
   clearInterval(timerId);
   return Notify.info('The time has gone');
 }
 const dayTimer = convertMs(diff);
 
 timerInfo(dayTimer);
 }

const onClick = () => {
  btnStart.setAttribute('disabled', 'disabled');
  inputPicker.setAttribute('disabled', 'disabled');
  timerStart();
  const timerId = setInterval(() => {
   timerStart(timerId);    
}, 1000)
}

btnStart.addEventListener('click', onClick)




const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
         
        const currentDate = new Date();
        const diff = selectedDates[0] - currentDate;
        console.log(selectedDates)

        if (selectedDates[0] < currentDate) {        
        return Notify.failure("Please choose a date in the future")
        } else {
          btnStart.disabled = false;
          chosenData = selectedDates[0];
          console.log(chosenData)
        }
    console.log(convertMs(diff))
  },
};

flatpickr(inputPicker, options)

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function timerInfo( { days, hours, minutes, seconds }) {
  $days.textContent = days
  $hours.textContent = hours;
  $minutes.textContent = minutes;
  $seconds.textContent = seconds; 
}
