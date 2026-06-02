import { useEffect, useState, useMemo } from "react";

// Accepts both string[] and { src, caption }[] — backward compatible
function normalize(arr) {
  return arr.map((item) =>
    typeof item === "string" ? { src: item, caption: null } : item
  );
}

function NavDots({ count, current, onSelect }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Slide ${i + 1}`}
          className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
            i === current
              ? "w-5 bg-cyan-400"
              : "w-1.5 bg-white/25 hover:bg-white/40"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProjectShowcase({
  desktopImages = [],
  mobileImages = [],
}) {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // bumping this resets the interval

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const images = useMemo(
    () => normalize(isMobile ? mobileImages : desktopImages),
    [isMobile, mobileImages, desktopImages]
  );

  // Reset to first slide when switching device type
  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  // Auto-advance; resets whenever timerKey changes (manual navigation)
  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % images.length),
      4500
    );
    return () => clearInterval(id);
  }, [images, timerKey]);

  // Guard after all hooks
  if (!images.length) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-slate-500">
        No images provided
      </div>
    );
  }

  // Clamp index so a device-switch never points out-of-bounds
  const idx = Math.min(current, images.length - 1);
  const caption = images[idx]?.caption;

  const goTo = (i) => {
    setCurrent(i);
    setTimerKey((k) => k + 1);
  };

  // ── Mobile: phone frame ────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-5 py-6">
        {/* Shell */}
        <div className="w-full max-w-[280px] rounded-[2.25rem] border-[2.5px] border-white/15 bg-black overflow-hidden shadow-2xl shadow-black/60">
          {/* Dynamic island */}
          <div className="h-8 bg-black flex items-center justify-center">
            <div className="w-20 h-[18px] rounded-full bg-slate-900" />
          </div>

          {/* Screen */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "9 / 19.5" }}
          >
            {images.map(({ src }, i) => (
              <img
                key={i}
                src={src}
                alt={`screenshot ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  i === idx
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />
            ))}
          </div>

          {/* Home bar */}
          <div className="h-6 bg-black flex items-center justify-center">
            <div className="w-24 h-[3px] rounded-full bg-white/20" />
          </div>
        </div>

        <NavDots count={images.length} current={idx} onSelect={goTo} />

        {caption && (
          <p className="text-xs text-slate-400 tracking-wide">{caption}</p>
        )}
      </div>
    );
  }

  // ── Desktop: browser frame ─────────────────────────────────────────────
  return (
    <>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-900/60">
        <span className="w-3 h-3 rounded-full bg-red-400/80 block" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/80 block" />
        <span className="w-3 h-3 rounded-full bg-green-400/80 block" />
        <div className="ml-2 max-w-[200px] flex-1 h-6 rounded bg-white/5 border border-white/10 flex items-center px-2.5 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400/50 flex-shrink-0 block" />
          <span className="text-xs text-slate-500 truncate">localhost:5173</span>
        </div>
      </div>

      {/* Screenshot area */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16 / 10" }}
      >
        {images.map(({ src }, i) => (
          <img
            key={i}
            src={src}
            alt={`screenshot ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              i === idx
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          />
        ))}
      </div>

      {/* Footer: dots + caption */}
      <div className="flex flex-col items-center gap-1.5 py-3 border-t border-white/10 bg-slate-900/30">
        <NavDots count={images.length} current={idx} onSelect={goTo} />
        {caption && (
          <p className="text-xs text-slate-400 tracking-wide">{caption}</p>
        )}
      </div>
    </>
  );
}