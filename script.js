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
    
    // Set up expand/collapse handlers for each section
    const options = section.querySelectorAll('.function-option');
    
    options.forEach(option => {
      const header = option.querySelector('.option-header');
      
      header.addEventListener('click', () => {
        // Close all other options in this section
        options.forEach(otherOption => {
          if (otherOption !== option) {
            otherOption.classList.remove('expanded');
          }
        });
        
        // Toggle current option
        option.classList.toggle('expanded');
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