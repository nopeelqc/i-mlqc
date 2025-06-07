document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');
  const logo = document.getElementById('logo');
  const goHomeMobile = document.getElementById('go-home-mobile');
  const homeLink = document.querySelector('nav a[data-section="home"]');
  const typingElement = document.querySelector('.typing');
  const themeToggle = document.getElementById('theme-toggle');
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillContents = document.querySelectorAll('.skill-content');
  const projectCards = document.querySelectorAll('.project-card');
  const audio = document.querySelector('audio');
  const musicToggle = document.getElementById('music-toggle');
  let isTransitioning = false;
  document.addEventListener('click', () => {
    if (audio && audio.paused) {
      audio.play().catch(e => console.error("Không thể bật nhạc:", e));
    }
  }, { once: true });
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      if (isTransitioning) return;
      
      const targetSectionId = link.getAttribute('data-section');
      const targetSection = document.getElementById(targetSectionId);
      const currentSection = document.querySelector('.section.active');

      if (!targetSection || currentSection === targetSection) return;

      isTransitioning = true;
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      currentSection.style.opacity = 0;

      setTimeout(() => {
        currentSection.classList.remove('active');
        currentSection.style.display = 'none';
        targetSection.style.display = 'flex';
        targetSection.classList.add('active');
        requestAnimationFrame(() => {
          targetSection.style.opacity = 1;
        });
        setTimeout(() => { isTransitioning = false; }, 300);
      }, 300);
    });
  });

  if (audio && musicToggle) {
    audio.volume = 1;
    const updateMusicIcon = () => {
      if (audio.paused) {
        musicToggle.classList.remove('music-on');
        musicToggle.classList.add('music-off');
      } else {
        musicToggle.classList.remove('music-off');
        musicToggle.classList.add('music-on');
      }
    };
    musicToggle.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(e => console.error("Không thể bật nhạc:", e));
      } else {
        audio.pause();
      }
    });
    audio.onplay = updateMusicIcon;
    audio.onpause = updateMusicIcon;
    updateMusicIcon();
  }

  if (logo && homeLink) {
    logo.addEventListener('click', () => homeLink.click());
  }
  if (goHomeMobile && homeLink) {
    goHomeMobile.addEventListener('click', () => homeLink.click());
  }

  if (typingElement) {
    const originalText = typingElement.textContent;
    let currentText = '';
    let isDeleting = false;
    const typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000;
    function typeWriter() {
      const fullText = isDeleting ? currentText.slice(0, -1) : originalText.slice(0, currentText.length + 1);
      currentText = fullText;
      typingElement.innerHTML = currentText + '<span class="cursor">|</span>';
      if (!isDeleting && currentText === originalText) {
        setTimeout(() => { isDeleting = true; typeWriter(); }, pauseTime);
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        setTimeout(typeWriter, 500);
      } else {
        setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
      }
    }
    setTimeout(typeWriter, 1000);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      skillTabs.forEach(t => t.classList.remove('active'));
      skillContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  projectCards.forEach(card => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.link-btn')) return;
      card.classList.toggle('overlay-visible');
    });
  });

});