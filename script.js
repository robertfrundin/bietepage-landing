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
    
    // Set up button click handlers for each section
    const buttons = section.querySelectorAll('.function-option');
    const description = section.querySelector('.function-description');
    
    // Set first button as active by default
    if (buttons.length > 0) {
      buttons[0].classList.add('active');
    }
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons in this section
        buttons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update description with fade effect
        description.style.opacity = '0';
        setTimeout(() => {
          description.textContent = button.dataset.description;
          description.style.opacity = '1';
        }, 300);
      });
    });
  });

  const burger = document.querySelector('.burger');
  const links = document.querySelector('.links');
  const body = document.body;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    links.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      links.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !links.contains(e.target) && links.classList.contains('active')) {
      burger.classList.remove('active');
      links.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
}); 