import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form')

const inputFirstDelay = document.querySelector('input[name="delay"]')

const inputStepDelay = document.querySelector('input[name="step"]')

const inputAmount = document.querySelector('input[name="amount"]')
const btnPromises = document.querySelector('button');
console.log(inputFirstDelay.eventTarget)

const onSubmit = (e) => {
  e.preventDefault();
let delayStep = Number(inputFirstDelay.value);
  for (let i = 1; i < inputAmount.value; i += 1) {
    
  createPromise(i, delayStep)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
   .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
   })
     delayStep += Number(inputStepDelay.value);
}
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
       if (shouldResolve) {
         resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay)
  });
}

   formRef.addEventListener('submit', onSubmit);
