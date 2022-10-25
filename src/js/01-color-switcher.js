const btnStart = document.querySelector("button[data-start]");
console.log(btnStart);
const btnStop = document.querySelector("button[data-stop]");
console.log(btnStop);

const body = document.body;

let timerId = null;

const onStartClick = (e) => {
  btnStart.disabled = true;
    timerId = setInterval(() => {
      const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}, 1000)
};

const onStopClick = (e) => {
  clearInterval(timerId);
  btnStart.disabled = false;
};

btnStart.addEventListener('click', onStartClick)
btnStop.addEventListener('click', onStopClick)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


// Напиши скрипт, який після натискання кнопки «Start», 
// раз на секунду змінює колір фону < body > на випадкове значення,
//     використовуючи інлайн стиль.Натисканням на кнопку «Stop» 
// зміна кольору фону повинна зупинятися.
