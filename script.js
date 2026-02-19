// Questionnaire modal and matcher + booking calendar
// Uses flatpickr for date picking

document.addEventListener("DOMContentLoaded", () => {
  // ===== Questionnaire modal =====
  const modal = document.getElementById("quizModal");
  const openBtn = document.getElementById("openQuizBtn");
  const heroBtn = document.getElementById("heroQuizBtn");
  const closeBtn = document.getElementById("closeQuizBtn");
  const quizForm = document.getElementById("quizForm");
  const resultsBox = document.getElementById("quizResults");
  const recServices = document.getElementById("recommendedServices");
  const recAddOns = document.getElementById("recommendedAddOns");
  const recSitter = document.getElementById("recommendedSitter");

  // Map sitter IDs to sitter names (must match sitters.html)
  const sitterNames = {
    "sitter-1": "Alex M.",
    "sitter-2": "Jamie L.",
    "sitter-3": "Priya S.",
    "sitter-4": "Chris D.",
    "sitter-5": "Maria R.",
    "sitter-6": "Jordan K.",
    "sitter-7": "Sara P.",
    "sitter-8": "Leo V.",
    "sitter-9": "Riley C.",
    "sitter-10": "Naomi F.",
    "sitter-11": "Owen T.",
    "sitter-12": "Emily W.",
    "sitter-13": "Grace H.",
    "sitter-14": "Sam B.",
    "sitter-15": "Hannah J.",
    "sitter-16": "Isaac Q.",
    "sitter-17": "Taylor G.",
    "sitter-18": "Kai N.",
    "sitter-19": "Olivia Z.",
    "sitter-20": "Ben A."
  };

  const openModal = () => {
    if (modal) modal.style.display = "flex";
  };

  const closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  // Auto-open a couple seconds after landing
  if (modal) {
    setTimeout(openModal, 1500);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (heroBtn) heroBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (quizForm) {
    quizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(quizForm);
      const petType = data.get("petType");
      const age = data.get("age");
      const energy = data.get("energy");
      const specialCare = data.get("specialCare");
      const service = data.get("service");
      const frequency = data.get("frequency");

      // Basic service description
      let serviceText = "";
      if (service === "walks") {
        serviceText = "Regular dog walks tailored to your dog’s pace and neighborhood.";
      } else if (service === "dropins") {
        serviceText = "Drop‑in visits for feeding, playtime, and litter/yard care.";
      } else if (service === "overnight") {
        serviceText = "Overnight in‑home sitting so your pet stays in their routine.";
      }

      // Add-ons based on answers
      const addOns = [];

      if (age === "puppy-kitten") {
        addOns.push("Puppy/kitten potty‑training and extra short visits.");
      }
      if (age === "senior") {
        addOns.push("Senior check‑ins with mobility support and extra comfort time.");
      }
      if (energy === "high" && service === "walks") {
        addOns.push("Extended or adventure walks for high‑energy pets.");
      }
      if (specialCare === "meds") {
        addOns.push("Medication administration and detailed health updates.");
      }
      if (specialCare === "anxious") {
        addOns.push("Extra‑slow introductions and low‑stimulus visits.");
      }
      if (specialCare === "mobility") {
        addOns.push("Gentle assistance with stairs and harness support.");
      }
      if (frequency === "daily") {
        addOns.push("Discounted recurring‑visit plan for daily care.");
      }

      // Sitter matching against IDs in sitters.html
      let sitterId = "sitter-1";

      if (petType === "cat") {
        if (specialCare === "meds") sitterId = "Isaac Q.";
        else if (age === "senior") sitterId = "Grace H.";
        else if (specialCare === "anxious") sitterId = "Olivia Z.";
        else sitterId = "Jamie L.";
      } else if (petType === "dog") {
        if (age === "puppy-kitten" && specialCare === "meds") sitterId = "Ben A.";
        else if (age === "puppy-kitten") sitterId = "Chris D.";
        else if (age === "senior" && specialCare === "meds") sitterId = "Owen T.";
        else if (age === "senior") sitterId = "Priya S.";
        else if (energy === "high") sitterId = "Jordan K.";
        else if (specialCare === "anxious") sitterId = "Sam B.";
        else sitterId = "Riley C.";
      }

      const sitterName = sitterNames[sitterId] || "one of our trusted sitters";

      if (recServices)
        recServices.textContent = `Suggested service: ${serviceText}`;
      if (recAddOns)
        recAddOns.textContent =
          addOns.length > 0
            ? `Recommended add‑ons: ${addOns.join(" ")}`
            : "Recommended add‑ons: Standard visit with photo updates.";
      if (recSitter)
        recSitter.textContent = `Best sitter match: ${sitterName}. You can learn more about them on the sitters page.`;

      if (resultsBox) resultsBox.classList.remove("hidden");
    });
  }

  // ===== Booking calendar and form =====
  const dateInput = document.getElementById("bookingDates");
  const bookingForm = document.getElementById("bookingForm");
  const bookingStatus = document.getElementById("bookingStatus");

  // Initialize flatpickr for multiple date selection
  if (dateInput && window.flatpickr) {
    flatpickr(dateInput, {
      mode: "multiple",
      minDate: "today",
      dateFormat: "Y-m-d"
    });
  }

  // Static-site booking confirmation
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const name = formData.get("bookingName");
      const dates = formData.get("bookingDates");
      const service = formData.get("bookingService");

      if (bookingStatus) {
        bookingStatus.textContent =
          dates && dates.trim().length > 0
            ? `Thanks, ${name}! We’ve received your ${service} request for: ${dates}. We’ll email you to confirm availability.`
            : `Thanks, ${name}! We’ve received your request and will email you to confirm availability.`;
      }

      bookingForm.reset();
    });
  }
});
