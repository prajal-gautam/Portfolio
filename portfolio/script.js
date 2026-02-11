// Typing Animation
const typingText = document.getElementById('typingText');
const lines = ['Frontend Developer', 'React Enthusiast', 'UI/UX Focused'];
let currentLineIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeAnimation() {
  const currentLine = lines[currentLineIndex];
  
  if (!isDeleting && currentCharIndex === currentLine.length) {
    setTimeout(() => {
      isDeleting = true;
      typeAnimation();
    }, 2000);
    return;
  }

  if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentLineIndex = (currentLineIndex + 1) % lines.length;
    typeAnimation();
    return;
  }

  const nextCharIndex = isDeleting ? currentCharIndex - 1 : currentCharIndex + 1;
  typingText.textContent = currentLine.substring(0, nextCharIndex);
  currentCharIndex = nextCharIndex;

  const speed = isDeleting ? 50 : 100;
  setTimeout(typeAnimation, speed);
}

typeAnimation();

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  
  if (type === 'success') {
    toast.style.backgroundColor = '#22c55e';
  } else if (type === 'error') {
    toast.style.backgroundColor = '#ef4444';
  } else if (type === 'warning') {
    toast.style.backgroundColor = '#eab308';
  }
  
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
  }, 3000);
}

// Resume Download Handler
async function handleDownloadResume() {
  try {
    const res = await fetch('resume.pdf', { method: 'HEAD' });
    if (res.ok) {
      const a = document.createElement('a');
      a.href = 'resume.pdf';
      a.download = 'Prajal_Gautam_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Resume downloaded successfully', 'success');
      return;
    }

    showToast('Resume file is missing. You can contact me from the contact form.', 'warning');
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    showToast('Unable to download resume. Please try again or contact me.', 'error');
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }
}

// Download buttons
document.getElementById('downloadBtn').addEventListener('click', handleDownloadResume);
document.getElementById('heroDownloadBtn').addEventListener('click', handleDownloadResume);

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  if (isDark) {
    document.documentElement.classList.remove('light');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.add('light');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
});

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  isDark = false;
  document.documentElement.classList.add('light');
  themeToggle.textContent = '☀️';
}

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // In a real scenario, you'd send this to a backend
  // For now, we'll just show a success message and open mailto
  const mailtoLink = `https://mail.google.com/mail/?view=cm&to=prajal.gautam.co@gmail.com&su=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  
  window.open(mailtoLink, '_blank');
  showToast('Opening email client...', 'success');
  
  contactForm.reset();
});

// Smooth Scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = entry.target.style.animation || 'none';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Add fade-in class to project cards on scroll
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.style.animation = `fadeIn 0.6s ease-out forwards`;
  card.style.animationDelay = `${index * 0.1}s`;
  card.style.opacity = '0';
});

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.animation = `fillWidth 1.5s ease-out forwards`;
      skillObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Active link highlighting
const navLinks = document.querySelectorAll('nav a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '#cbd5e1';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#60a5fa';
      link.style.fontWeight = '600';
    }
  });
});
