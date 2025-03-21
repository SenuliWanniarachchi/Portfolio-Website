 // Typing effect
 const texts = [
  "A Full Stack Developer",
  "A Programmer",
  "A Software Engineering Undergraduate",
  "A Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

function type() {
  const currentText = texts[textIndex];
  const typingElement = document.getElementById('typing-text');

  if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
  } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, newTextDelay);
  } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, typingDelay);
  } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  type();
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitButton = form.querySelector('.submit-btn');
  const successMessage = form.querySelector('.success-message');
  const errorMessage = form.querySelector('.error-message');
  
  // Animation for labels when inputs are focused
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  formInputs.forEach(input => {
    // Check initial state (if prefilled)
    if (input.value.trim() !== '') {
      input.parentElement.classList.add('active');
    }
    
    // Add focus events
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('active');
    });
    
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.parentElement.classList.remove('active');
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide any previous messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
    
    // Change button text and disable while submitting
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    submitButton.disabled = true;
    
    try {
      // Send form using fetch
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success message
        form.reset();
        successMessage.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);
      } else {
        // Show error message
        errorMessage.classList.add('show');
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessage.classList.add('show');
    } finally {
      // Restore button
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }
  });
  
  // Hover effect for contact image info
  const contactCard = document.querySelector('.contact-card');
  const contactInfo = document.querySelector('.contact-info');
  
  if (contactCard) {
    contactCard.addEventListener('mouseenter', () => {
      contactInfo.style.transform = 'translateY(0)';
    });
    
    contactCard.addEventListener('mouseleave', () => {
      contactInfo.style.transform = 'translateY(20px)';
    });
  }
  
  // Animate social icons on scroll
  const socialLinks = document.querySelectorAll('.social-link');
  
  window.addEventListener('scroll', function() {
    const socialSection = document.querySelector('.social-links');
    const position = socialSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (position < screenPosition) {
      socialLinks.forEach((link, index) => {
        setTimeout(() => {
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    }
  });
  
  // Initialize social links with initial state
  socialLinks.forEach(link => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px)';
  });
});