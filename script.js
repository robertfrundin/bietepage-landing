document.addEventListener('DOMContentLoaded', () => {
  // Create the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2 // Trigger when 20% of the element is visible
  });

  // Observe all function sections
  const functionSections = document.querySelectorAll('.function');
  functionSections.forEach(section => {
    observer.observe(section);
  });
}); 