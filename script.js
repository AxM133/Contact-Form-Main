document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // Проверка текстовых полей и textarea
    const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
    requiredInputs.forEach((input) => {
      const formGroup = input.closest('.form-group') || input.closest('.checkbox-group');
      if (!input.value.trim()) {
        formGroup.classList.add('invalid');
        isValid = false;
      } else {
        // Дополнительная проверка email
        if (input.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            formGroup.classList.add('invalid');
            isValid = false;
            return;
          }
        }
        formGroup.classList.remove('invalid');
      }
    });

    // Проверка радио (queryType)
    const radios = form.querySelectorAll('input[name="queryType"]');
    const radioGroup = radios[0].closest('.form-group');
    if (![...radios].some(r => r.checked)) {
      radioGroup.classList.add('invalid');
      isValid = false;
    } else {
      radioGroup.classList.remove('invalid');
    }

    // Проверка чекбокса (consent)
    const consent = document.getElementById('consent');
    const checkboxGroup = consent.closest('.checkbox-group');
    if (!consent.checked) {
      checkboxGroup.classList.add('invalid');
      isValid = false;
    } else {
      checkboxGroup.classList.remove('invalid');
    }

    // Если все валидно
    if (isValid) {
      form.reset();

      // Показываем уведомление
      successMessage.style.display = 'flex';

      // Прячем уведомление через 5 секунд
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    }
  });
});
