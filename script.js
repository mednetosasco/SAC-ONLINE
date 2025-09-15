document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement && this.pathname === window.location.pathname) {
        e.preventDefault();
        
        const header = document.querySelector('.header-container');
        const headerHeight = header ? header.offsetHeight : 0;
        const sidebar = document.querySelector('.sidebar');
        const sidebarHeight = (window.innerWidth <= 768 && sidebar) ? sidebar.offsetHeight : 0;
        const offset = headerHeight + sidebarHeight;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Links mailto
  document.querySelectorAll('.mailto-link').forEach(link => {
    link.addEventListener('click', function(event) {
      if (!this.href.includes('mail.google.com')) {
        event.preventDefault();
        const recipients = this.getAttribute('data-recipients');
        const subject = encodeURIComponent(this.getAttribute('data-subject'));
        window.location.href = `mailto:?cc=${recipients}&subject=${subject}`;
      }
    });
  });

  // Expandir/recolher instruções (se aplicável)
  document.querySelectorAll('.instruction-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isActive = content.classList.contains('active');
      document.querySelectorAll('.instruction-content').forEach(c => c.classList.remove('active'));
      if (!isActive) content.classList.add('active');
    });
  });

  // Efeito de digitação no título
  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    typewriterElement.style.animation = 'none';
    setTimeout(() => {
      typewriterElement.style.animation = 'typing 3.5s steps(40, end) forwards, blink-caret 0.75s step-end infinite';
    }, 80);
  }

  // Menu hambúrguer
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
});

// Função de busca
function searchInstructions() {
  let input = document.getElementById("search-bar");
  if (!input) return;
  let q = input.value.trim().toLowerCase();

  let sections = document.querySelectorAll('main section');
  if (!sections || sections.length === 0) return;

  sections.forEach(section => {
    const textContent = section.innerText.toLowerCase();
    if (q === '' || textContent.includes(q)) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}
