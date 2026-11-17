"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Envelope from "./Envelope";
import { FloralDefs } from "./Floral";
import Hero from "./Hero";
import Couple from "./Couple";
import WeddingDetails from "./WeddingDetails";
import Countdown from "./Countdown";
import Itinerary from "./Itinerary";
import Gallery from "./Gallery";
import DressCode from "./DressCode";
import RSVP from "./RSVP";
import Footer from "./Footer";

export default function InvitationExperience() {
  const [opened, setOpened] = useState(false);
  const handleOpened = useCallback(() => setOpened(true), []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    if (opened) window.scrollTo({ top: 0 });
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <FloralDefs />
      <AnimatePresence>{!opened && <Envelope key="envelope" onOpened={handleOpened} />}</AnimatePresence>
      {/* Mounted behind the envelope so images load early and opening doesn't stall on a big render. */}
      <main inert={!opened} aria-hidden={!opened}>
        <Hero ready={opened} />
        <Couple />
        <WeddingDetails />
        <Countdown />
        <Itinerary />
        <Gallery />
        <DressCode />
        <RSVP />
        <Footer />
      </main>
    </>
  );
}
