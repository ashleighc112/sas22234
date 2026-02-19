// Questionnaire modal and matcher + booking calendar

document.addEventListener("DOMContentLoaded", () => {
  // ===== Shared DOM references =====
  const modal = document.getElementById("quizModal");
  const openBtn = document.getElementById("openQuizBtn");
  const heroBtn = document.getElementById("heroQuizBtn");
  const closeBtn = document.getElementById("closeQuizBtn");
  const quizForm = document.getElementById("quizForm");
    // ===== Saved care plan modal =====
  const planModal = document.getElementById("planModal");
  const openPlanBtn = document.getElementById("openPlanBtn");
  const closePlanBtn = document.getElementById("closePlanBtn");
  const planContent = document.getElementById("planContent");
  const noPlanMessage = document.getElementById("noPlanMessage");

  const planPetSummary = document.getElementById("planPetSummary");
  const planServices = document.getElementById("planServices");
  const planAddOns = document.getElementById("planAddOns");
  const planSitter = document.getElementById("planSitter");

  const openPlanModal = () => {
    if (!planModal) return;

    let plan = null;
    try {
      const raw = localStorage.getItem("sasCarePlan");
      if (raw) plan = JSON.parse(raw);
    } catch (err) {
      console.warn("Could not read care plan", err);
    }

    if (!plan) {
      if (planContent) planContent.classList.add("hidden");
      if (noPlanMessage) noPlanMessage.classList.remove("hidden");
    } else {
      if (planContent) planContent.classList.remove("hidden");
      if (noPlanMessage) noPlanMessage.classList.add("hidden");

      const petLabel =
        plan.petType === "dog" ? "your dog" :
        plan.petType === "cat" ? "your cat" :
        "your pet";

      if (planPetSummary) {
        planPetSummary.textContent =
          `This plan was created for ${petLabel} with ${plan.energy} energy, ` +
          `${plan.age} age group, and ${plan.specialCare} special needs.`;
      }

      if (planServices) {
        planServices.textContent = plan.serviceText || "Standard visit schedule.";
      }

      if (planAddOns) {
        planAddOns.textContent =
          plan.addOns && plan.addOns.length
            ? plan.addOns.join(" ")
            : "No extra add‑ons beyond our standard care and photo updates.";
      }

      if (planSitter) {
        planSitter.textContent =
          plan.sitterName
            ? `Suggested sitter: ${plan.sitterName}. You can view their full profile on the sitters page.`
            : "We’ll help you choose a sitter when you’re ready to book.";
      }
    }

    planModal.style.display = "flex";
  };

  const closePlanModal = () => {
    if (planModal) planModal.style.display = "none";
  };

  if (openPlanBtn) openPlanBtn.addEventListener("click", openPlanModal);
  if (closePlanBtn) closePlanBtn.addEventListener("click", closePlanModal);

  if (planModal) {
    planModal.addEventListener("click", (e) => {
      if (e.target === planModal) {
        closePlanModal();
      }
    });
  }

  const resultsBox = document.getElementById("quizResults");
  const recServices = document.getElementById("recommendedServices");
  const recAddOns = document.getElementById("recommendedAddOns");
  const recSitter = document.getElementById("recommendedSitter");
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

      // --- Save a more in‑depth plan for later ---
      const plan = {
        petType,
        age,
        energy,
        specialCare,
        service,
        frequency,
        serviceText,
        addOns,
        sitterId,
        sitterName,
        createdAt: new Date().toISOString()
      };

      try {
        localStorage.setItem("sasCarePlan", JSON.stringify(plan));
      } catch (err) {
        console.warn("Could not save care plan", err);
      }

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

  // ===== Modal open/close with one-time auto-open =====
  const openModal = () => {
    if (modal) {
      modal.style.display = "flex";
      localStorage.setItem("sasQuizShown", "true");
    }
  };

  const closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  if (modal) {
    const hasSeenQuiz = localStorage.getItem("sasQuizShown") === "true";
    if (!hasSeenQuiz) {
      setTimeout(openModal, 1500);
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (heroBtn) heroBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // ===== Quiz submit: service, add-ons, sitter matching =====
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

      // Service description
      let serviceText = "";
      if (service === "walks") {
        serviceText = "Regular dog walks tailored to your dog’s pace and neighborhood.";
      } else if (service === "dropins") {
        serviceText = "Drop‑in visits for feeding, playtime, and litter/yard care.";
      } else if (service === "overnight") {
        serviceText = "Overnight in‑home sitting so your pet stays in their routine.";
      }

      // Add-ons
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

      // Sitter matching (IDs exist in sitters.html)
      let sitterId = "sitter-1";

      if (petType === "cat") {
        if (specialCare === "meds") sitterId = "sitter-16";
        else if (age === "senior") sitterId = "sitter-13";
        else if (specialCare === "anxious") sitterId = "sitter-19";
        else sitterId = "sitter-2";
      } else if (petType === "dog") {
        if (age === "puppy-kitten" && specialCare === "meds") sitterId = "sitter-20";
        else if (age === "puppy-kitten") sitterId = "sitter-4";
        else if (age === "senior" && specialCare === "meds") sitterId = "sitter-11";
        else if (age === "senior") sitterId = "sitter-3";
        else if (energy === "high") sitterId = "sitter-6";
        else if (specialCare === "anxious") sitterId = "sitter-14";
        else sitterId = "sitter-9";
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

  if (dateInput && window.flatpickr) {
    flatpickr(dateInput, {
      mode: "multiple",
      minDate: "today",
      dateFormat: "Y-m-d"
    });
  }

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
