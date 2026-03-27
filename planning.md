# NextGen Energy Innovators Challenge 2026
## Website Planning & Design System Document

This document defines the design, UX direction, structure, and implementation constraints for the NextGen Energy Innovators Challenge website.

The goal is to build a premium, modern, non-generic experience using:
- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion

This MUST NOT look like a generic AI SaaS template.

---

# 1. Design Philosophy

## 1.1 Overall Feel

- Bold
- Institutional but innovative
- Clean
- Confident
- Tech-forward
- Energy-focused
- Academic excellence meets industrial innovation

This is NOT:
- A startup landing page
- A crypto website
- A generic SaaS dashboard
- A template-style hero + 3 cards layout

---

# 2. Color System (Inspired by Flyer)

Primary palette should be derived from the flyer:

- Deep Energy Blue (Primary Background)
- Electric Blue Accent
- Vibrant Yellow/Gold Accent
- Clean White
- Soft Muted Gray for secondary text

## Tailwind Color Tokens (define in tailwind.config)

Primary:
- primary-900 (deep blue background)
- primary-700
- primary-500 (interactive)
- primary-300 (subtle accents)

Accent:
- accent-yellow
- accent-glow (electric blue)

Neutral:
- neutral-900
- neutral-600
- neutral-300
- white

Use dark sections strategically. Avoid all-white layout.

---

# 3. Typography System

Avoid default Tailwind typography feel.

Use:
- Strong display font for headings
- Clean sans-serif for body

Hierarchy:

Hero H1:
- text-4xl mobile
- text-6xl desktop
- font-bold
- tight tracking

Section Headings:
- text-3xl desktop
- text-2xl mobile
- font-semibold

Body:
- text-base
- leading-relaxed
- max-w-3xl

No excessive center alignment. Use structured layout.

---

# 4. Layout Principles

## 4.1 Spacing

Use intentional spacing:
- section padding: py-24 desktop
- py-16 mobile
- container max width: max-w-7xl
- inner content: max-w-5xl

Avoid:
- cramped layouts
- excessive whitespace
- uneven spacing

---

# 5. Hero Section Rules

- Must feel immersive
- Video background with dark gradient overlay
- Overlay gradient from deep blue to transparent
- CTA button should use accent color (yellow)
- Add subtle animated background glow shapes

Avoid:
- Centered tiny text
- Generic “Welcome to our website”
- Basic two-button SaaS hero layout

Add:
- Countdown timer styled uniquely (not default boxes)
- Slight motion animation on headline entrance

---

# 6. Section Styling Rules

Each section must have visual identity:

About:
- Split layout
- Slight background contrast change

Themes:
- Dark background
- Glass-style cards or subtle border cards
- Hover lift animation
- Icons inside colored circular containers

Timeline:
- Not a basic vertical line
- Use structured milestone layout
- Alternating alignment on desktop

Updates:
- Real editorial feel
- Strong image presence
- Card layout with depth

FAQ:
- Minimalist accordion
- Clean separators
- Not boxed heavily

Sponsors:
- Grayscale logos
- Color on hover
- Generous spacing

---

# 7. Motion & Interaction Rules

Use Framer Motion sparingly.

Allowed:
- Fade + slight upward motion on scroll
- Subtle hover scale (1.02–1.05 max)
- Soft shadow transitions

Avoid:
- Bouncy animations
- Overly flashy transitions
- Parallax overload

This is an academic + innovation challenge, not a gaming site.

---

# 8. Anti-Generic Rules

The site MUST NOT:

- Use default Tailwind blue buttons
- Use rounded-full everywhere
- Use overly large border radius on cards
- Use overly common hero layouts
- Use placeholder AI copy like:
  “Empowering the future of innovation”

Content should be specific, structured, and institutional.

---

# 9. Content Structure Rules

Each section must:

- Have clear hierarchy
- Avoid filler text
- Avoid marketing fluff
- Be direct and professional

Example tone:
Professional.
Confident.
Clear.
Minimal hype.

---

# 10. Updates System Architecture

Updates must be:

- Data-driven
- Stored separately
- Scalable yearly
- Structured for future CMS integration

Design must feel like:
- Academic blog
- Event journal
- Innovation documentation

NOT:
- Medium clone
- Startup blog template

---

# 11. Reusability for Future Years

Year (2026) must be dynamic.

Avoid hardcoding:
- Dates
- Year references
- Themes

Use data files:
- /data/themes.ts
- /data/timeline.ts
- /data/updates.ts

So next year only data changes.

---

# 12. Performance Rules

- Use next/image always
- Optimize video size
- Lazy load non-critical sections
- Avoid unnecessary libraries
- Lighthouse target: 90+

---

# 13. Accessibility

- Proper heading order
- aria labels
- Keyboard navigation
- Focus states visible
- Sufficient color contrast

---

# 14. Final Quality Check

Before completion, verify:

Does this look like:
A serious university-industry innovation challenge?

Or:
A random AI-generated landing page?

If second → refine spacing, hierarchy, and color usage.

---

End of planning document.