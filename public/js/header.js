document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const isEnglish = path.includes("/en/");

  const headerHTML = `
    <header>
      <div class="container">
        <div class="hamburger" id="hamburger">☰</div>
        <h1 class="logo">Bek Stones</h1>

        <!-- Masaüstü Menü -->
        <nav class="desktop-nav">
          <ul>
            <li><a href="${isEnglish ? 'index-en.html' : 'index.html'}">${isEnglish ? 'Home' : 'Ana Sayfa'}</a></li>
            <li><a href="${isEnglish ? 'about-en.html' : 'about.html'}">${isEnglish ? 'About Us' : 'Hakkımızda'}</a></li>
            <li><a href="${isEnglish ? 'services-en.html' : 'services.html'}">${isEnglish ? 'Services' : 'Hizmetlerimiz'}</a></li>
            <li><a href="${isEnglish ? 'blog-en.html' : 'blog.html'}">${isEnglish ? 'Blog' : 'Blog'}</a></li>
            <li><a href="${isEnglish ? 'contact-en.html' : 'contact.html'}">${isEnglish ? 'Contact' : 'İletişim'}</a></li>
            <li><a href="${isEnglish ? '../index.html' : 'en/index-en.html'}" class="lang-btn">${isEnglish ? 'TR' : 'EN'}</a></li>
          </ul>
        </nav>

        <!-- Mobil Menü -->
        <nav id="mobileMenu" class="mobile-nav side-nav">
          <ul>
            <li><a href="${isEnglish ? 'index-en.html' : 'index.html'}">${isEnglish ? 'Home' : 'Ana Sayfa'}</a></li>
            <li><a href="${isEnglish ? 'about-en.html' : 'about.html'}">${isEnglish ? 'About Us' : 'Hakkımızda'}</a></li>
            <li><a href="${isEnglish ? 'services-en.html' : 'services.html'}">${isEnglish ? 'Services' : 'Hizmetlerimiz'}</a></li>
            <li><a href="${isEnglish ? 'blog-en.html' : 'blog.html'}">${isEnglish ? 'Blog' : 'Blog'}</a></li>
            <li><a href="${isEnglish ? 'contact-en.html' : 'contact.html'}">${isEnglish ? 'Contact' : 'İletişim'}</a></li>
            <li><a href="${isEnglish ? '../index.html' : 'en/index-en.html'}" class="lang-btn">${isEnglish ? 'TR' : 'EN'}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  // Header'ı yerleştir
  const headerContainer = document.getElementById('header');
  headerContainer.innerHTML = headerHTML;

  // Hamburger menü işlevi
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
    hamburger.innerHTML = mobileMenu.classList.contains('active') ? '✕' : '☰';
  });
});
