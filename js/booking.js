/* ============================================
   HOTEL VELORA — Booking System JavaScript
   ============================================ */

(function () {
  "use strict";

  /* ---- Room Data ---- */
  const ROOMS = [
    {
      id: "deluxe-king",
      name: "Deluxe King Room",
      type: "Deluxe",
      pricePerNight: 320,
      maxGuests: 2,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
      features: ["King Bed", "City View", "450 sqft"],
    },
    {
      id: "premier-suite",
      name: "Premier Suite",
      type: "Suite",
      pricePerNight: 520,
      maxGuests: 3,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80",
      features: ["King Bed", "Living Room", "680 sqft"],
    },
    {
      id: "velora-penthouse",
      name: "Velora Penthouse",
      type: "Penthouse",
      pricePerNight: 1200,
      maxGuests: 4,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
      features: ["2 Bedrooms", "Panoramic View", "1400 sqft"],
    },
    {
      id: "classic-double",
      name: "Classic Double Room",
      type: "Classic",
      pricePerNight: 220,
      maxGuests: 2,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80",
      features: ["Double Bed", "Garden View", "320 sqft"],
    },
  ];

  /* ---- Extras Data ---- */
  const EXTRAS = [
    { id: "breakfast", name: "Daily Breakfast", price: 45, perNight: true, icon: "☕" },
    { id: "airport", name: "Airport Transfer", price: 80, perNight: false, icon: "🚗" },
    { id: "spa", name: "Spa Welcome Package", price: 120, perNight: false, icon: "🧖" },
    { id: "champagne", name: "Champagne on Arrival", price: 65, perNight: false, icon: "🥂" },
    { id: "romantic", name: "Romantic Turndown", price: 35, perNight: false, icon: "🌹" },
    { id: "late-checkout", name: "Late Checkout (2PM)", price: 50, perNight: false, icon: "🕑" },
  ];

  /* ---- State ---- */
  const state = {
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    nights: 0,
    selectedRoom: null,
    selectedExtras: [],
    guestInfo: {},
    bookingRef: "",
    currentStep: 1,
  };

  /* ---- DOM References ---- */
  const steps = document.querySelectorAll(".booking-step");
  const panels = document.querySelectorAll(".form-panel");
  const summaryCheckIn = document.getElementById("summary-checkin");
  const summaryCheckOut = document.getElementById("summary-checkout");
  const summaryNights = document.getElementById("summary-nights");
  const summaryRoomName = document.getElementById("summary-room-name");
  const summaryRoomType = document.getElementById("summary-room-type");
  const summaryRoomCost = document.getElementById("summary-room-cost");
  const summaryExtrasList = document.getElementById("summary-extras-list");
  const summaryTotal = document.getElementById("summary-total");
  const summaryTotalNights = document.getElementById("summary-total-nights");

  /* ============================================
     STEP NAVIGATION
     ============================================ */
  function goToStep(stepNum) {
    state.currentStep = stepNum;

    steps.forEach((s, i) => {
      s.classList.remove("active", "done");
      if (i + 1 === stepNum) s.classList.add("active");
      if (i + 1 < stepNum) s.classList.add("done");
    });

    panels.forEach((p, i) => {
      p.classList.remove("active");
      if (i + 1 === stepNum) p.classList.add("active");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  steps.forEach((step, i) => {
    step.addEventListener("click", () => {
      if (i + 1 < state.currentStep || validateCurrentStep()) {
        goToStep(i + 1);
      }
    });
  });

  /* ---- Next / Back Buttons ---- */
  document.querySelectorAll("[data-next-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateCurrentStep()) {
        goToStep(state.currentStep + 1);
      }
    });
  });

  document.querySelectorAll("[data-prev-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      goToStep(state.currentStep - 1);
    });
  });

  /* ============================================
     STEP 1: DATES & GUESTS
     ============================================ */
  const checkInInput = document.getElementById("check-in");
  const checkOutInput = document.getElementById("check-out");
  const adultsInput = document.getElementById("adults");
  const childrenInput = document.getElementById("children");

  // Set min date to today
  const today = new Date().toISOString().split("T")[0];
  if (checkInInput) checkInInput.min = today;
  if (checkOutInput) checkOutInput.min = today;

  function calculateNights() {
    if (!state.checkIn || !state.checkOut) return 0;
    const diff =
      new Date(state.checkOut) - new Date(checkInInput.value || state.checkIn);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  }

  function updateDateSummary() {
    state.nights = calculateNights();

    if (summaryCheckIn) {
      summaryCheckIn.textContent = state.checkIn
        ? formatDate(state.checkIn)
        : "—";
    }
    if (summaryCheckOut) {
      summaryCheckOut.textContent = state.checkOut
        ? formatDate(state.checkOut)
        : "—";
    }
    if (summaryNights) {
      summaryNights.textContent =
        state.nights > 0 ? `${state.nights} night${state.nights > 1 ? "s" : ""}` : "—";
    }

    updateTotals();
  }

  if (checkInInput) {
    checkInInput.addEventListener("change", () => {
      state.checkIn = checkInInput.value;
      // Ensure check-out is after check-in
      if (checkOutInput) {
        checkOutInput.min = checkInInput.value;
        if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
          const nextDay = new Date(checkInInput.value);
          nextDay.setDate(nextDay.getDate() + 1);
          checkOutInput.value = nextDay.toISOString().split("T")[0];
          state.checkOut = checkOutInput.value;
        }
      }
      updateDateSummary();
    });
  }

  if (checkOutInput) {
    checkOutInput.addEventListener("change", () => {
      state.checkOut = checkOutInput.value;
      updateDateSummary();
    });
  }

  if (adultsInput) {
    adultsInput.addEventListener("change", () => {
      state.adults = parseInt(adultsInput.value, 10);
    });
  }

  if (childrenInput) {
    childrenInput.addEventListener("change", () => {
      state.children = parseInt(childrenInput.value, 10);
    });
  }

  /* ============================================
     STEP 2: ROOM SELECTION
     ============================================ */
  function buildRoomCards() {
    const grid = document.getElementById("room-select-grid");
    if (!grid) return;

    grid.innerHTML = ROOMS.map(
      (room) => `
      <div class="room-select-card" data-room-id="${room.id}" role="button" tabindex="0" aria-label="Select ${room.name}">
        <div class="room-select-img">
          <img src="${room.image}" alt="${room.name}" loading="lazy" />
        </div>
        <div class="room-select-info">
          <h4>${room.name}</h4>
          <div class="room-select-price">$${room.pricePerNight} / night</div>
          <div class="room-select-features">
            ${room.features.map((f) => `<span class="room-feature-tag">${f}</span>`).join("")}
          </div>
        </div>
      </div>
    `
    ).join("");

    grid.querySelectorAll(".room-select-card").forEach((card) => {
      card.addEventListener("click", () => selectRoom(card.dataset.roomId));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") selectRoom(card.dataset.roomId);
      });
    });
  }

  function selectRoom(roomId) {
    state.selectedRoom = ROOMS.find((r) => r.id === roomId) || null;

    document.querySelectorAll(".room-select-card").forEach((card) => {
      card.classList.toggle("selected", card.dataset.roomId === roomId);
    });

    if (state.selectedRoom && summaryRoomName) {
      summaryRoomName.textContent = state.selectedRoom.name;
      summaryRoomType.textContent = state.selectedRoom.type;
    }

    updateTotals();
  }

  buildRoomCards();

  /* ============================================
     STEP 3: EXTRAS
     ============================================ */
  function buildExtras() {
    const grid = document.getElementById("extras-grid");
    if (!grid) return;

    grid.innerHTML = EXTRAS.map(
      (extra) => `
      <div class="extra-item" data-extra-id="${extra.id}" role="checkbox" tabindex="0" aria-checked="false">
        <div class="extra-checkbox" aria-hidden="true"></div>
        <div class="extra-info">
          <div class="extra-name">${extra.icon} ${extra.name}</div>
          <div class="extra-price">$${extra.price}${extra.perNight ? " / night" : " one-time"}</div>
        </div>
      </div>
    `
    ).join("");

    grid.querySelectorAll(".extra-item").forEach((item) => {
      const toggle = () => {
        const extraId = item.dataset.extraId;
        const idx = state.selectedExtras.indexOf(extraId);
        if (idx > -1) {
          state.selectedExtras.splice(idx, 1);
          item.classList.remove("selected");
          item.setAttribute("aria-checked", "false");
          item.querySelector(".extra-checkbox").textContent = "";
        } else {
          state.selectedExtras.push(extraId);
          item.classList.add("selected");
          item.setAttribute("aria-checked", "true");
          item.querySelector(".extra-checkbox").textContent = "✓";
        }
        updateTotals();
      };
      item.addEventListener("click", toggle);
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") toggle();
      });
    });
  }

  buildExtras();

  /* ============================================
     TOTALS CALCULATION
     ============================================ */
  function getExtrasCost() {
    return state.selectedExtras.reduce((total, extraId) => {
      const extra = EXTRAS.find((e) => e.id === extraId);
      if (!extra) return total;
      return total + (extra.perNight ? extra.price * state.nights : extra.price);
    }, 0);
  }

  function updateTotals() {
    const roomCost = state.selectedRoom
      ? state.selectedRoom.pricePerNight * state.nights
      : 0;
    const extrasCost = getExtrasCost();
    const total = roomCost + extrasCost;

    if (summaryRoomCost) {
      summaryRoomCost.textContent =
        state.selectedRoom && state.nights > 0
          ? `$${roomCost.toLocaleString()}`
          : "—";
    }

    // Update extras list in summary
    if (summaryExtrasList) {
      if (state.selectedExtras.length === 0) {
        summaryExtrasList.innerHTML =
          '<div class="summary-line extras-line"><span>No extras selected</span><span>—</span></div>';
      } else {
        summaryExtrasList.innerHTML = state.selectedExtras
          .map((extraId) => {
            const extra = EXTRAS.find((e) => e.id === extraId);
            if (!extra) return "";
            const cost = extra.perNight ? extra.price * state.nights : extra.price;
            return `<div class="summary-line extras-line"><span>${extra.name}</span><span>$${cost}</span></div>`;
          })
          .join("");
      }
    }

    if (summaryTotal) {
      summaryTotal.textContent = total > 0 ? `$${total.toLocaleString()}` : "$0";
    }

    if (summaryTotalNights && state.nights > 0) {
      summaryTotalNights.textContent = `${state.nights} night${state.nights > 1 ? "s" : ""}`;
    }
  }

  /* ============================================
     STEP 4: GUEST INFORMATION
     ============================================ */
  function collectGuestInfo() {
    const fields = ["first-name", "last-name", "email", "phone", "country", "special-requests"];
    const info = {};
    fields.forEach((field) => {
      const el = document.getElementById(field);
      if (el) info[field] = el.value;
    });
    state.guestInfo = info;
  }

  /* ============================================
     VALIDATION
     ============================================ */
  function validateCurrentStep() {
    switch (state.currentStep) {
      case 1:
        if (!state.checkIn || !state.checkOut) {
          showError("Please select your check-in and check-out dates.");
          return false;
        }
        if (state.nights < 1) {
          showError("Check-out must be after check-in.");
          return false;
        }
        return true;

      case 2:
        if (!state.selectedRoom) {
          showError("Please select a room to continue.");
          return false;
        }
        return true;

      case 3:
        return true; // Extras are optional

      case 4:
        const firstName = document.getElementById("first-name");
        const email = document.getElementById("email");
        if (!firstName?.value.trim() || !email?.value.trim()) {
          showError("Please fill in your name and email address.");
          return false;
        }
        if (!isValidEmail(email.value)) {
          showError("Please enter a valid email address.");
          return false;
        }
        collectGuestInfo();
        return true;

      default:
        return true;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(message) {
    // Remove existing error
    const existingError = document.querySelector(".booking-error");
    if (existingError) existingError.remove();

    const error = document.createElement("div");
    error.className = "booking-error";
    error.textContent = message;
    error.style.cssText = `
      background: rgba(220,60,60,0.1);
      border: 1px solid rgba(220,60,60,0.3);
      color: #ff8888;
      padding: 14px 20px;
      font-size: 0.78rem;
      letter-spacing: 0.5px;
      margin-top: 16px;
      animation: fadeUp 0.3s ease;
    `;

    const activePanel = document.querySelector(".form-panel.active");
    if (activePanel) {
      const nav = activePanel.querySelector(".form-nav");
      if (nav) nav.before(error);
      setTimeout(() => error.remove(), 4000);
    }
  }

  /* ============================================
     FORM SUBMISSION
     ============================================ */
  const submitBtn = document.getElementById("submit-booking");
  if (submitBtn) {
    submitBtn.addEventListener("click", handleSubmit);
  }

  async function handleSubmit() {
    if (!validateCurrentStep()) return;

    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // Generate booking reference
    state.bookingRef = generateBookingRef();

    // Store in sessionStorage for confirmation page
    sessionStorage.setItem(
      "velora_booking",
      JSON.stringify({
        ref: state.bookingRef,
        room: state.selectedRoom?.name || "—",
        checkIn: formatDate(state.checkIn),
        checkOut: formatDate(state.checkOut),
        nights: state.nights,
        guests: state.adults + state.children,
        total: state.selectedRoom
          ? state.selectedRoom.pricePerNight * state.nights + getExtrasCost()
          : 0,
        guest: `${state.guestInfo["first-name"] || ""} ${state.guestInfo["last-name"] || ""}`.trim(),
        email: state.guestInfo["email"] || "",
      })
    );

    window.location.href = "confirmation.html";
  }

  /* ============================================
     HELPERS
     ============================================ */
  function generateBookingRef() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let ref = "VLR-";
    for (let i = 0; i < 8; i++) {
      ref += chars[Math.floor(Math.random() * chars.length)];
    }
    return ref;
  }

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  /* ============================================
     HOMEPAGE BOOKING BAR
     ============================================ */
  const homepageBookingForm = document.getElementById("homepage-booking");
  if (homepageBookingForm) {
    // Set min dates
    const ciInput = homepageBookingForm.querySelector("#hp-checkin");
    const coInput = homepageBookingForm.querySelector("#hp-checkout");
    const todayStr = new Date().toISOString().split("T")[0];

    if (ciInput) ciInput.min = todayStr;
    if (coInput) coInput.min = todayStr;

    if (ciInput) {
      ciInput.addEventListener("change", () => {
        if (coInput) {
          coInput.min = ciInput.value;
          if (coInput.value && coInput.value <= ciInput.value) {
            const nd = new Date(ciInput.value);
            nd.setDate(nd.getDate() + 1);
            coInput.value = nd.toISOString().split("T")[0];
          }
        }
      });
    }

    homepageBookingForm.querySelector("[data-booking-submit]")?.addEventListener("click", () => {
      const ci = ciInput?.value;
      const co = coInput?.value;
      const guests = homepageBookingForm.querySelector("#hp-guests")?.value || "2";

      if (!ci || !co) {
        alert("Please select your check-in and check-out dates.");
        return;
      }

      const params = new URLSearchParams({ checkIn: ci, checkOut: co, adults: guests });
      window.location.href = `booking.html?${params.toString()}`;
    });
  }

  /* ---- Pre-fill booking page from URL params ---- */
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("checkIn") && checkInInput) {
    checkInInput.value = urlParams.get("checkIn");
    state.checkIn = checkInInput.value;
  }
  if (urlParams.has("checkOut") && checkOutInput) {
    checkOutInput.value = urlParams.get("checkOut");
    state.checkOut = checkOutInput.value;
  }
  if (urlParams.has("adults") && adultsInput) {
    adultsInput.value = urlParams.get("adults");
    state.adults = parseInt(adultsInput.value, 10);
  }

  updateDateSummary();

  /* ============================================
     CONFIRMATION PAGE
     ============================================ */
  function loadConfirmationData() {
    const confPage = document.getElementById("confirmation-data");
    if (!confPage) return;

    const booking = JSON.parse(sessionStorage.getItem("velora_booking") || "null");
    if (!booking) {
      confPage.innerHTML = "<p>No booking data found. <a href='booking.html'>Make a reservation</a></p>";
      return;
    }

    document.getElementById("conf-ref").textContent = booking.ref;
    document.getElementById("conf-guest").textContent = booking.guest || "Valued Guest";
    document.getElementById("conf-room").textContent = booking.room;
    document.getElementById("conf-checkin").textContent = booking.checkIn;
    document.getElementById("conf-checkout").textContent = booking.checkOut;
    document.getElementById("conf-nights").textContent = `${booking.nights} night${booking.nights !== 1 ? "s" : ""}`;
    document.getElementById("conf-guests").textContent = `${booking.guests} guest${booking.guests !== 1 ? "s" : ""}`;
    document.getElementById("conf-total").textContent = `$${booking.total.toLocaleString()}`;
    document.getElementById("conf-email").textContent = booking.email;
  }

  loadConfirmationData();
})();
