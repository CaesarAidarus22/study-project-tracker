import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GlowCard({
  children,
  className = "",
  blobSize = 220,
  intensity = 0.28, // 0.18 - 0.35
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });

  const bgAnim = useMemo(
    () => ({ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }),
    []
  );

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Animated gradient */}
      <motion.div
        aria-hidden
        animate={bgAnim}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(120deg,
            rgba(99,102,241,${intensity}),
            rgba(168,85,247,${intensity}),
            rgba(34,211,238,${intensity * 0.8})
          )`,
          backgroundSize: "200% 200%",
          filter: "blur(16px)",
          transform: "scale(1.2)",
        }}
      />

      {/* Mouse-follow blob */}
      <motion.div
        aria-hidden
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{
          width: blobSize,
          height: blobSize,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35), rgba(168,85,247,0.18), transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Dark glass layer */}
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-xl" />
      <div className="absolute inset-0 border border-white/10" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}