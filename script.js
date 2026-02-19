// Open questionnaire on page load and wires up buttons [web:7]
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("quizModal");
  const openBtn = document.getElementById("openQuizBtn");
  const heroBtn = document.getElementById("heroQuizBtn");
  const closeBtn = document.getElementById("closeQuizBtn");
  const quizForm = document.getElementById("quizForm");
  const resultsBox = document.getElementById("quizResults");
  const recServices = document.getElementById("recommendedServices");
  const recAddOns = document.getElementById("recommendedAddOns");
  const recSitter = document.getElementById("recommendedSitter");

  if (!modal) return;

  const openModal = () => {
    modal.style.display = "flex";
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  // Auto-open a couple seconds after landing
  setTimeout(openModal, 1500);

  openBtn && openBtn.addEventListener("click", openModal);
  heroBtn && heroBtn.addEventListener("click", openModal);
  closeBtn && closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

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

    // Add‑ons based on answers [web:5][web:11][web:14]
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

    // Sitter matching: choose one of 20 based on tags (IDs must exist in sitters.html)
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

    const sitterNumber = sitterId.split("-")[1];

    recServices.textContent = `Suggested service: ${serviceText}`;
    recAddOns.textContent =
      addOns.length > 0
        ? `Recommended add‑ons: ${addOns.join(" ")}`
        : "Recommended add‑ons: Standard visit with photo updates.";
    recSitter.textContent = `Best sitter match: sitter #${sitterNumber}. You can learn more about them on the sitters page.`;

    resultsBox.classList.remove("hidden");
  });
});
