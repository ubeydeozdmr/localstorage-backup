document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('a.btn');
  for (let i = 0; i < buttons.length; ++i) {
    const button = buttons[i];
    const functionName = button.getAttribute('data-function');
    const functionBody = window[functionName].toString();
    button.setAttribute('href', 'javascript:(' + functionBody + ')()');
  }
});
