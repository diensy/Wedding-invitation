// Edit this file to customise every piece of content on the invitation.

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type WeddingEvent = {
  name: string;
  date: string;
  // Leave empty to hide the time line.
  time: string;
  location: string;
  description: string;
  icon: "henna" | "sun" | "music" | "rings" | "glass";
};

export type GalleryPhoto = { src: string; alt: string; tall?: boolean };

export const wedding = {
  bride: {
    firstName: "Archana",
    fullName: "Archana Mohapatra",
    parents: "Daughter of Mr. Ananta Prasad Mohapatra & Mrs. Nirupama Mohapatra",
    photo: img("1525258946800-98cfd641d0de", 900),
  },
  groom: {
    firstName: "Pintu",
    fullName: "Pintu Lenka",
    parents: "Son of Mr. Pradeep Lenka & Mrs. Lili Lata Lenka",
    photo: img("1600091166971-7f9faad6c1e2", 900),
  },

  // ISO date-time with timezone offset. Drives the countdown.
  dateISO: "2026-12-02T00:00:00+05:30",
  dateLong: "Wednesday, 2nd December 2026",
  dateShort: "02 . 12 . 2026",
  time: "",

  venue: {
    name: "Salijanga",
    city: "Jagatsinghpur, Odisha",
    address: "Salijanga, Jagatsinghpur, Odisha",
    mapUrl: "https://maps.google.com/?q=Salijanga+Jagatsinghpur+Odisha",
    image: img("1523438885200-e635ba2c371e", 1400),
  },

  heroImage: img("1610173826608-bd1f53a52db1", 1600),
  hashtag: "#ArchanaWedsPintu",

  invitationLine:
    "Together with their families, joyfully request the pleasure of your company at the celebration of their marriage",

  events: [
    {
      name: "Haldi",
      date: "Tuesday, 1st December 2026",
      time: "",
      location: "Salijanga, Jagatsinghpur",
      description: "A splash of turmeric, marigolds and plenty of laughter.",
      icon: "sun",
    },
    {
      name: "Mehendi",
      date: "Tuesday, 1st December 2026",
      time: "",
      location: "Salijanga, Jagatsinghpur",
      description: "Henna, folk songs and a joyful gathering of family.",
      icon: "henna",
    },
    {
      name: "Wedding Ceremony",
      date: "Wednesday, 2nd December 2026",
      time: "",
      location: "Salijanga, Jagatsinghpur",
      description: "The sacred rituals as two families become one.",
      icon: "rings",
    },
  ] satisfies WeddingEvent[],

  dressCode: {
    title: "Royal Indian Formal",
    note: "We would love to see you in traditional or Indo-western attire. Rich jewel tones are encouraged. Kindly avoid wearing white and black.",
    women: ["Lehengas & sarees", "Anarkali suits", "Statement jewellery"],
    men: ["Sherwanis & bandhgalas", "Kurta with Nehru jacket", "Safas welcome"],
    palette: [
      { name: "Burgundy", hex: "#6d0f1f" },
      { name: "Rose Red", hex: "#a3172b" },
      { name: "Blush", hex: "#efc7c2" },
      { name: "Ivory", hex: "#f7efe1" },
      { name: "Antique Gold", hex: "#c9a24b" },
      { name: "Emerald", hex: "#1f5c47" },
    ],
  },

  gallery: [
    { src: img("1583939003579-730e3918a45a"), alt: "Couple kissing in a shower of confetti", tall: true },
    { src: img("1519741497674-611481863552"), alt: "Bride holding a bouquet in golden light" },
    { src: img("1545232979-8bf68ee9b1af"), alt: "Henna-adorned hands held together" },
    { src: img("1591604466107-ec97de577aff"), alt: "Bride and groom smiling together", tall: true },
    { src: img("1460978812857-470ed1c77af0"), alt: "Black and white portrait under a veil" },
    { src: img("1469371670807-013ccf25f16a"), alt: "Floral wedding aisle" },
    { src: img("1606216794074-735e91aa2c92"), alt: "Couple laughing beneath palm trees", tall: true },
    { src: img("1544078751-58fee2d8a03b"), alt: "Couple dancing on a black sand beach" },
    { src: img("1515934751635-c81c6bc9a2d8"), alt: "Wedding rings resting on pink roses" },
  ] satisfies GalleryPhoto[],

  rsvpDeadline: "25th November 2026",
  footerMessage:
    "Thank you for being part of our story. Your love, laughter and blessings mean the world to us.",
} as const;

export type Wedding = typeof wedding;
