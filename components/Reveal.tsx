"use client";

import { motion, type Variants } from "framer-motion";

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: keyof typeof variants;
  as?: "div" | "li" | "article";
};

export default function Reveal({ children, className, delay = 0, from = "up", as = "div" }: Props) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={variants[from]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
