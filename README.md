# Happy Birthday Mumma ❤️

A premium, mobile-first emotional birthday journey — five cinematic chapters built with React, TypeScript, Vite, Tailwind, Framer Motion, GSAP, and more.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Journey (5 pages)

| Route | Page | Experience |
|-------|------|------------|
| `/` | Landing | Dreamy baby-pink mesh, particles, blobs, “Begin the Journey” |
| `/memories` | Happy memories | 3D flash card deck + infinite carousel |
| `/kun-faya-kun` | Kun Faya Kun | Custom audio player + tap envelope reveal |
| `/night` | Night aangan | Cinematic night sky, stars, shooting stars |
| `/finale` | Birthday finale | Mic blow / tap candles → confetti → gift → fullscreen video |

## Project structure

```
src/
├── routes/           # paths.ts, AppRoutes
├── layouts/          # ExperienceLayout (progress, nav, transitions)
├── pages/            # One page per chapter
├── components/
│   ├── backgrounds/  # DreamyPink, KunFaya, NightSky
│   ├── effects/      # Particles, confetti, hearts, shooting stars
│   ├── memories/     # FlashMemoryDeck, MemoriesCarousel
│   ├── kunfaya/      # CustomAudioPlayer, EnvelopeReveal
│   ├── finale/       # InteractiveCake, GiftBox, BirthdayVideoModal
│   ├── navigation/   # PageProgress, ExperienceNav
│   └── ui/           # PremiumButton, PageTitle, SectionContainer
├── hooks/            # useMicBlow, usePageTransition, useReducedMotion
├── data/             # memories.ts (your photos & captions)
├── lib/              # constants, gsap helpers
└── types/
public/assets/        # Your photos, audio, video (see public/assets/README.md)
```

## Personalize

1. **Photos** — Add files under `public/assets/memories/` (see `src/data/memories.ts` for names).
2. **Audio** — `public/assets/audio/kun-faya-kun.mp3` (and optional `gift-open.mp3`).
3. **Video** — `public/assets/video/birthday.mp4`.
4. **Copy** — Edit messages in `src/lib/constants.ts` and `src/data/memories.ts`.

## Tech

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- Framer Motion (UI / 3D flips)
- GSAP (backgrounds, carousel)
- React Router v7
- React Player (finale video)
- React Confetti + use-sound

## Build

```bash
npm run build
npm run preview
```
