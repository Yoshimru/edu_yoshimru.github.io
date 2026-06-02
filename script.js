// Активная ссылка в навигации
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-item');
  const linkMap = {
    'index.html': 'Главная',
    'news.html': 'Новости',
    'sveden.html': 'Сведения'
  };
  navLinks.forEach(link => {
    const text = link.innerText.trim();
    if (linkMap[currentPath] === text || (currentPath === 'index.html' && text === 'Главная')) {
      link.classList.add('active');
    }
  });
});

// Галерея (если есть на странице)
function initGallery() {
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer');
  if (!track || !dotsContainer) return;

  let items = document.querySelectorAll('.gallery-item');

  function updateDots() {
    const scrollLeft = track.scrollLeft;
    const itemWidth = items[0]?.offsetWidth + 20;
    const activeIndex = Math.round(scrollLeft / itemWidth);
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      if (idx === activeIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  function init() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        const gap = 20;
        const width = items[0].offsetWidth;
        track.scrollTo({ left: i * (width + gap), behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    }
    track.addEventListener('scroll', updateDots);
    window.addEventListener('resize', updateDots);
    updateDots();
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      const gap = 20;
      const itemWidth = items[0]?.offsetWidth + gap;
      track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      const gap = 20;
      const itemWidth = items[0]?.offsetWidth + gap;
      track.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });
  }
  init();
}

window.addEventListener('load', initGallery);