const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');
let isTransitioning = false;

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    if (isTransitioning) return;
    isTransitioning = true;
    const targetSectionId = link.getAttribute('data-section');
    if (!targetSectionId) {
      isTransitioning = false;
      return;
    }
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const currentSection = document.querySelector('.section.active');
    const targetSection = document.getElementById(targetSectionId);
    if (!targetSection || currentSection === targetSection) {
      isTransitioning = false;
      return;
    }
    currentSection.style.opacity = 0;
    setTimeout(() => {
      currentSection.classList.remove('active');
      currentSection.style.display = 'none';
      targetSection.style.display = 'flex';
      targetSection.classList.add('active');
      requestAnimationFrame(() => {
        targetSection.style.opacity = 1;
      });
      setTimeout(() => {
        isTransitioning = false;
      }, 1);
    }, 1);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const audio = document.querySelector('audio');
  audio.volume = 0.5;
  const playAudio = () => {
    audio.play().catch(() => {});
    window.removeEventListener('click', playAudio);
    window.removeEventListener('keydown', playAudio);
  };
  window.addEventListener('click', playAudio);
  window.addEventListener('keydown', playAudio);

  const logo = document.getElementById('logo');
  const goHomeMobile = document.getElementById('go-home-mobile');
  const homeLink = document.querySelector('nav a[data-section="home"]');

  if (logo && homeLink) {
    logo.addEventListener('click', () => {
      homeLink.click();
    });
  }

  if (goHomeMobile && homeLink) {
    goHomeMobile.addEventListener('click', () => {
      homeLink.click();
    });
  }
});

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

document.addEventListener('DOMContentLoaded', () => {
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillContents = document.querySelectorAll('.skill-content');
  
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
    
      skillTabs.forEach(t => t.classList.remove('active'));
      skillContents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
});