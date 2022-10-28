const formRef = document.querySelector('.form')

const inputFirstDelay = document.querySelector('input[name="delay"]')

const inputStepDelay = document.querySelector('input[name="step"]')

const inputAmount = document.querySelector('input[name="amount"]')
const btnPromises = document.querySelector('button');
console.log(inputFirstDelay.eventTarget)

const onSubmit = (e) => {
  e.preventDefault();
  for (let i = 0; i < inputAmount.value; i += 1) {
    let delayStep = Number(inputFirstDelay.value) + Number(inputStepDelay.value) * i;
  createPromise(i, delayStep)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
   .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
   })
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

// createPromise()
   formRef.addEventListener('submit', onSubmit);
