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

