/**
 * Pranta Kundu Portfolio - Interactive Engineering System
 * Clean, modular, responsive interactions for QA engineering portfolio
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------
  // 1. Theme Management (Light / Dark)
  // -------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const THEME_STORAGE_KEY = "pk-portfolio-theme";

  function applyTheme(theme) {
    const activeTheme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", activeTheme);
    document.body.setAttribute("data-theme", activeTheme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        "aria-label",
        activeTheme === "light" ? "Switch to dark mode" : "Switch to light mode"
      );
      const sunIcon = themeToggleBtn.querySelector(".icon-sun");
      const moonIcon = themeToggleBtn.querySelector(".icon-moon");
      if (sunIcon && moonIcon) {
        if (activeTheme === "light") {
          sunIcon.style.display = "none";
          moonIcon.style.display = "inline-block";
        } else {
          sunIcon.style.display = "inline-block";
          moonIcon.style.display = "none";
        }
      }
    }
  }

  // Initialize theme
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    });
  }

  // -------------------------------------------------------------
  // 2. Mobile Menu Navigation
  // -------------------------------------------------------------
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
      mobileNavDrawer.classList.toggle("hidden");
      document.body.classList.toggle("overflow-hidden", !isExpanded);
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileNavDrawer.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      });
    });
  }

  // -------------------------------------------------------------
  // 3. Scroll Spy for Header Navigation
  // -------------------------------------------------------------
  const navLinks = document.querySelectorAll(".desktop-nav-link");
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavLink() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // -------------------------------------------------------------
  // 4. Interactive Live Quality Pipeline (Hero Widget)
  // -------------------------------------------------------------
  const pipelineStages = [
    {
      id: "requirements",
      title: "01 Requirements",
      command: "requirements",
      output: "acceptance criteria reviewed · 2 boundary edge-cases flagged · zero defect leaks",
      status: "Verified",
      metric: "100% PRD Coverage",
      latency: "45m Review",
    },
    {
      id: "strategy",
      title: "02 Test Strategy",
      command: "strategy",
      output: "risk matrix mapped · high-blast radius checkout & auth prioritized · 42 core tests selected",
      status: "Mapped",
      metric: "94% Risk Hedged",
      latency: "12m Planning",
    },
    {
      id: "automation",
      title: "03 Automation",
      command: "playwright",
      output: "test suite executed on Chromium/Firefox/WebKit · POM fixtures initialized · 0 flaky retries",
      status: "Passing",
      metric: "48 Test Specs",
      latency: "3m 42s Run",
    },
    {
      id: "ci",
      title: "04 CI Execution",
      command: "docker run ghcr.io/arogga/qa-runner",
      output: "headless docker container booted · 8 parallel workers dispatched · github commit status passed",
      status: "Healthy",
      metric: "8 Parallel Workers",
      latency: "1m 18s Pipeline",
    },
    {
      id: "validation",
      title: "05 Validation",
      command: "contract-test",
      output: "postman API collection matched json schema · payment gateway mock responded 200 OK",
      status: "Compliant",
      metric: "120 Endpoints",
      latency: "840ms Latency",
    },
    {
      id: "release",
      title: "06 Release",
      command: "release-gate",
      output: "allure telemetry compiled · zero critical blocker bugs · signed off for production deployment",
      status: "Approved",
      metric: "Production Ready",
      latency: "Ready to Deploy",
    },
  ];

  let currentStageIndex = 0;
  const stageBtns = document.querySelectorAll(".pipeline-stage-btn");
  const terminalCmd = document.getElementById("terminal-cmd");
  const terminalOutput = document.getElementById("terminal-output");
  const terminalStatus = document.getElementById("terminal-status");
  const terminalMetric = document.getElementById("terminal-metric");

  function setPipelineStage(index) {
    currentStageIndex = index;
    const stage = pipelineStages[index];

    stageBtns.forEach((btn, i) => {
      const circle = btn.querySelector(".stage-circle");
      const label = btn.querySelector(".stage-label");

      if (i === index) {
        btn.setAttribute("aria-current", "step");
        if (circle) {
          circle.classList.add("bg-accent", "text-white", "border-accent");
          circle.classList.remove("bg-surface", "text-ink-faint", "border-line-strong");
        }
        if (label) {
          label.classList.add("text-ink", "font-semibold");
          label.classList.remove("text-ink-faint");
        }
      } else {
        btn.removeAttribute("aria-current");
        if (circle) {
          circle.classList.remove("bg-accent", "text-white", "border-accent");
          circle.classList.add("bg-surface", "text-ink-faint", "border-line-strong");
        }
        if (label) {
          label.classList.remove("text-ink", "font-semibold");
          label.classList.add("text-ink-faint");
        }
      }
    });

    if (terminalCmd) terminalCmd.textContent = stage.command;
    if (terminalOutput) terminalOutput.textContent = stage.output;
    if (terminalStatus) terminalStatus.textContent = stage.status;
    if (terminalMetric) terminalMetric.textContent = stage.metric;
  }

  stageBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      setPipelineStage(index);
    });
  });

  // Auto rotate stage every 6 seconds unless user manually interacts
  let pipelineInterval = setInterval(() => {
    const nextIdx = (currentStageIndex + 1) % pipelineStages.length;
    setPipelineStage(nextIdx);
  }, 6000);

  stageBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => clearInterval(pipelineInterval));
  });

  // -------------------------------------------------------------
  // 5. Capabilities & Expertise Tab Switcher
  // -------------------------------------------------------------
  const capTabBtns = document.querySelectorAll("[data-cap-tab]");
  const capPanels = document.querySelectorAll("[data-cap-panel]");

  capTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-cap-tab");

      capTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      capPanels.forEach((panel) => {
        if (panel.getAttribute("data-cap-panel") === targetTab) {
          panel.classList.remove("hidden");
          panel.classList.add("animate-rise");
        } else {
          panel.classList.add("hidden");
          panel.classList.remove("animate-rise");
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 6. Accordion Case Studies (#work)
  // -------------------------------------------------------------
  const accordionItems = document.querySelectorAll(".work-accordion-item");

  accordionItems.forEach((item) => {
    const headerBtn = item.querySelector(".accordion-header");
    if (!headerBtn) return;

    headerBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close other accordions for crisp clarity
      accordionItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const otherBtn = other.querySelector(".accordion-header");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        headerBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        headerBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // -------------------------------------------------------------
  // 7. Interactive Automation Stepper (#automation)
  // -------------------------------------------------------------
  const automationSteps = [
    {
      badge: "Stage 01",
      title: "User Workflow Definition",
      desc: "Capturing critical business journeys (e.g. Arogga Prescription Upload & Checkout Flow) into verifiable acceptance criteria before writing code.",
      code: `// 1. Defined User Workflow: Medicine Checkout
// User logs in with phone OTP
// Selects prescribed medicine items & adds to cart
// Enters delivery address in Dhaka Metro
// Chooses payment method (bKash / COD)
// Submits order and receives unique Order ID (#ARG-84920)`,
      type: "Workflow Blueprint",
      outputTag: "INPUT SPECIFICATION",
    },
    {
      badge: "Stage 02",
      title: "Structured Test Scenario (Gherkin)",
      desc: "Translating business rules into unambiguous scenarios covering happy paths, network latency, and boundary limits.",
      code: `Feature: Prescription Order Checkout Flow
  Scenario: Customer successfully places medicine order via bKash
    Given user has verified prescription in cart
    When user selects express 2-hour delivery
    And provides valid delivery address in "Banani, Dhaka"
    And completes bKash sandbox payment transaction
    Then order confirmation screen appears with tracking code
    And inventory decrement event is emitted to OMS`,
      type: "Gherkin Spec",
      outputTag: "SCENARIO SPEC",
    },
    {
      badge: "Stage 03",
      title: "Playwright POM Automation Code",
      desc: "Architecting modular, asynchronous TypeScript tests using Page Object Model, custom locators, and resilient auto-waiters.",
      code: `import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';

test('verify complete prescription order checkout', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  
  await checkout.goto();
  await checkout.selectPrescriptionItems(['Paracetamol 500mg', 'Napa Extra']);
  await checkout.fillDeliveryDetails({ district: 'Dhaka', area: 'Banani' });
  await checkout.selectPaymentGateway('bKash');
  
  const orderId = await checkout.confirmOrder();
  expect(orderId).toMatch(/^ARG-\\d{5}$/);
});`,
      type: "TypeScript / Playwright",
      outputTag: "AUTOMATION SCRIPT",
    },
    {
      badge: "Stage 04",
      title: "Containerized CI Execution",
      desc: "Running headless browsers across isolated Docker containers triggered on every Pull Request with parallel execution.",
      code: `# GitHub Actions Pipeline Run
[INFO] Triggered by: Pull Request #249 (feat: express checkout)
[DOCKER] Spawning runner: mcr.microsoft.com/playwright:v1.44-jammy
[TEST] Running 48 test specs using 6 parallel workers...
  ✓ cart.spec.ts: Prescription validation (1.2s)
  ✓ checkout.spec.ts: bKash payment gateway sandbox (2.4s)
  ✓ api-auth.spec.ts: JWT token refresh rotation (0.4s)
  ✓ address.spec.ts: Geo-location boundary lookup (0.8s)

[RESULT] 48 passed, 0 failed, 0 flaky (Total Time: 1m 14s)`,
      type: "GitHub Actions Log",
      outputTag: "CI RUNNER TELEMETRY",
    },
    {
      badge: "Stage 05",
      title: "Verifiable Test Evidence & Telemetry",
      desc: "Producing Allure reports, HAR network traces, failure video artifacts, and automatic release gates in Jira and Slack.",
      code: `{
  "executionSummary": {
    "suite": "Arogga Regression Suite v4.2.0",
    "totalTests": 48,
    "passed": 48,
    "failed": 0,
    "flakinessRate": "0.00%",
    "artifactsGenerated": ["allure-report.html", "traces.zip"],
    "qualityGateStatus": "PASSED",
    "releaseRecommendation": "READY_FOR_PRODUCTION"
  }
}`,
      type: "JSON Test Telemetry",
      outputTag: "AUDIT SIGN-OFF",
    },
  ];

  const autoStepBtns = document.querySelectorAll("[data-auto-step]");
  const autoCodeBlock = document.getElementById("auto-code-display");
  const autoTitle = document.getElementById("auto-step-title");
  const autoDesc = document.getElementById("auto-step-desc");
  const autoType = document.getElementById("auto-step-type");
  const autoTag = document.getElementById("auto-step-tag");

  function selectAutoStep(index) {
    const step = automationSteps[index];
    autoStepBtns.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add("active");
        btn.setAttribute("aria-current", "true");
      } else {
        btn.classList.remove("active");
        btn.removeAttribute("aria-current");
      }
    });

    if (autoCodeBlock) autoCodeBlock.textContent = step.code;
    if (autoTitle) autoTitle.textContent = step.title;
    if (autoDesc) autoDesc.textContent = step.desc;
    if (autoType) autoType.textContent = step.type;
    if (autoTag) autoTag.textContent = step.outputTag;
  }

  autoStepBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => selectAutoStep(idx));
  });

  // -------------------------------------------------------------
  // 8. Quality Maturity Model Interactive Matrix (#maturity)
  // -------------------------------------------------------------
  const maturityLevels = [
    {
      level: "Level 01",
      name: "Ad-hoc & Reactive QA",
      summary: "Manual defect hunting after development completes. Testing is seen as a final gatekeeper rather than a continuous engineering practice.",
      signals: ["No automated regression suites", "Bugs reported by end users in production", "Manual test execution delays releases by days"],
      tools: ["Spreadsheet test cases", "Ad-hoc manual exploratory testing"],
      coverage: "15% - 20% manual verification",
    },
    {
      level: "Level 02",
      name: "Standardized Test Management",
      summary: "Documented test scenarios, structured Jira bug lifecycles, and organized test cases categorized by feature modules.",
      signals: ["Sprint-based manual regression runs", "Documented acceptance criteria", "Centralized defect tracking and severity ratings"],
      tools: ["Jira / TestRail", "Postman manual API collections", "Bug triage boards"],
      coverage: "40% - 50% structured manual coverage",
    },
    {
      level: "Level 03",
      name: "Automated Regression & API Suite",
      summary: "Core user journeys and business-critical APIs automated with framework-level Page Object Model architectures.",
      signals: ["Playwright / Selenium regression runs nightly", "REST API validation on every deployment", "Flakiness reduction mechanisms in place"],
      tools: ["Playwright", "TypeScript", "Postman / Newman", "Rest-Assured"],
      coverage: "70% - 75% automated regression coverage",
    },
    {
      level: "Level 04",
      name: "Continuous QAOps & Shift-Left Gates",
      summary: "PR-level test execution, containerized runners, and automated deployment blocks preventing buggy commits from merging.",
      signals: ["Dockerized headless test runs on pull requests", "Automated Slack alerts with trace logs", "QA involved in early PRD architecture reviews"],
      tools: ["GitHub Actions", "Docker", "BrowserStack", "Allure Reporting"],
      coverage: "85%+ automated coverage across web, mobile, and APIs",
    },
    {
      level: "Level 05",
      name: "AI-Augmented Quality Engineering",
      summary: "Intelligent test generation, telemetry-driven defect analysis, and self-healing selector strategies under human engineering ownership.",
      signals: ["AI-assisted edge-case test synthesis", "Dynamic risk-based test selection", "Real-time production error telemetry feeding into automated test cases"],
      tools: ["MCP Workflows", "AI-assisted Playwright generators", "Datadog / Sentry telemetry integration"],
      coverage: "Continuous, predictive quality governance across entire lifecycle",
    },
  ];

  const maturityBtns = document.querySelectorAll("[data-maturity-btn]");
  const maturityTitle = document.getElementById("maturity-title");
  const maturitySummary = document.getElementById("maturity-summary");
  const maturitySignals = document.getElementById("maturity-signals");
  const maturityTools = document.getElementById("maturity-tools");
  const maturityCoverage = document.getElementById("maturity-coverage");

  function selectMaturityLevel(index) {
    const data = maturityLevels[index];

    maturityBtns.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add("active");
        btn.setAttribute("aria-current", "true");
      } else {
        btn.classList.remove("active");
        btn.removeAttribute("aria-current");
      }
    });

    if (maturityTitle) maturityTitle.textContent = `${data.level} · ${data.name}`;
    if (maturitySummary) maturitySummary.textContent = data.summary;
    if (maturityCoverage) maturityCoverage.textContent = data.coverage;

    if (maturitySignals) {
      maturitySignals.innerHTML = data.signals
        .map(
          (s) =>
            `<li class="flex items-start gap-2 text-sm text-ink-muted"><span class="text-accent font-mono text-xs">›</span>${s}</li>`
        )
        .join("");
    }

    if (maturityTools) {
      maturityTools.innerHTML = data.tools
        .map((t) => `<span class="tag-chip">${t}</span>`)
        .join(" ");
    }
  }

  maturityBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => selectMaturityLevel(idx));
  });

  // -------------------------------------------------------------
  // 9. Certificate Preview Modal
  // -------------------------------------------------------------
  const certModal = document.getElementById("certificate-modal");
  const certModalImg = document.getElementById("cert-modal-img");
  const certModalTitle = document.getElementById("cert-modal-title");
  const certModalDesc = document.getElementById("cert-modal-desc");
  const certModalClose = document.getElementById("cert-modal-close");
  const certTriggers = document.querySelectorAll("[data-cert-trigger]");

  function openCertModal(title, imageSrc, desc) {
    if (!certModal) return;
    if (certModalTitle) certModalTitle.textContent = title;
    if (certModalImg) certModalImg.src = imageSrc;
    if (certModalDesc) certModalDesc.textContent = desc;

    certModal.classList.add("open");
    document.body.classList.add("overflow-hidden");
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove("open");
    document.body.classList.remove("overflow-hidden");
  }

  certTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const title = trigger.getAttribute("data-cert-title") || "Certificate";
      const img = trigger.getAttribute("data-cert-img") || "";
      const desc = trigger.getAttribute("data-cert-desc") || "";
      openCertModal(title, img, desc);
    });
  });

  if (certModalClose) certModalClose.addEventListener("click", closeCertModal);
  if (certModal) {
    certModal.addEventListener("click", (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  // -------------------------------------------------------------
  // 10. Article Reader Modal
  // -------------------------------------------------------------
  const articleModal = document.getElementById("article-modal");
  const articleModalTitle = document.getElementById("article-modal-title");
  const articleModalBody = document.getElementById("article-modal-body");
  const articleModalClose = document.getElementById("article-modal-close");
  const articleTriggers = document.querySelectorAll("[data-article-trigger]");

  const articleDatabase = {
    "agentic-testing": {
      title: "Agentic Testing is Changing QA: From Script Follower to Autonomous Verification",
      date: "Published · Technical Architecture",
      body: `<p class="mb-4">For decades, test automation followed a rigid script: click this locator, assert that text, wait 500ms. If an element ID shifted by one character, the build crashed and required an engineer to inspect and refactor the selector.</p>
      <p class="mb-4">With agentic testing and MCP (Model Context Protocol), testing is shifting toward intent-driven verification. Agents can parse the application's accessibility tree, navigate dynamic flows, and assert business invariants without brittle hardcoded paths.</p>
      <h4 class="text-base font-bold text-ink mb-2">The Human in the Loop Mandate</h4>
      <p class="mb-4">However, autonomous testing without engineering oversight generates false security. The role of the SDET shifts from writing repetitive locator strings to defining the quality contract, risk boundaries, and deterministic assertions.</p>
      <p>Machines execute repetition at unprecedented speed; human engineers own accountability, risk assessment, and release sign-offs.</p>`,
    },
    "flaky-tests": {
      title: "Why Flaky Tests Aren't Random: The Mechanics Behind Non-Deterministic Failures",
      date: "Published · Automation Engineering",
      body: `<p class="mb-4">Every automation engineer has heard the phrase: "Just re-run the build, it passed on the second try." Flaky tests are the single biggest destroyer of team confidence in test automation.</p>
      <p class="mb-4">Flakiness is rarely random. It stems from 4 specific architectural flaws:
      <ul class="list-disc pl-5 my-3 space-y-1 text-ink-muted">
        <li><strong>Race conditions:</strong> Asserting before DOM mutations or asynchronous animations settle.</li>
        <li><strong>Shared test state:</strong> Tests depending on records or database rows modified by prior tests.</li>
        <li><strong>Network micro-jitter:</strong> Unhandled API timeouts without exponential backoff.</li>
        <li><strong>Environment inconsistencies:</strong> Differences in viewport size, timezone, or CPU load on CI runners.</li>
      </ul>
      </p>
      <p>Using Playwright's web-first assertions, isolated browser contexts, and idempotent test fixtures eliminates 99% of flakiness at the architectural layer.</p>`,
    },
    "pom-pattern": {
      title: "Page Object Model (POM) is an Architectural Pattern, Not a Framework",
      date: "Published · Architecture & Best Practices",
      body: `<p class="mb-4">A common mistake in test automation is treating POM as an entire framework rather than what it is: an object-oriented abstraction pattern separating page structure from test assertion logic.</p>
      <p class="mb-4">When properly implemented:
      <ul class="list-disc pl-5 my-3 space-y-1 text-ink-muted">
        <li>Page objects expose business actions (e.g. <code>submitPrescription()</code>), not raw selector handles.</li>
        <li>Tests read like clean English specifications.</li>
        <li>Locator changes affect exactly one file, protecting hundreds of test specs from breakage.</li>
      </ul>
      </p>`,
    },
    "shift-left": {
      title: "Shift-Left Testing: How to Prevent Bugs Before Writing a Single Line of Code",
      date: "Published · Quality Governance",
      body: `<p class="mb-4">The cost of fixing a bug in production is up to 30 times higher than catching it during requirements design. Shift-left testing is the discipline of embedding QA into PRD reviews and architectural discussions.</p>
      <p class="mb-4">By reviewing edge cases, data sanitization, and API contracts before developers begin coding, we prevent defects from being programmed in the first place.</p>`,
    },
    "ci-cd-pipelines": {
      title: "GitHub Actions vs. Jenkins for Modern Test Automation Pipelines",
      date: "Published · QAOps & Infrastructure",
      body: `<p class="mb-4">A detailed comparison of running Playwright and Appium regression suites in cloud-native GitHub Actions vs. self-hosted Jenkins agents.</p>
      <p class="mb-4">Covering matrix builds, caching browser binaries, Docker runner spin-up latency, and Slack failure notification webhooks.</p>`,
    },
    "api-timeouts": {
      title: "Payment Gateway & API Timeout Testing in High-Volume Systems",
      date: "Published · API Validation",
      body: `<p class="mb-4">In high-volume e-commerce like Arogga, network timeouts during payment authorization can result in double-deductions or abandoned carts.</p>
      <p class="mb-4">This article covers idempotency key validation, chaos injection, and automated Mockoon/WireMock testing to ensure seamless error recovery.</p>`,
    },
  };

  function openArticleModal(articleId) {
    if (!articleModal) return;
    const data = articleDatabase[articleId];
    if (!data) return;

    if (articleModalTitle) articleModalTitle.textContent = data.title;
    if (articleModalBody) articleModalBody.innerHTML = data.body;

    articleModal.classList.add("open");
    document.body.classList.add("overflow-hidden");
  }

  function closeArticleModal() {
    if (!articleModal) return;
    articleModal.classList.remove("open");
    document.body.classList.remove("overflow-hidden");
  }

  articleTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const id = trigger.getAttribute("data-article-id");
      if (id) openArticleModal(id);
    });
  });

  if (articleModalClose) articleModalClose.addEventListener("click", closeArticleModal);
  if (articleModal) {
    articleModal.addEventListener("click", (e) => {
      if (e.target === articleModal) closeArticleModal();
    });
  }

  // -------------------------------------------------------------
  // 11. Contact Form Handling
  // -------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  const formSuccessAlert = document.getElementById("form-success-alert");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;
      }

      setTimeout(() => {
        if (formSuccessAlert) {
          formSuccessAlert.classList.remove("hidden");
          formSuccessAlert.classList.add("animate-rise");
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Message Sent</span>`;
        }
      }, 700);
    });
  }

  // -------------------------------------------------------------
  // 12. Local Time in Dhaka (UTC+6)
  // -------------------------------------------------------------
  const localTimeEl = document.getElementById("dhaka-local-time");
  function updateDhakaTime() {
    if (!localTimeEl) return;
    const now = new Date();
    // Dhaka is UTC+6
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const dhakaTime = new Date(utc + 3600000 * 6);
    const timeStr = dhakaTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    localTimeEl.textContent = `${timeStr} (UTC+6)`;
  }
  updateDhakaTime();
  setInterval(updateDhakaTime, 1000);

  // Keyboard escape handler for modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCertModal();
      closeArticleModal();
    }
  });
});
