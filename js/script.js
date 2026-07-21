document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     1. MOBILE MENU TOGGLE
  ========================================================= */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      mobileMenu.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = mobileMenu.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        mobileMenu.classList.remove("show");
      }
    });

    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
      });
    });
  }

  /* =========================================================
     2. PACKAGE TABS SMOOTH SCROLL
  ========================================================= */
  const tabButtons = document.querySelectorAll(".tab-btn");

  if (tabButtons.length) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const targetId = button.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const navOffset = 90;
          const targetPosition =
            targetSection.getBoundingClientRect().top +
            window.pageYOffset -
            navOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  }

  /* =========================================================
     3. FADE-IN ON SCROLL
  ========================================================= */
  const fadeItems = document.querySelectorAll(".fade-in");

  if (fadeItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    fadeItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
      observer.observe(item);
    });
  }

  /* =========================================================
     4. ANNOUNCEMENT STRIP IDLE CONTROL
  ========================================================= */
  const announcementTrack = document.querySelector(".announcement-track");
  let idleTimer;

  function pauseAnnouncement() {
    if (announcementTrack) {
      announcementTrack.style.animationPlayState = "paused";
    }
  }

  function resumeAnnouncement() {
    if (announcementTrack) {
      announcementTrack.style.animationPlayState = "running";
    }
  }

  function resetIdleTimer() {
    pauseAnnouncement();
    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {
      resumeAnnouncement();
    }, 2500);
  }

  if (announcementTrack) {
    ["mousemove", "keydown", "scroll", "click", "touchstart"].forEach((eventType) => {
      document.addEventListener(eventType, resetIdleTimer, { passive: true });
    });

    resumeAnnouncement();
  }

  /* =========================================================
     5. PACKAGE CARD MICRO-INTERACTION
  ========================================================= */
  const packageCards = document.querySelectorAll(".package-card");

  if (packageCards.length) {
    packageCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.willChange = "transform, box-shadow";
      });

      card.addEventListener("mouseleave", () => {
        card.style.willChange = "auto";
      });
    });
  }

  /* =========================================================
     6. ACCESSIBILITY: ESC KEY CLOSES MOBILE MENU
  ========================================================= */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu) {
      mobileMenu.classList.remove("show");
    }
  });

  /* =========================================================
     7. CLASSIC WHATSAPP CONTACT FORM
  ========================================================= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const service = document.getElementById("service")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      const whatsappMessage =
        `Hello DITELECOM,%0A%0A` +
        `My name is ${name}.%0A` +
        `Phone: ${phone}%0A` +
        `Email: ${email || "Not provided"}%0A` +
        `Service Needed: ${service}%0A%0A` +
        `Message:%0A${message}`;

      const whatsappURL = `https://wa.me/254119320215?text=${whatsappMessage}`;
      window.open(whatsappURL, "_blank");
    });
  }
});
/* =========================================================
   DARK / LIGHT MODE
========================================================= */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const savedTheme = localStorage.getItem("ditelecomTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("ditelecomTheme", "dark");
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      localStorage.setItem("ditelecomTheme", "light");
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
}


/* =========================================================
   ADVERT SLIDER - LEFT TO RIGHT + TRACKING DOTS
========================================================= */

const advertTrack = document.getElementById("advertTrack");
const advertDots = document.querySelectorAll("#advertDots .dot");
const advertSlides = document.querySelectorAll("#advertTrack .advert-slide");

if (advertTrack && advertSlides.length > 0) {
  let advertIndex = 0;
  const advertTotal = advertSlides.length;

  function updateAdvertSlider() {
    advertTrack.style.transform = `translateX(-${advertIndex * 100}%)`;

    advertDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === advertIndex);
    });
  }

  function nextAdvert() {
    advertIndex = (advertIndex + 1) % advertTotal;
    updateAdvertSlider();
  }

  advertDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      advertIndex = index;
      updateAdvertSlider();
    });
  });

  setInterval(nextAdvert, 4000);
  updateAdvertSlider();
}
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("advertTrack");
  const dots = document.querySelectorAll("#advertDots .dot");

  if (!track || dots.length === 0) return;

  let index = 0;
  const totalSlides = 3;

  function moveAdvert() {
    index = (index + 1) % totalSlides;

    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  setInterval(moveAdvert, 3000);
});

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


    const serviceSlides = document.querySelectorAll(".services-slider .slide");
    let serviceIndex = 0;

    function showNextServiceSlide() {
        serviceSlides[serviceIndex].classList.remove("active");

        serviceIndex = (serviceIndex + 1) % serviceSlides.length;

        serviceSlides[serviceIndex].classList.add("active");
    }

    setInterval(showNextServiceSlide, 5000);

    
const marketingSlides =
document.querySelectorAll(".marketing-slide");

let marketingIndex = 0;

function nextMarketingSlide() {

    marketingSlides[marketingIndex]
        .classList.remove("active");

    marketingIndex =
        (marketingIndex + 1) %
        marketingSlides.length;

    marketingSlides[marketingIndex]
        .classList.add("active");
}

setInterval(nextMarketingSlide, 5000);