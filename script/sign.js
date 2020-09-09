document.addEventListener('DOMContentLoaded', () => {
  const signUp = document.getElementById('signUp');
  const signIn = document.getElementById('signIn');
  const forgot = document.getElementById('forgot');

  signUp.addEventListener('click', (e) => {
    e.preventDefault();
    $('.sign-up-container').classList.add('d-block');
    $('.sign-in-container').classList.add('d-none');

    $('.sign-in-container').classList.remove('d-block');
    $('.sign-up-container').classList.remove('d-none');
  });

  signIn.addEventListener('click', (e) => {
    e.preventDefault();
    $('.sign-up-container').classList.add('d-none');
    $('.sign-in-container').classList.add('d-block');

    $('.sign-up-container').classList.remove('d-block');
    $('.sign-in-container').classList.remove('d-none');
  });

  forgot.addEventListener('click', (e) => {
    e.preventDefault();
    $('.sign-in-container').classList.add('d-none');
    $('.forgot-container').classList.add('d-block');

    $('.sign-in-container').classList.remove('d-block');
    $('.forgot-container').classList.remove('d-none');
  });
});
