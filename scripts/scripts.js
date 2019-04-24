'use strict';

(function() { 
  const doc = document;
  const formInputs = doc.querySelectorAll('.volders__form__input');
  const formSubmitButton = doc.querySelector('.volders__form__cta');
  const formWrapper = doc.querySelector('.volders__form__wrapper');
  const formTitle = doc.querySelector('.volders__form__title');
  const progressBarTrack = doc.querySelector('.volders__progress-bar__track');
  const progressBarCounter = doc.querySelector('.volders__progress-bar__counter span');

  const submitForm = (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      setNextStep();
    } else {
      displayFormErrors();
    }
  };

  const validateForm = () => {
    let validInputs = 0;

    formInputs.forEach(input => {
      if (input.value !== '') {
        validInputs += 1;
      }
    });

    return validInputs === formInputs.length;
  };

  const setNextStep = () => {
    formWrapper.classList.add('js-done');
    setInnerHtml(formTitle, 'You are almost done');
    progressBarTrack.dataset.progress = 50;
    raiseCounter(progressBarCounter, 50);
  }

  const displayFormErrors = () => {
    formInputs.forEach(input => {
      if (input.value === '') {
        const inputGroup = input.parentElement;
        const errorMessage = inputGroup.querySelector('.volders__form__input-error');
        
        inputGroup.classList.add('js-error');
        setInnerHtml(errorMessage, 'Can\'t be blank');
      }
    });
  };

  const setInnerHtml = (element, htmlString) => {
    element.innerHTML = htmlString;
  }

  const raiseCounter = (element, limit) => {
    const initialValue = parseInt(element.innerHTML);
    const delay = 300/(limit - initialValue);
    let newValue = initialValue + 1;
    
    if (newValue <= 50) {
      setInnerHtml(element, newValue);
      newValue += 1;
      setTimeout(() => {raiseCounter(element, limit)}, delay);
    }
  }
  
  formSubmitButton.addEventListener('click', submitForm);
})();