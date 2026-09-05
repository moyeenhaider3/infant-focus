# Infant Focus: Visual Development Flashcards (0–4m)

[![Deploy to GitHub Pages](https://github.com/moyeenhaider3/infant-focus/actions/workflows/deploy.yml/badge.svg)](https://github.com/moyeenhaider3/infant-focus/actions/workflows/deploy.yml)
[![Live App](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-black?style=flat&logo=github)](https://moyeenhaider3.github.io/infant-focus/)

> **A Father's Dedication:**  
> *"Made by a father with love for **Mohammad Hasnain**, born on 23 August 2026 at 6:42 PM. Built to stimulate his early visual curiosity and support parents around the world."*

🌐 **Live Deployed Application:**  
👉 **[https://moyeenhaider3.github.io/infant-focus/](https://moyeenhaider3.github.io/infant-focus/)**

---

## 📖 Overview

**Infant Focus** is an evidence-based, zero-friction infant visual stimulation web app tailored for newborns aged 0 to 4 months. Built specifically for exhausted parents and restless babies, it requires **zero account creation, zero configuration, zero advertisements, and zero onboarding friction**. Parents can launch biologically calibrated high-contrast visual flashcards in **two taps or fewer**.

---

## 🧠 The Problem & Pediatric Science

### The Developmental Problem
1. **Newborn Visual Acuity is Approximately 20/400:**  
   At birth, the fovea centralis and cone photoreceptors in an infant's retina are immature. Newborns cannot differentiate pastel shades, muted colors, or low-contrast patterns; they perceive the world as a hazy, low-contrast blur.
2. **Cortical Synaptogenesis Window:**  
   During the first 16 weeks of life, visual input directly shapes dendritic arborization and synaptic density in the Primary Visual Cortex (Area V1). Lack of focused visual contrast can delay visual tracking and binocular fixation.
3. **Friction-Heavy Existing Apps:**  
   Most modern parenting apps force users through intrusive paywalls, long onboarding questionnaires (gender, birth weight, names), distracting audio ads, or complicated navigation trees that are impossible to operate one-handed during a 3:00 AM feed.
4. **Physical Flashcard Limitations:**  
   Paper flashcards can tear, get soiled, lack rhythmic auto-flip pacing, cannot provide smooth lateral tracking motions during tummy time, and cannot invert contrast on demand for tired eyes.

---

## 🔬 Scientific Foundation

Infant Focus is engineered directly according to developmental vision studies:

| Science Concept | Research Citation | How Infant Focus Implements It |
| :--- | :--- | :--- |
| **High-Contrast Preference** | *Robert L. Fantz (1961), "The Origin of Form Perception", Science* | 100% vector SVGs with absolute black `#000000` and pure white `#FFFFFF` boundary gradients. |
| **Schematic Facial Imprinting** | *Mark H. Johnson et al. (1991), "Newborns' preferential tracking of face-like stimuli"* | High-contrast schematic facial cards with top-heavy pupil and mouth contrast mimicking human faces. |
| **Chromatic Progression (Red first)** | *D. Maurer & C. E. Maurer (1988), "The World of the Newborn"* | Stage 2 introduces bold crimson red (`#E11D48` / `#DC2626`), the first wavelength of chromatic light newborn long-wavelength cones perceive. |
| **Focal Distance Calibration** | *I. W. Bushnell (2001), "Mother's face recognition in newborn infants"* | Persistent reminders to hold the screen **8–12 inches (20–30 cm)** away—the biological focal length of a newborn holding eye contact during feeding. |
| **Overstimulation Soft Stop** | *American Academy of Pediatrics (AAP) Infant Sleep & Stimulation Guidelines* | Automatic soft-stop pause at **3 minutes** with a calming wind-down screen explaining baby disengagement cues (averting gaze, yawning, fussing). |

---

## 🎯 The 4 Developmental Stages

Infant Focus organizes visual stimuli into 4 distinct, research-backed developmental milestones:

```
[Stage 1: 0–4 Weeks]  ──►  [Stage 2: 1–2 Months]  ──►  [Stage 3: 2–3 Months]  ──►  [Stage 4: 3–4+ Months]
Pure Black & White         First Red Chromatic Accents  Optical Spirals & Depth      Full Primary Spectrum
Macro Shapes & Faces       Bullseyes, Targets, Rings    Concentric Rings, Waves      Red, Yellow, Blue, Animals
```

1. **Stage 1 (0–4 Weeks): Pure High-Contrast Black & White**  
   - Simple geometric outlines, thick checkerboards, schematic faces, bold stripes.  
   - Stimulates basic retinal edge-detection cells.
2. **Stage 2 (1–2 Months): The Red Wavelength Emerges**  
   - Black and white backgrounds accented with bold red centers, bullseyes, and rings.  
   - Stimulates emerging L-cone (long wavelength) photoreceptors.
3. **Stage 3 (2–3 Months): Optical Patterns & Depth Exploration**  
   - Optical spirals, concentric radiating pulses, checkerboard vortexes, wave flows.  
   - Develops ocular accommodation, binocular convergence, and visual depth perception.
4. **Stage 4 (3–4+ Months): Primary Colors & Dynamic Form**  
   - Introduces pure red, yellow, and blue elements paired with expressive faces, familiar silhouettes, animals, and objects.  
   - Coordinates complex cortical form synthesis.

---

## ✨ Key Features

- **⚡ 2 Taps to First Flashcard:** Open the app, tap an age button, and cards begin immediately. No login, no account, no setup.
- **👁️ Lateral Eye-Tracking Mode:** A dedicated tracking mode that gently glides cards side-to-side across the screen, encouraging infant neck turning and ocular tracking during tummy time.
- **⏱️ Research-Backed Auto-Advance:** Switch between 5s, 7s, or 10s auto-flip intervals, or swipe freely with one hand.
- **🛡️ 3-Minute Sensory Protection:** Built-in session timer that gently pauses the session at 3 minutes to prevent sensory fatigue, offering clear disengagement guidance for parents.
- **🌓 Contrast Inverter:** Swap black-on-white and white-on-black with one tap to adapt to nursery lighting or baby preference.
- **🔔 Gentle Audio Chime:** Optional soft pure-tone flip cue to gently guide auditory-visual integration.
- **📊 Parent Motivation Log:** Client-side consistency tracker (stored privately in `localStorage`) to help parents maintain routine habits without scoring baby performance.
- **📱 One-Handed Ergonomics:** Touch targets calibrated to ≥48px with bottom-anchored controls designed for holding a baby in one arm.
- **❤️ The Story of Mohammad Hasnain:** In-app dedication modal celebrating the newborn who inspired the app's creation.

---

## 🚀 How to Use

### For Parents at Home

1. **Set the Stage:**  
   Find a calm time when baby is alert and content (e.g., after a diaper change or brief feed, but not right before sleep).
2. **Launch the App:**  
   Visit **[https://moyeenhaider3.github.io/infant-focus/](https://moyeenhaider3.github.io/infant-focus/)** on your phone, tablet, or laptop.
3. **Select Baby's Age:**  
   Tap **Stage 1 (0–4 Weeks)**, **Stage 2 (1–2 Months)**, **Stage 3 (2–3 Months)**, or **Stage 4 (3–4+ Months)**.
4. **Choose a Deck or Tap "Play All":**  
   Select a category (Shapes, Faces, Patterns, Animals, Objects) or tap **"Play All Cards"** for a varied session.
5. **Position the Screen:**  
   Hold or prop your device **8 to 12 inches (20 to 30 cm)** from your baby's eyes.
6. **Activate Tracking Mode (Optional):**  
   During tummy time, tap the **Tracking** button to let the card smoothly glide horizontally across the display.
7. **Watch Baby's Cues:**  
   Enjoy baby's gaze lock! When baby turns their head away, yawns, or fusses, end the session—the 3-minute soft stop will remind you.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Bundler:** Vite
- **Routing:** React Router v6 (`HashRouter` for zero-configuration GitHub Pages compatibility)
- **Styling:** Tailwind CSS (custom monochrome theme with `#E11D48` scientific crimson accents)
- **Animations:** `motion/react` (Framer Motion)
- **Icons:** `lucide-react`
- **Audio Synthesis:** Web Audio API (gentle sine-wave chime, zero external assets)
- **Deployment:** GitHub Actions (`actions/deploy-pages@v4`, `actions/upload-pages-artifact@v3`)
- **Persistence:** Local Storage (private to user's device, zero trackers)

---

## 💻 Local Development Setup

To run this project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/moyeenhaider3/infant-focus.git

# 2. Navigate to project root
cd infant-focus

# 3. Install dependencies
npm install

# 4. Start the local development server
npm run dev

# 5. Open browser at http://localhost:3000
```

### Production Build

```bash
# Compile and bundle static files into /dist
npm run build

# Run TypeScript linter
npm run lint
```

---

## 🔄 Deployment Pipeline

This repository is continuously deployed to GitHub Pages via `.github/workflows/deploy.yml`:

- **Triggers:** Push to `main` or manual trigger via `workflow_dispatch`.
- **Runner:** Ubuntu Latest with Node.js 22.
- **Workflow:** Installs dependencies, runs `npm run build`, uploads `./dist` as an artifact, and deploys to the official `github-pages` environment.

---

## 📄 License & Attribution

Created with love by **Moyeen** for **Mohammad Hasnain** (born 23 August 2026 at 6:42 PM).  
Distributed under the **MIT License**. Open source, ad-free, and dedicated to the healthy visual and cognitive development of infants everywhere.
