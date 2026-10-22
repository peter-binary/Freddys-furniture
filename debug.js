
  const navToggle = document.getElementById("navToggle");
  const navLinks  = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  /* ---------- 2. FAQ accordion ---------- */
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");
    const answer   = item.querySelector(".faq__answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all other items so only one stays open
      faqItems.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq__answer").style.maxHeight = null;
        other.querySelector(".faq__question").setAttribute("aria-expanded", "false");
      });

      // Toggle the clicked one
      if (!isOpen) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- 3. alert() on all buttons ----------
     Freddy's custom alerts - FAQ questions and the menu toggle
     already have real behaviour, so they are excluded.   */
  const alertButtons = document.querySelectorAll(".js-alert, .icon-btn");

  alertButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // Keep the alert from firing when the click is part of
      // opening a room-card link — show the alert instead.
      event.preventDefault();

      const message =
        btn.dataset.message ||
        btn.getAttribute("aria-label") ||
        "Freddy clicked a button!";
      alert(message);
    });
  });

  /* ---------- 4. Smooth scroll + close mobile menu ---------- */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (targetId.length < 2) return; // ignore bare "#"

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close the mobile menu after choosing a link
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });