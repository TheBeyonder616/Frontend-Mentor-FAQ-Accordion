"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
  const main = document.getElementById("main");
  const faqs = main.querySelectorAll("[data-faq]");
  const faqAnswers = main.querySelectorAll("[data-faqAnswer]");

  // Initialize the state by capturing original and new src values
  const { originalSrcs, newSrcs } = initializeImageSrcs(faqs);

  faqs.forEach((faq, index) => {
    faq.addEventListener("click", () => {
      toggleFAQ(faq, index, faqAnswers, originalSrcs, newSrcs, faqs);
    });
  });
}

// Function to initialize and return the original and new src values
function initializeImageSrcs(faqs) {
  const originalSrcs = Array.from(faqs).map((faq) =>
    faq.querySelector("img").getAttribute("src")
  );
  const newSrcs = Array.from(faqs).map((faq) =>
    faq.querySelector("img").getAttribute("data-src")
  );

  return { originalSrcs, newSrcs };
}

// Function to handle toggling of FAQ answers
function toggleFAQ(faq, index, faqAnswers, originalSrcs, newSrcs, faqs) {
  const img = faq.querySelector("img");
  const currentAnswer = faqAnswers[index];

  if (currentAnswer.classList.contains("open")) {
    // If currently open, close it and revert the image src
    updateImageSrc(img, originalSrcs[index]);
    currentAnswer.classList.remove("open");
  } else {
    // If currently closed, open it and update the image src
    updateImageSrc(img, newSrcs[index]);

    // Close all other FAQs and revert their images
    closeOtherFAQs(index, faqAnswers, originalSrcs, faqs);
    currentAnswer.classList.add("open");
  }
}

// Function to update the src attribute of an image
function updateImageSrc(img, newSrc) {
  img.setAttribute("src", newSrc);
}

// Function to close other FAQ answers and revert their images
function closeOtherFAQs(currentIndex, faqAnswers, originalSrcs, faqs) {
  faqAnswers.forEach((answer, i) => {
    if (i !== currentIndex) {
      answer.classList.remove("open");
      const img = faqs[i].querySelector("img");
      updateImageSrc(img, originalSrcs[i]);
    }
  });
}
