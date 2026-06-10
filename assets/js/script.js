"use strict";

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;
    testimonialsModalFunc();
  });
}

// Add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact form variables - RENAMED to avoid conflict
const contactForm = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formMessage = document.createElement("div");
formMessage.id = "form-message";
contactForm.parentNode.insertBefore(formMessage, contactForm.nextSibling);

// Add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (contactForm.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Toast notification function
function showToast(message, isError = false) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${isError ? "error" : ""}`;

  toast.innerHTML = `
    <ion-icon name="${isError ? "warning" : "checkmark"
    }" class="toast-icon"></ion-icon>
    <div class="toast-message">${message}</div>
    <button class="toast-close">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Auto remove toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);

  // Close button functionality
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  });
}

// Form submission handler
// Google Sheet sync: paste your deployed Apps Script Web App URL below.
const GOOGLE_SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwTO7-ymna6gO30frTnOuqfbjpDpnSUr3BNUGXUb9r0wnKKLjH0a7jVAQL6PlUQxQM/exec";

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable submit button during submission
    formBtn.disabled = true;
    formBtn.innerHTML = "<span>Sending...</span>";

    try {
      const formData = new FormData(contactForm);

      // If the Google Sheet endpoint hasn't been configured yet, skip the
      // network call so the form still works visually during testing.
      const endpointReady =
        GOOGLE_SHEET_ENDPOINT &&
        !GOOGLE_SHEET_ENDPOINT.includes("");

      if (endpointReady) {
        // Send data to Google Sheet (Apps Script Web App).
        // URL-encoded body is the most reliable format for Apps Script to
        // read via e.parameter. "no-cors" avoids CORS errors; the response
        // is opaque, so a resolved fetch is treated as success.
        const payload = new URLSearchParams(formData);

        await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: payload.toString(),
        });
      }

      // Show success toast
      showToast("Message sent successfully!");

      // Show success message in form
      formMessage.textContent = "Your message has been sent successfully!";
      formMessage.className = "form-message success";
      formMessage.style.display = "block";

      // Reset form
      contactForm.reset();
    } catch (error) {
      console.error("Error:", error);

      // Show error toast
      showToast("Failed to send message. Please try again.", true);

      // Show error message in form
      formMessage.textContent =
        "Failed to send your message. Please try again.";
      formMessage.className = "form-message error";
      formMessage.style.display = "block";
    } finally {
      // Re-enable submit button
      formBtn.disabled = false;
      formBtn.innerHTML =
        '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
  });
}

// Portfolio modal variables
const portfolioItems = document.querySelectorAll(".project-item");
const portfolioModalOverlay = document.createElement("div");
portfolioModalOverlay.className = "portfolio-modal-overlay";
document.body.appendChild(portfolioModalOverlay);

// Portfolio modal content
portfolioModalOverlay.innerHTML = `
  <div class="portfolio-modal-content">
    <div class="portfolio-modal-header">
      <h3 class="portfolio-modal-title">Project Title</h3>
      <span class="portfolio-modal-category">Category</span>
      <button class="close-portfolio-modal">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
    <div class="portfolio-modal-body">
      <img src="" alt="Project Image" class="portfolio-modal-image">
      <div class="portfolio-modal-details">
        <p>Project details will appear here. This is a detailed description of the project, including the technologies used and the challenges overcome during development.</p>
        <div class="portfolio-modal-tech"></div>
      </div>
    </div>
    <div class="portfolio-modal-footer">
      <button class="portfolio-modal-btn live-demo-btn">
        <ion-icon name="globe-outline"></ion-icon>
        View Live
      </button>
    </div>
  </div>
`;

// Portfolio data
const portfolioData = {
  1: {
    title: "Finance Dashboard",
    category: "Web Development",
    image: "./assets/images/project-1.jpg",
    details:
      "A comprehensive financial dashboard that provides real-time analytics and visualization of financial data. This project involved creating interactive charts, transaction history tracking, and budget forecasting tools. The dashboard helps users manage their finances effectively with intuitive UI and powerful features.",
    technologies: [
      "React",
      "Redux",
      "Chart.js",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    liveLink: "https://www.reactbd.com/projects",
  },
  2: {
    title: "Orizon Platform",
    category: "Web Development",
    image: "./assets/images/project-2.png",
    details:
      "A full-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing. The platform includes an admin dashboard for inventory management, order processing, and customer insights. Built with a focus on performance and security.",
    technologies: ["Vue.js", "Vuex", "Firebase", "Stripe API", "Tailwind CSS"],
    liveLink: "https://www.reactbd.com/projects",
  },
  3: {
    title: "Fundo Design",
    category: "Web Design",
    image: "./assets/images/project-3.jpg",
    details:
      "A modern UI design for a travel application that helps users discover and book travel experiences. The design focuses on intuitive navigation, beautiful imagery, and seamless user experience. Created with a mobile-first approach to ensure excellent performance on all devices.",
    technologies: [
      "Figma",
      "Adobe XD",
      "UI/UX Design",
      "Prototyping",
      "User Testing",
    ],
    liveLink: "https://www.reactbd.com/projects",
  },
  4: {
    title: "Brawlhalla App",
    category: "Applications",
    image: "./assets/images/project-4.png",
    details:
      "A productivity application that helps users manage tasks, set deadlines, and track progress. Features include project organization, team collaboration, time tracking, and notifications. The app syncs across all devices for seamless task management anywhere.",
    technologies: [
      "React Native",
      "Redux",
      "Firebase",
      "Push Notifications",
      "Jest Testing",
    ],
    liveLink: "https://www.reactbd.com/projects",
  },
  5: {
    title: "DSM Design System",
    category: "Web Design",
    image: "./assets/images/project-5.png",
    details:
      "A comprehensive design system for enterprise applications. Created to ensure consistency across multiple products and platforms. Includes a component library, design guidelines, and accessibility standards.",
    technologies: [
      "Figma",
      "Storybook",
      "Design Tokens",
      "Accessibility",
      "Component Library",
    ],
    liveLink: "https://www.reactbd.com/projects",
  },
  6: {
    title: "MetaSpark Platform",
    category: "Web Development",
    image: "./assets/images/project-6.png",
    details:
      "A social media analytics platform that helps businesses track engagement, monitor trends, and analyze competitor performance. Features include sentiment analysis, influencer identification, and campaign tracking.",
    technologies: ["Angular", "Python", "Django", "PostgreSQL", "D3.js"],
    liveLink: "https://www.reactbd.com/projects",
  },
  7: {
    title: "Summary Tool",
    category: "Web Development",
    image: "./assets/images/project-7.png",
    details:
      "An AI-powered text summarization tool that processes large documents and extracts key information. The tool uses natural language processing to identify important concepts and generate concise summaries while preserving the original meaning.",
    technologies: ["React", "Node.js", "NLP", "TensorFlow.js", "Material UI"],
    liveLink: "https://www.reactbd.com/projects",
  },
  8: {
    title: "Task Manager",
    category: "Applications",
    image: "./assets/images/project-8.jpg",
    details:
      "A cross-platform task management application with cloud synchronization, team collaboration features, and productivity analytics. Includes calendar integration, reminders, and progress tracking for personal and professional projects.",
    technologies: [
      "Flutter",
      "Firebase",
      "Google Calendar API",
      "Bloc Pattern",
      "Material Design",
    ],
    liveLink: "https://www.reactbd.com/projects",
  },
  9: {
    title: "Arrival Platform",
    category: "Web Development",
    image: "./assets/images/project-9.png",
    details:
      "A logistics and delivery management platform that optimizes routes, tracks shipments in real-time, and provides analytics for fleet management. Built for logistics companies to improve operational efficiency and customer satisfaction.",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Mapbox API", "Socket.io"],
    liveLink: "https://www.reactbd.com/projects",
  },
};

// Portfolio modal elements
const portfolioModalTitle = portfolioModalOverlay.querySelector(
  ".portfolio-modal-title"
);
const portfolioModalCategory = portfolioModalOverlay.querySelector(
  ".portfolio-modal-category"
);
const portfolioModalImage = portfolioModalOverlay.querySelector(
  ".portfolio-modal-image"
);
const portfolioModalDetails = portfolioModalOverlay.querySelector(
  ".portfolio-modal-details p"
);
const portfolioModalTech = portfolioModalOverlay.querySelector(
  ".portfolio-modal-tech"
);
const liveDemoBtn = portfolioModalOverlay.querySelector(".live-demo-btn");
const closePortfolioModalBtn = portfolioModalOverlay.querySelector(
  ".close-portfolio-modal"
);

// Open portfolio modal function
function openPortfolioModal(projectId) {
  const project = portfolioData[projectId];

  if (project) {
    portfolioModalTitle.textContent = project.title;
    portfolioModalCategory.textContent = project.category;
    portfolioModalImage.src = project.image;
    portfolioModalImage.alt = project.title;
    portfolioModalDetails.textContent = project.details;

    // Clear and add technologies
    portfolioModalTech.innerHTML = "";
    project.technologies.forEach((tech) => {
      const techItem = document.createElement("span");
      techItem.className = "portfolio-tech-item";
      techItem.textContent = tech;
      portfolioModalTech.appendChild(techItem);
    });

    // Set live demo button
    liveDemoBtn.onclick = function () {
      window.open(project.liveLink, "_blank");
    };

    // Show modal with animation
    portfolioModalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close portfolio modal function
function closePortfolioModal() {
  portfolioModalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Add event listeners to portfolio items
portfolioItems.forEach((item, index) => {
  const link = item.querySelector("a");
  link.addEventListener("click", function (e) {
    e.preventDefault();
    openPortfolioModal(index + 1);
  });
});

// Event listeners for closing modal
closePortfolioModalBtn.addEventListener("click", closePortfolioModal);

portfolioModalOverlay.addEventListener("click", function (e) {
  if (e.target === portfolioModalOverlay) {
    closePortfolioModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    portfolioModalOverlay.classList.contains("active")
  ) {
    closePortfolioModal();
  }
});

// Service card "Read more" toggle (truncate description after 50 characters)
const SERVICE_TEXT_LIMIT = 50;
const serviceTexts = document.querySelectorAll(".service-item-text");

serviceTexts.forEach((textEl) => {
  const fullText = textEl.textContent.trim();

  // Skip if the description is already short enough
  if (fullText.length <= SERVICE_TEXT_LIMIT) return;

  // Find a clean cut at the nearest space before the limit
  let cutIndex = fullText.lastIndexOf(" ", SERVICE_TEXT_LIMIT);
  if (cutIndex < 1) cutIndex = SERVICE_TEXT_LIMIT;
  const shortText = fullText.slice(0, cutIndex).trim();

  const ellipsis = document.createTextNode("… ");
  const textSpan = document.createElement("span");
  textSpan.textContent = shortText;

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.className = "service-read-more-btn";
  toggleBtn.innerHTML = 'more <ion-icon name="chevron-down" class="service-read-more-icon"></ion-icon>';
  toggleBtn.setAttribute("aria-label", "Read more");
  toggleBtn.setAttribute("aria-expanded", "false");

  textEl.textContent = "";
  textEl.append(textSpan, ellipsis, toggleBtn);

  let expanded = false;
  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    if (expanded) {
      textSpan.textContent = fullText;
      ellipsis.textContent = " ";
      toggleBtn.innerHTML = 'less <ion-icon name="chevron-up" class="service-read-more-icon"></ion-icon>';
      toggleBtn.setAttribute("aria-label", "Read less");
      toggleBtn.setAttribute("aria-expanded", "true");
    } else {
      textSpan.textContent = shortText;
      ellipsis.textContent = "… ";
      toggleBtn.innerHTML = 'more <ion-icon name="chevron-down" class="service-read-more-icon"></ion-icon>';
      toggleBtn.setAttribute("aria-label", "Read more");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
});


// Testimonial text toggle (mobile: 200, desktop: 350)
const MOBILE_TESTIMONIAL_BREAKPOINT = 767;
const MOBILE_TESTIMONIAL_CHAR_LIMIT = 200;
const DESKTOP_TESTIMONIAL_CHAR_LIMIT = 350;
const recommendationCards = document.querySelectorAll(".recommendation-card");

function truncateTextAtWord(text, limit) {
  if (text.length <= limit) return text;
  let cutIndex = text.lastIndexOf(" ", limit);
  if (cutIndex < 1) cutIndex = limit;
  return `${text.slice(0, cutIndex).trim()}...`;
}

function updateTestimonials() {
  const isMobile = window.innerWidth <= MOBILE_TESTIMONIAL_BREAKPOINT;
  const charLimit = isMobile
    ? MOBILE_TESTIMONIAL_CHAR_LIMIT
    : DESKTOP_TESTIMONIAL_CHAR_LIMIT;

  recommendationCards.forEach((card) => {
    const textNodes = card.querySelectorAll(
      ".recommendation-text:not(.recommendation-preview)"
    );
    if (!textNodes.length) return;

    if (!card.dataset.fullRecommendationText) {
      card.dataset.fullRecommendationText = Array.from(textNodes)
        .map((node) => node.textContent.trim())
        .filter(Boolean)
        .join("\n\n");
    }

    const fullText = card.dataset.fullRecommendationText;
    const shouldTruncate = fullText.length > charLimit;

    let previewText = card.querySelector(".recommendation-preview");
    let toggleBtn = card.querySelector(".recommendation-toggle-btn");

    textNodes.forEach((node) => {
      node.style.display = "none";
    });

    if (!previewText) {
      previewText = document.createElement("p");
      previewText.className = "recommendation-text recommendation-preview";
      card.appendChild(previewText);
    }

    previewText.style.display = "block";

    if (!shouldTruncate) {
      previewText.textContent = fullText;
      if (toggleBtn) toggleBtn.remove();
      card.dataset.recommendationExpanded = "false";
      return;
    }

    if (!toggleBtn) {
      toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "recommendation-toggle-btn";
      toggleBtn.addEventListener("click", () => {
        const expanded = card.dataset.recommendationExpanded === "true";
        card.dataset.recommendationExpanded = expanded ? "false" : "true";
        updateTestimonials();
      });
      card.appendChild(toggleBtn);
    }

    const expanded = card.dataset.recommendationExpanded === "true";
    previewText.textContent = expanded
      ? fullText
      : truncateTextAtWord(fullText, charLimit);

    toggleBtn.textContent = expanded ? "less" : "more";
    toggleBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
}

updateTestimonials();
window.addEventListener("resize", updateTestimonials);
