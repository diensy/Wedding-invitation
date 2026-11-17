"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { wedding } from "@/config/wedding";
import { FloralCorner, GoldFlourish } from "./Floral";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Attending = "yes" | "no" | "";
type FormState = { name: string; guests: string; attending: Attending; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: "", guests: "1", attending: "", message: "" };

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!f.attending) e.attending = "Please let us know if you can attend.";
  const n = Number(f.guests);
  if (f.attending === "yes" && (!Number.isInteger(n) || n < 1 || n > 10)) e.guests = "Please choose between 1 and 10 guests.";
  if (f.message.length > 500) e.message = "Please keep your message under 500 characters.";
  return e;
}

const inputCls =
  "w-full rounded-sm border border-gold-500/40 bg-cream-50 px-4 py-3 text-lg text-wine-900 placeholder:text-wine-900/40 transition focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none";

export default function RSVP() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`rsvp-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    // Frontend only: simulate a short send, nothing leaves the browser.
    setStatus("sending");
    window.setTimeout(() => {
      setSubmitted(form);
      setStatus("sent");
    }, 1200);
  };

  const reset = () => {
    setForm(EMPTY);
    setSubmitted(null);
    setStatus("idle");
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-blush-100 px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Kindly respond" title="RSVP">
        Please reply by {wedding.rsvpDeadline}. We can&rsquo;t wait to celebrate with you.
      </SectionHeading>

      <Reveal from="zoom" className="relative mx-auto max-w-xl">
        <div className="bg-paper gold-frame relative overflow-hidden rounded-sm px-6 py-10 shadow-[0_30px_60px_-30px_rgba(86,10,22,0.6)] sm:px-12 sm:py-14">
          <FloralCorner className="pointer-events-none absolute -top-3 -left-3 w-20 sm:w-28" tones={["blush", "cream", "red"]} />
          <FloralCorner className="pointer-events-none absolute -top-3 -right-3 w-20 -scale-x-100 sm:w-28" tones={["blush", "cream", "red"]} />

          <AnimatePresence mode="wait">
            {status === "sent" && submitted ? (
              <motion.div
                key="thanks"
                className="py-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                role="status"
              >
                <motion.span
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-wine-700 shadow-xl ring-4 ring-gold-400/40"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                >
                  <Heart className="h-9 w-9 fill-gold-300 text-gold-300" />
                </motion.span>
                <h3 className="mt-6 font-script text-5xl text-wine-700">Thank you, {submitted.name.trim().split(" ")[0]}!</h3>
                <GoldFlourish className="mx-auto mt-3 h-4 w-44" />
                <p className="mt-5 text-lg leading-relaxed text-wine-900/80">
                  {submitted.attending === "yes"
                    ? `We are overjoyed that you'll be joining us${Number(submitted.guests) > 1 ? ` with a party of ${submitted.guests}` : ""}. See you in ${wedding.venue.city.split(",")[0]}!`
                    : "We will miss you dearly, and we're grateful for your love and blessings."}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 font-display text-xs tracking-[0.25em] text-gold-700 uppercase underline-offset-4 hover:underline"
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={onSubmit} className="relative space-y-6" exit={{ opacity: 0, y: -10 }}>
                <div>
                  <label htmlFor="rsvp-name" className="mb-2 block font-display text-xs tracking-[0.25em] text-gold-700 uppercase">
                    Your Name
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "rsvp-name-err" : undefined}
                    className={inputCls}
                  />
                  <FieldError id="rsvp-name-err" msg={errors.name} />
                </div>

                <fieldset>
                  <legend className="mb-2 block font-display text-xs tracking-[0.25em] text-gold-700 uppercase">Will you attend?</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        ["yes", "Joyfully accept"],
                        ["no", "Regretfully decline"],
                      ] as const
                    ).map(([value, label], i) => (
                      <label
                        key={value}
                        className={`flex cursor-pointer items-center justify-center rounded-sm border px-3 py-3 text-center text-lg transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-wine-600/30 ${
                          form.attending === value
                            ? "border-wine-600 bg-wine-700 text-cream-50 shadow-md"
                            : "border-gold-500/40 bg-cream-50 text-wine-900 hover:border-wine-600/60"
                        }`}
                      >
                        <input
                          id={i === 0 ? "rsvp-attending" : undefined}
                          type="radio"
                          name="attending"
                          value={value}
                          checked={form.attending === value}
                          onChange={() => set("attending", value)}
                          className="sr-only"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  <FieldError id="rsvp-attending-err" msg={errors.attending} />
                </fieldset>

                <AnimatePresence initial={false}>
                  {form.attending !== "no" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <label htmlFor="rsvp-guests" className="mb-2 block font-display text-xs tracking-[0.25em] text-gold-700 uppercase">
                        Number of Guests
                      </label>
                      <select
                        id="rsvp-guests"
                        value={form.guests}
                        onChange={(e) => set("guests", e.target.value)}
                        aria-invalid={!!errors.guests}
                        className={inputCls}
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                      <FieldError id="rsvp-guests-err" msg={errors.guests} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="rsvp-message" className="mb-2 block font-display text-xs tracking-[0.25em] text-gold-700 uppercase">
                    Message for the couple <span className="tracking-normal normal-case italic opacity-70">(optional)</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={4}
                    placeholder="Share your wishes..."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    className={`${inputCls} resize-none`}
                  />
                  <div className="flex justify-between">
                    <FieldError id="rsvp-message-err" msg={errors.message} />
                    <span className="mt-1 ml-auto text-sm text-wine-900/50">{form.message.length}/500</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-wine-700 via-wine-600 to-wine-700 px-6 py-4 font-display text-sm tracking-[0.3em] text-cream-50 uppercase shadow-lg transition hover:shadow-xl hover:brightness-110 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-wait disabled:opacity-80"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" /> Send RSVP
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p id={id} role="alert" className="mt-1 text-sm text-wine-600" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
