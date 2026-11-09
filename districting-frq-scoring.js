(() => {
  'use strict';
  document.querySelectorAll('.rubric').forEach(rubric => {
    const checks = [...rubric.querySelectorAll('input[type="checkbox"]')];
    const firstBPoint = rubric.querySelector('[data-point="b1"]');
    const secondBPoint = rubric.querySelector('[data-point="b2"]');
    checks.forEach(check => check.addEventListener('change', () => {
      if (check === secondBPoint && check.checked) firstBPoint.checked = true;
      if (check === firstBPoint && !check.checked) secondBPoint.checked = false;
      rubric.querySelector('output').textContent = checks.filter(item => item.checked).length + ' / 4 points checked';
    }));
  });
})();
