import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const boxRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 40 }); // persen

  const bgAnim = useMemo(
    () => ({
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }),
    []
  );

  function onMove(e) {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  }

  return (
    <motion.div
      ref={boxRef}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative mb-6 overflow-hidden rounded-3xl"
    >
      {/* Animated gradient layer */}
      <motion.div
        aria-hidden
        animate={bgAnim}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(99,102,241,0.45), rgba(168,85,247,0.45), rgba(34,211,238,0.35))",
          backgroundSize: "200% 200%",
          filter: "blur(18px)",
          transform: "scale(1.2)",
        }}
      />

      {/* Interactive blob (follows mouse) */}
      <motion.div
        aria-hidden
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35), rgba(168,85,247,0.18), transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Dark glass overlay */}
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-xl" />
      <div className="absolute inset-0 border border-white/10" />

      {/* Content */}
      <div className="relative z-10 p-6 flex items-start justify-between gap-6">
        <div>
          <motion.h1
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-4xl font-bold tracking-tight text-white"
          >
            Study <span className="text-indigo-300">&</span> Project Tracker
          </motion.h1>

          <p className="mt-2 max-w-xl text-sm text-slate-200">
            Kelola tugas kuliah & project dalam satu dashboard dengan tampilan rapi, cepat, dan fokus.
          </p>

          {/* little chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
              ✨ Overdue highlight
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
              🧲 Drag & Drop
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
              💾 Auto-save
            </span>
          </div>
        </div>

        {/* Quick tip */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="hidden sm:block rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs text-slate-200 shadow-lg"
        >
          <div className="font-semibold text-indigo-200">Quick tip</div>
          <div className="mt-1">Mulai dari 3 task terdekat deadlinenya.</div>
        </motion.div>
      </div>
    </motion.div>
  );
}