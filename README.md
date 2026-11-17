# Luxury Animated Wedding Invitation

A cinematic, frontend-only digital wedding invitation built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Customise

All content lives in **`config/wedding.ts`**: names, parents, bios, photos, date and time (`dateISO` drives the countdown), venue, story timeline, events, dress code palette, gallery and footer text.

Photos are sample Unsplash images. To use your own, put files in `public/images/` and reference them as `/images/your-photo.jpg`.

## Structure

```
app/            layout (fonts, metadata), page, global theme and textures
components/
  InvitationExperience.tsx  envelope -> site orchestration
  Envelope.tsx              opening animation (flap, wax seal, card reveal)
  Floral.tsx                hand-built SVG roses, garlands, flourish, wax seal
  FloatingPetals.tsx        drifting petals
  Reveal.tsx / SectionHeading.tsx
  Hero, Couple, OurStory, WeddingDetails, Countdown,
  Itinerary, Gallery, DressCode, RSVP, Footer
config/wedding.ts           all editable content
```

The RSVP form only validates and shows a thank-you message. Nothing is sent or stored.
