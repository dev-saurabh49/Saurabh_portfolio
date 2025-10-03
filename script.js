// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking on a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Create stars
const starsContainer = document.getElementById("stars");
for (let i = 0; i < 200; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  starsContainer.appendChild(star);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Mouse parallax effect
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  document.querySelectorAll(".gradient-orb").forEach((orb, index) => {
    const speed = (index + 1) * 30;
    orb.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
  });

  document.querySelectorAll(".tech-icon").forEach((icon, index) => {
    const speed = (index + 1) * 10;
    icon.style.transform = `translate(${mouseX * speed}px, ${
      mouseY * speed
    }px)`;
  });
});

// Orbs move on scroll
let lastScrollY = 0;
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  const scrollDelta = scrollY - lastScrollY;

  document.querySelectorAll(".gradient-orb").forEach((orb, index) => {
    const speed = (index + 1) * 0.5;
    const currentTransform = orb.style.transform || "translate(0px, 0px)";
    const matches = currentTransform.match(/translate\((.+?)px,\s*(.+?)px\)/);

    if (matches) {
      const currentX = parseFloat(matches[1]) || 0;
      const currentY = parseFloat(matches[2]) || 0;
      orb.style.transform = `translate(${currentX}px, ${
        currentY + scrollDelta * speed
      }px)`;
    }
  });

  lastScrollY = scrollY;
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    nav.style.background = "rgba(5, 8, 22, 0.95)";
    nav.style.boxShadow = "0 10px 30px rgba(0, 255, 135, 0.1)";
  } else {
    nav.style.background = "rgba(5, 8, 22, 0.8)";
    nav.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// 3D tilt effect on profile image
const profileImage = document.querySelector(".profile-image");
if (profileImage) {
  profileImage.addEventListener("mousemove", (e) => {
    const rect = profileImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  profileImage.addEventListener("mouseleave", () => {
    profileImage.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
}

// Scroll indicator click
document.querySelector(".scroll-indicator").addEventListener("click", () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth",
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".section-header, .skill-card, .project-card, .about-content, .about-image-wrapper, .timeline-item, .contact-info, .contact-form-wrapper"
  )
  .forEach((el) => {
    fadeInObserver.observe(el);
  });

// Contact Form Handling with Validation
const contactForm = document.querySelector(".contact-form");
const resultDiv = document.getElementById("result");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate name (minimum 3 characters)
    const name = document.getElementById("name").value.trim();
    if (name.length < 3) {
      resultDiv.className = "error";
      resultDiv.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Name must be at least 3 characters';
      return;
    }

    // Validate email
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      resultDiv.className = "error";
      resultDiv.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Please enter a valid email';
      return;
    }

    // Validate message (minimum 10 characters)
    const message = document.getElementById("message").value.trim();
    if (message.length < 10) {
      resultDiv.className = "error";
      resultDiv.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Message must be at least 10 characters';
      return;
    }

    const submitBtn = contactForm.querySelector(".btn-submit");
    const btnText = submitBtn.querySelector("span");
    const originalText = btnText.textContent;

    submitBtn.disabled = true;
    btnText.textContent = "Sending...";

    const formData = new FormData(contactForm);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          resultDiv.className = "success";
          resultDiv.innerHTML =
            '<i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.';
          contactForm.reset();
        } else {
          resultDiv.className = "error";
          resultDiv.innerHTML =
            '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
        }
      })
      .catch((error) => {
        resultDiv.className = "error";
        resultDiv.innerHTML =
          '<i class="fas fa-exclamation-circle"></i> Network error. Please check your connection.';
      })
      .finally(() => {
        submitBtn.disabled = false;
        btnText.textContent = originalText;

        setTimeout(() => {
          resultDiv.innerHTML = "";
          resultDiv.className = "";
        }, 5000);
      });
  });
}

// Testimonials Slider
const testimonialsWrapper = document.getElementById("testimonialsWrapper");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderDots = document.getElementById("sliderDots");
const slides = document.querySelectorAll(".testimonial-slide");
let currentSlide = 0;
const totalSlides = slides.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.className = "dot";
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  sliderDots.appendChild(dot);
}

function updateSlider() {
  testimonialsWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

testimonialsWrapper.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

testimonialsWrapper.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) {
    nextSlide();
  } else if (touchEndX - touchStartX > 50) {
    prevSlide();
  }
});

const codeLines = [
  `<span class="keyword">&lt;?php</span>`,
  `<span class="variable">$developer</span> = [`,
  `&nbsp;&nbsp;<span class="string">'name'</span> => <span class="string">'Saurabh Pandey'</span>,`,
  `&nbsp;&nbsp;<span class="string">'role'</span> => <span class="string">'Full Stack Developer'</span>,`,
  `&nbsp;&nbsp;<span class="string">'location'</span> => <span class="string">'Lucknow, India'</span>,`,
  `&nbsp;&nbsp;<span class="string">'skills'</span> => [`,
  `&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">'PHP'</span>, <span class="string">'MySQL'</span>, <span class="string">'JavaScript'</span>,`,
  `&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">'Bootstrap'</span>, <span class="string">'Git'</span>`,
  `&nbsp;&nbsp;],`,
  `&nbsp;&nbsp;<span class="string">'passion'</span> => <span class="string">'Clean Code'</span>,`,
  `&nbsp;&nbsp;<span class="string">'status'</span> => <span class="string">'Available for work'</span>`,
  `];`,
  `<span class="keyword">?&gt;</span>`,
];

const editorBody = document.querySelector(".editor-body");
let currentLine = 0;
let currentChar = 0;

function typeWriter() {
  if (currentLine < codeLines.length) {
    let line = codeLines[currentLine];
    if (currentChar <= line.length) {
      editorBody.innerHTML = codeLines.slice(0, currentLine).join('<br>') + '<br>' +
                             line.substring(0, currentChar) + `<span class="cursor-blink"></span>`;
      currentChar++;
      setTimeout(typeWriter, 30); // 30ms delay (faster typing)
    } else {
      currentChar = 0;
      currentLine++;
      setTimeout(typeWriter, 100); // 100ms delay between lines (faster)
    }
  } else {
    editorBody.innerHTML = codeLines.join('<br>') + `<span class="cursor-blink"></span>`;
  }
}


typeWriter();

// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.classList.add("fade-out");
  }, 500);
});

// Backup - agar load event fail ho
setTimeout(() => {
  const preloader = document.querySelector(".preloader");
  if (preloader && !preloader.classList.contains("fade-out")) {
    preloader.classList.add("fade-out");
  }
}, 2000);

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
