<div align="center">
  <img src="images/logo.png" alt="Yv EdTech Logo" width="80" />
  <h1>Yv EdTech Content Solutions</h1>
  <p>
    <strong>End-to-End Educational Content Platform</strong>
  </p>
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Responsive-Yes-00C853" alt="Responsive" />
    <img src="https://img.shields.io/badge/License-MIT-blue" alt="License" />
  </p>
</div>

---

## Project Overview

**Yv EdTech Content Solutions** is a professional multi-page corporate website built for an educational content services company. The platform showcases the company's full range of academic content solutions — from alt-text authoring and copy editing to workflow automation and mock test development.

Designed with a clean, accessible, and responsive interface, the website serves as a digital storefront to attract publishers, edtech companies, academic institutions, and independent educators. It combines modern UI animations with a professional content-first layout to communicate trust, expertise, and scalability.

---

## Live Demo

            https://abishek492004.github.io/Yv-Edtech-Content-Solution/
---

## Features

| Feature | Description |
|---|---|
| **Multi-page Navigation** | Six interconnected pages with a consistent navbar and footer |
| **Fixed Navbar** | Sticky navigation with scroll shadow and mobile hamburger menu |
| **Hero Typing Effect** | Animated typewriter effect on the home page heading |
| **Decorative Animations** | Rotating and pulsing geometric shapes (circle, square, diamond, ring) |
| **Logo Carousel** | Infinite horizontal scroll showcasing trusted client logos |
| **Scroll-Reveal Animations** | Elements fade and slide up as they enter the viewport via IntersectionObserver |
| **Card Tilt Effect** | 3D perspective tilt on service cards on mouse move |
| **Button Ripple Effect** | Click ripple animation on all interactive buttons |
| **Animated Counters** | Number counters that animate on scroll (e.g. years of experience) |
| **Contact Form** | Functional form with input focus effects, validation, and success feedback |
| **Back-to-Top Button** | Floating button appears on scroll for quick navigation |
| **Careers Section** | Dedicated page with job application sidebar and selection process info |
| **Parallax Shapes** | Decorative elements move at different speeds on scroll |
| **Smooth Anchors** | Internal links scroll smoothly to target sections |
| **Active Link Highlighting** | Current page is visually indicated in the navigation |
| **Accessibility** | `prefers-reduced-motion` support, semantic HTML, alt text on images |

---

## Website Pages

| Page | File | Description |
|---|---|---|
| **Home** | `index.html` | Hero section with typing effect, service overview cards, client logo slider, company introduction |
| **About Us** | `about.html` | Company mission, vision, core values, differentiators, and team philosophy |
| **Why We?** | `why-we.html` | Detailed value proposition — quality, scalability, AI integration, cost-effectiveness, confidentiality |
| **Services** | `services.html` | 10 detailed service cards in a grid layout with numbered badges and hover effects |
| **Careers** | `careers.html` | Remote work opportunities, hiring process, applicant criteria, and apply sidebar |
| **Contact Us** | `contact.html` | Contact form, phone/email/address info boxes, and illustration |

---

## Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure and accessible markup |
| **CSS3** | Layout (Flexbox, Grid), animations, responsive design, custom properties |
| **JavaScript (Vanilla ES6)** | DOM manipulation, IntersectionObserver API, event handling, animation logic |
| **Google Fonts** | Roboto, Inter, Margarine, Satisfy, Nunito — typography and brand personality |
| **VS Code** | Development environment |

No frameworks, build tools, or external libraries were used. The entire site is hand-coded in vanilla HTML, CSS, and JavaScript.

---

## Folder Structure

```
Yv Edtech/
├── .vscode/
│   └── launch.json
├── images/
│   ├── about-us-removebg-preview.png
│   ├── about-us.png
│   ├── about-us1.png
│   ├── alt text.jpg
│   ├── amnet-logo.jpg
│   ├── codemantra logo.png
│   ├── CONTACT.png
│   ├── logo.png
│   ├── Mock.jpg
│   ├── mps-logo-png.png
│   ├── question_mark.png
│   └── Straive logo.jpeg
├── index.html
├── about.html
├── why-we.html
├── services.html
├── careers.html
├── contact.html
├── styles.css
├── script.js
└── README.md
```

---

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/yv-edtech.git
   cd yv-edtech
   ```

2. **Open in a browser:**

   Simply open `index.html` in any modern browser:

   ```bash
   open index.html        # macOS
   start index.html       # Windows
   xdg-open index.html    # Linux
   ```

   No build steps or dependencies are required.

---

## Usage Instructions

- Navigate between pages using the **fixed navigation bar** at the top.
- On **mobile devices** (≤900px), the navigation collapses into a **hamburger menu** that slides in from the right.
- Scroll down any page to see **scroll-reveal animations** — elements fade and slide up smoothly.
- Hover over **service cards** to see the **3D tilt effect**, glow shadow, and image rotation.
- Click any **button** to see the **ink ripple effect**.
- Use the **back-to-top button** (orange circle in the bottom-right corner) to return to the top of the page.
- The **contact form** on the Contact page simulates a successful submission with a green confirmation message.
- The **client logo slider** on the home page is paused on hover for easy viewing.
- The **careers page** includes an "Apply Now" button and links to assessment details.

---

## Responsive Design Details

The website is fully responsive across three breakpoints:

| Breakpoint | Target Devices | Layout Changes |
|---|---|---|
| **≤ 600px** | Mobile phones | Single-column layouts, reduced font sizes, smaller card padding, hidden decorative shapes, logo slider shrinks |
| **601px – 900px** | Tablets | 2-column service grids, hamburger navigation appears, adjusted spacing |
| **≥ 901px** | Desktop | Full multi-column layouts, horizontal navbar, hover-based interactions enabled |

Additional responsive features:
- Fluid typography scales down on smaller viewports
- Images use `max-width: 100%` to avoid overflow
- The mobile navigation menu locks body scroll when open (`body.yv-no-scroll`)
- `justify-content: center` on flex containers ensures centered alignment across devices

---

## Performance & Optimization

- **Vanilla code — zero dependencies.** No frameworks, no bloated libraries. Fast load times.
- **IntersectionObserver** for scroll animations — efficient, offloaded from the main thread, and auto-cleans up with `unobserve()`.
- **`will-change: transform`** on animated elements hints the browser for GPU-accelerated compositing.
- **`prefers-reduced-motion`** respected throughout — animations are disabled for users who prefer reduced motion.
- **Touch-device detection** — the tilt effect is skipped on devices that don't support hover, preventing janky interactions.
- **Logo slider** — uses CSS `translate3d` for GPU-accelerated infinite scroll, with image-load-aware restart logic.
- **Passive scroll listeners** — scroll events use `{ passive: true }` for smoother scrolling performance.

---

## Browser Compatibility

| Browser | Status |
|---|---|
| Chrome (latest) | ✅ Fully supported |
| Firefox (latest) | ✅ Fully supported |
| Safari (latest) | ✅ Fully supported |
| Edge (latest) | ✅ Fully supported |
| Opera (latest) | ✅ Fully supported |
| Samsung Internet | ✅ Supported |
| iOS Safari | ✅ Supported |

The site uses widely-supported standards (CSS Grid, Flexbox, CSS Custom Properties, IntersectionObserver, ES6). Internet Explorer is not supported.

---
## Future Improvements

- [ ] Integrate a **backend contact form** (PHP, Node.js, or Formspree) for real email delivery
- [ ] Add a **blog or resources section** for SEO and thought leadership
- [ ] Implement **dark mode** toggle with CSS custom properties
- [ ] Add **lazy loading** for off-screen images using `loading="lazy"`
- [ ] Include **schema.org structured data** (LocalBusiness, Organization) for better SEO
- [ ] Set up a **CI/CD pipeline** for automated deployment to Netlify or Vercel
- [ ] Add **unit tests** for JavaScript modules (Jest or Vitest)
- [ ] Replace placeholder image sources with optimized WebP/AVIF formats
- [ ] Add a **testimonials carousel** with real client quotes

---

## Author

**Abishek S**  
<!-- - Portfolio: [abisheks.me](https://abisheks.me) (placeholder)   -->
- GitHub: [@abishek](https://github.com/Abishek492004) (placeholder)  
- Email: abishek04092004@gmail.com (placeholder)

> This project was developed as a professional website for Yv EdTech Content Solutions.

---

## Acknowledgements

- **Google Fonts** for the typography suite
- **Icons8** for service card icons
- **BroLabs Innovation Pvt. Ltd.** for background and support
- All open-source contributors whose tools made this project possible

---

<div align="center">
  <sub>Built with ❤️ using vanilla HTML, CSS & JavaScript</sub>
  <br />
  <sub>&copy; 2025 Yv EdTech Content Solutions. All rights reserved.</sub>
</div>
