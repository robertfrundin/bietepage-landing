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

  const cursor = document.createElement('div');
  const cursorFollower = document.createElement('div');
  
  cursor.classList.add('cursor');
  cursorFollower.classList.add('cursor-follower');
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let followerX = 0;
  let followerY = 0;
  let isAnimating = true;
  
  // Hide default cursor
  document.body.style.cursor = 'none';
  
  // Update cursor position
  const updateMousePosition = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Ensure cursor stays within viewport
    mouseX = Math.max(0, Math.min(mouseX, window.innerWidth));
    mouseY = Math.max(0, Math.min(mouseY, window.innerHeight));
  };
  
  document.addEventListener('mousemove', updateMousePosition);
  document.addEventListener('mouseenter', updateMousePosition);
  
  // Handle scroll events
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const scrollDiff = window.scrollY - lastScrollY;
    mouseY += scrollDiff;
    lastScrollY = window.scrollY;
  });
  
  // Animation loop
  function animate() {
    if (!isAnimating) return;
    
    // Main cursor - follow more closely
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    // Follower cursor - slightly more delayed
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    // Ensure cursors stay within viewport
    cursorX = Math.max(0, Math.min(cursorX, window.innerWidth));
    cursorY = Math.max(0, Math.min(cursorY, window.innerHeight));
    followerX = Math.max(0, Math.min(followerX, window.innerWidth));
    followerY = Math.max(0, Math.min(followerY, window.innerHeight));
    
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Add hover effects
  const addHoverEffects = (element) => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(1.5)`;
      cursorFollower.style.width = '60px';
      cursorFollower.style.height = '60px';
      cursor.style.borderColor = 'rgba(74, 144, 226, 0.8)';
      cursorFollower.style.borderColor = 'rgba(74, 144, 226, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(1)`;
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
      cursor.style.borderColor = 'rgba(74, 144, 226, 0.5)';
      cursorFollower.style.borderColor = 'rgba(74, 144, 226, 0.3)';
    });
  };
  
  // Add hover effects to existing elements
  document.querySelectorAll('a, button, .function-option').forEach(addHoverEffects);
  
  // Handle dynamically added elements
  const cursorObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          if (node.matches('a, button, .function-option')) {
            addHoverEffects(node);
          }
          node.querySelectorAll('a, button, .function-option').forEach(addHoverEffects);
        }
      });
    });
  });
  
  cursorObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    isAnimating = false;
    cursorObserver.disconnect();
  });
}); 