# Hotel Lasgidi — Luxury Hotel Website

A complete, production-ready multi-page hotel website built with pure HTML, CSS, and vanilla JavaScript. Dark luxury aesthetic with gold accents, cinematic imagery, and a full booking system.

---

## 📁 Project Structure

```
hotel-Lasgidi/
├── index.html              # Homepage — hero, booking bar, rooms preview, testimonials
├── rooms.html              # Rooms listing with filter by category
├── room-detail.html        # Dynamic room detail page (loads from URL param)
├── amenities.html          # Dining, spa, pool, fitness, events, concierge
├── gallery.html            # Masonry photo gallery with lightbox & filter
├── about.html              # History, timeline, team, awards, values
├── contact.html            # Contact form, directions, department contacts
├── booking.html            # 4-step reservation system
├── confirmation.html       # Booking confirmation page
├── css/
│   ├── style.css           # Global styles, design system, nav, footer, animations
│   └── booking.css         # Booking form, steps, room cards, summary sidebar
├── js/
│   ├── main.js             # Navigation, scroll animations, lightbox, sliders
│   └── booking.js          # Full booking logic, state management, validation
└── README.md
```

---

## ✨ Features

### Design
- Dark luxury palette — deep charcoal/black with warm gold (#C9A96E) accents
- Typography: Cormorant Garamond (display) + Montserrat (body) + Playfair Display (accent)
- Fully responsive — mobile, tablet, desktop
- Smooth scroll-triggered animations (fade-in, fade-left, fade-right)
- Parallax hero section
- CSS custom properties (design tokens) throughout

### Pages
| Page | Key Features |
|------|-------------|
| **Homepage** | Full-screen hero with parallax, live booking bar, stats counters, testimonial slider, rooms preview, CTA section |
| **Rooms** | Filterable grid (All / Classic / Deluxe / Suite / Penthouse), featured layout for penthouse |
| **Room Detail** | Dynamic content loaded from URL params, gallery hero, sidebar booking widget with live price calculation |
| **Amenities** | Dining venues, spa treatments grid, pool/fitness, events spaces, concierge |
| **Gallery** | Masonry grid, category filter, hover overlays, keyboard-accessible lightbox |
| **About** | Story section, interactive timeline, team cards, awards grid, values blocks |
| **Contact** | Contact form with success state, directions tabs (car/transit/airport), department contacts, newsletter signup |
| **Booking** | 4-step wizard (Dates → Room → Extras → Details), live summary sidebar, client-side validation, sessionStorage handoff |
| **Confirmation** | Booking reference display, full details loaded from sessionStorage |

### Booking System
- Multi-step form with progress indicator
- Room selection cards with pricing
- Extras/add-ons (breakfast, transfers, spa package, etc.)
- Live total calculation in sidebar
- URL parameter pre-fill (from homepage bar or room detail pages)
- Client-side form validation with error messages
- Simulated booking confirmation + redirect

---

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in any modern browser — no build tools required.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code
Install "Live Server" extension → right-click index.html → Open with Live Server
```

---

## 🎨 Design Customisation

All design tokens are in `css/style.css` under `:root`:

```css
:root {
  --gold: #C9A96E;           /* Primary accent */
  --gold-light: #E8D5A3;     /* Hover / italic text */
  --gold-dark: #9A7A45;      /* Borders / subtle gold */
  --black: #0A0A0A;          /* Page background */
  --dark: #111111;           /* Section backgrounds */
  --dark-2: #1A1A1A;         /* Card backgrounds */
  --white: #F5F0E8;          /* Body text */
  --grey: #888888;           /* Secondary text */
}
```

---

## 🏨 Room Configuration

Room data and pricing are defined in `js/booking.js`:

```javascript
const ROOMS = [
  {
    id: "deluxe-king",
    name: "Deluxe King Room",
    type: "Deluxe",
    pricePerNight: 320,
    maxGuests: 2,
    features: ["King Bed", "City View", "450 sqft"],
  },
  // ... add more rooms here
];
```

Extras/add-ons are also defined in the same file under `const EXTRAS`.

---

## 🔌 Backend Integration

The booking system is currently frontend-only. To connect to a real backend:

1. In `js/booking.js`, find the `handleSubmit()` function
2. Replace the `setTimeout` simulation with a real `fetch()` POST request:

```javascript
async function handleSubmit() {
  // Replace simulation with:
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  });
  const data = await response.json();
  state.bookingRef = data.bookingRef;
  sessionStorage.setItem('Lasgidi_booking', JSON.stringify({ ... }));
  window.location.href = 'confirmation.html';
}
```

---

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Uses: CSS Grid, CSS Custom Properties, IntersectionObserver, sessionStorage — all widely supported.

---

## 📦 Dependencies

Zero npm dependencies. All fonts loaded via Google Fonts CDN.

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:...&family=Montserrat:...&display=swap" rel="stylesheet" />
```

All images are served from Unsplash CDN (free for development). Replace with licensed images before production deployment.

---

## 📋 Pre-Launch Checklist

- [ ] Replace all Unsplash images with licensed hotel photography
- [ ] Update contact details, phone numbers, and email addresses
- [ ] Update hotel address and Google Maps embed
- [ ] Configure backend booking API endpoint
- [ ] Set up email confirmation system (Sendgrid / Mailgun / etc.)
- [ ] Add real Google Maps embed to contact page
- [ ] Configure payment gateway (Stripe / Paystack / Flutterwave) if needed
- [ ] Set up SSL certificate (required for any form submissions in production)
- [ ] Add Google Analytics or preferred analytics
- [ ] Test all forms and booking flow end-to-end
- [ ] Minify CSS and JS for production

---

## 🛠️ Built With

- **HTML5** — Semantic markup throughout
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Google Fonts** — Cormorant Garamond, Montserrat, Playfair Display
- **Unsplash** — Placeholder imagery (replace for production)

---

## 📄 License

Built for Hotel Lasgidi. All rights reserved.

---

*Crafted with precision by CraftSynq — build, grow, and engage.*
*[craftsynq.com](https://craftsynq.com)*
