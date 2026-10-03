"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Shirt from "@/components/Shirt";
import { products } from "@/lib/products";

const springy = { type: "spring", stiffness: 260, damping: 13, mass: 0.7 };
const soft = { type: "spring", stiffness: 210, damping: 22 };
const shadow = "drop-shadow(0 16px 12px rgba(60,40,15,0.22)) drop-shadow(0 3px 3px rgba(60,40,15,0.18))";
// each shirt hangs at a slightly different angle on the rail
const tilts = [-16, 10, -8, 14, -12, 8, -14, 12, -6, 15];
const pad = (n) => String(n).padStart(2, "0");

function Rack({ onOpen }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="no-scrollbar w-full overflow-x-auto overflow-y-hidden">
      <div className="relative mx-auto min-w-[780px] max-w-[1400px] px-[7%] pt-6 pb-10">
        {/* uprights and feet */}
        {["left-[3%]", "right-[3%]"].map((side) => (
          <div key={side} className={`absolute ${side} top-[calc(var(--sw)*0.03+24px)] h-[calc(var(--sw)*1.52)]`}>
            <div className="chrome-v h-full w-[calc(var(--sw)*0.04)] rounded-full shadow-[2px_6px_10px_rgba(60,40,15,0.2)]" />
            <div className="chrome-h absolute bottom-0 left-1/2 h-[calc(var(--sw)*0.035)] w-[calc(var(--sw)*0.5)] -translate-x-1/2 rounded-full shadow-[0_6px_10px_rgba(60,40,15,0.25)]" />
          </div>
        ))}
        <div className="absolute inset-x-[8%] top-[calc(var(--sw)*1.54+24px)] h-6 rounded-[50%] bg-[rgba(60,40,15,0.16)] blur-xl" />
        {/* rail */}
        <div className="chrome-h absolute inset-x-[2%] top-[calc(var(--sw)*0.036+24px)] h-[calc(var(--sw)*0.045)] rounded-full shadow-[0_5px_8px_rgba(60,40,15,0.22)]" />

        <ul className="relative flex h-[calc(var(--sw)*1.58)]">
          {products.map((p, i) => (
            <li
              key={p.id}
              className="relative flex min-w-0 flex-1 items-start justify-center"
              style={{ zIndex: hovered === i ? 40 : i, perspective: 900 }}
            >
              <motion.button
                type="button"
                aria-label={`View ${p.name}`}
                className="pointer-events-none relative block w-[var(--sw)] flex-none cursor-pointer outline-none"
                style={{ transformOrigin: "50% 5%", filter: shadow }}
                initial={{ opacity: 0, y: -50, rotateY: tilts[i], rotateZ: i % 2 ? 7 : -7 }}
                animate={{ opacity: 1, y: 0, rotateY: tilts[i], rotateZ: 0, scale: 1 }}
                whileHover={{ y: -16, rotateY: tilts[i] * 0.25, rotateZ: i % 2 ? 3 : -3, scale: 1.04 }}
                whileFocus={{ y: -16, rotateY: tilts[i] * 0.25, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ ...springy, opacity: { duration: 0.4, delay: i * 0.05 } }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered((h) => (h === i ? null : h))}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((h) => (h === i ? null : h))}
                onClick={() => onOpen(i)}
              >
                <Shirt product={p} className="block h-auto w-full" />
              </motion.button>
              <AnimatePresence>
                {hovered === i && (
                  <motion.span
                    className="pointer-events-none absolute top-[calc(var(--sw)*1.17)] left-1/2 w-max max-w-[calc(var(--sw)*1.1)] text-center text-[11px] font-medium tracking-[0.18em] uppercase"
                    initial={{ opacity: 0, y: -6, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -4, x: "-50%" }}
                    transition={soft}
                  >
                    {p.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const slide = {
  enter: (dir) => ({ x: dir * 140, opacity: 0, rotate: dir * 7 }),
  center: { x: 0, opacity: 1, rotate: 0 },
  exit: (dir) => ({ x: dir * -140, opacity: 0, rotate: dir * -7 }),
};

function Arrow({ dir, onClick }) {
  return (
    <motion.button
      type="button"
      aria-label={dir < 0 ? "Previous product" : "Next product"}
      onClick={onClick}
      whileHover={{ scale: 1.1, x: dir * 3 }}
      whileTap={{ scale: 0.92 }}
      transition={springy}
      className="grid h-11 w-11 flex-none cursor-pointer place-items-center rounded-full border border-black/10 bg-white/70 shadow-sm backdrop-blur sm:h-14 sm:w-14"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir < 0 ? "M14.5 5 L7.5 12 L14.5 19" : "M9.5 5 L16.5 12 L9.5 19"} />
      </svg>
    </motion.button>
  );
}

function ProductModal({ index, dir, onStep, onClose }) {
  const product = products[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 cursor-zoom-out bg-cream/65 backdrop-blur-xl" onClick={onClose} />

      <motion.button
        type="button"
        aria-label="Close"
        onClick={onClose}
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={springy}
        className="absolute top-5 right-5 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-black/10 bg-white/70 sm:top-8 sm:right-8"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M5 5 L19 19 M19 5 L5 19" />
        </svg>
      </motion.button>

      <motion.div
        className="pointer-events-none relative flex w-full max-w-5xl flex-col items-center px-3 sm:px-8"
        initial={{ scale: 0.8, y: 60 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 40 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
      >
        <div className="flex w-full items-center justify-between gap-2">
          <div className="pointer-events-auto">
            <Arrow dir={-1} onClick={() => onStep(-1)} />
          </div>
          <div className="relative aspect-[300/336] w-[min(66vw,52dvh)]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={product.id}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 230, damping: 20 }}
                className="absolute inset-0"
                style={{ transformOrigin: "50% 4%", filter: shadow }}
              >
                <Shirt product={product} className="block h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="pointer-events-auto">
            <Arrow dir={1} onClick={() => onStep(1)} />
          </div>
        </div>

        <div className="pointer-events-auto mt-6 flex flex-col items-center gap-4 text-center sm:mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h2
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="text-sm font-medium tracking-[0.2em] uppercase sm:text-base"
            >
              {product.name}
            </motion.h2>
          </AnimatePresence>
          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={springy}
            className="rounded-full bg-ink px-7 py-3 text-[11px] font-medium tracking-[0.22em] text-cream uppercase shadow-lg shadow-black/15"
          >
            See availability
          </motion.a>
          <p className="text-[11px] tracking-[0.25em] tabular-nums text-black/50">
            {pad(index + 1)} / {pad(products.length)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const info = {
  about: {
    title: "About",
    body: "Batch Merch makes small runs of tees, long sleeves and hoodies. A new design goes on the rack every day; when a batch is gone, it's gone.",
  },
  contact: {
    title: "Contact",
    body: "Wholesale, collabs and everything else: contact details coming soon.",
  },
};

function InfoSheet({ which, onClose }) {
  const { title, body, link } = info[which];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 cursor-zoom-out bg-cream/65 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        className="relative max-w-md rounded-3xl border border-black/5 bg-white/80 p-8 text-center shadow-2xl shadow-black/10"
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <h2 className="text-[11px] font-medium tracking-[0.25em] uppercase">{title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-black/70">{body}</p>
        {link && (
          <a href={`mailto:${link}`} className="mt-2 inline-block text-sm underline underline-offset-4">
            {link}
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

function Marquee() {
  const run = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="px-4">
      NEW DESIGNS DAILY <span className="px-4">•</span> SUBSCRIBE TO OUR NEWSLETTER <span className="pl-4">•</span>
    </span>
  ));
  return (
    <a
      href="#newsletter"
      onClick={(e) => e.preventDefault()}
      className="fixed inset-x-0 bottom-0 z-30 block overflow-hidden bg-ink py-3 text-[11px] font-medium tracking-[0.25em] whitespace-nowrap text-cream"
    >
      <div className="marquee-track">
        <div className="flex">{run}</div>
        <div className="flex" aria-hidden="true">
          {run}
        </div>
      </div>
    </a>
  );
}

function NavLink({ children, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={springy}
      className="cursor-pointer text-[11px] font-medium tracking-[0.25em] uppercase"
    >
      {children}
    </motion.button>
  );
}

export default function Home() {
  const [[open, dir], setOpen] = useState([null, 0]);
  const [sheet, setSheet] = useState(null);

  const step = useCallback((d) => {
    setOpen(([i]) => [(i + d + products.length) % products.length, d]);
  }, []);
  const close = useCallback(() => setOpen([null, 0]), []);
  const closeSheet = useCallback(() => setSheet(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-dvh flex-col pb-10">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-6 sm:px-10 sm:pt-8">
          <div className="justify-self-start">
            <NavLink onClick={() => setSheet("about")}>About</NavLink>
          </div>
          <h1 className="font-script text-4xl leading-none sm:text-6xl">Batch Merch</h1>
          <div className="justify-self-end">
            <NavLink onClick={() => setSheet("contact")}>Contact</NavLink>
          </div>
        </header>

        <main className="flex flex-1 items-center">
          <Rack onOpen={(i) => setOpen([i, 0])} />
        </main>

        <Marquee />

        <AnimatePresence>
          {open !== null && <ProductModal key="product" index={open} dir={dir} onStep={step} onClose={close} />}
          {sheet && <InfoSheet key="sheet" which={sheet} onClose={closeSheet} />}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
