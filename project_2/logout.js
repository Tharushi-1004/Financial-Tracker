document.addEventListener('DOMContentLoaded', function () {
    const redirectHomeButton = document.getElementById('redirectHome');
  
    redirectHomeButton.addEventListener('click', function () {
      window.location.href = 'home_page.html';
    });
  });