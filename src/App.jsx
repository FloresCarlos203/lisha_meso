import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

const slides = [
  {
    id: 1,
    type: "cover",
    emoji: "💕",
    title: "Para Ti,\nMi Amor",
    subtitle: "En nuestro mesoaniversario n°23",
    accent: "rose",
  },
  {
    id: 2,
    type: "message",
    emoji: "🌿",
    quote:
      "Desde el momento que me enamoré de ti, supe que quería compartir cada instante a tu lado. Eres mi compañera, mi amiga y el amor de mi vida.",
    author: "Con todo mi corazón",
    accent: "mint",
  },
  {
    id: 3,
    type: "reasons",
    emoji: "✨",
    title: "Las razones por las que te amo",
    reasons: [
      "Por tu sonrisa que ilumina cualquier momento de mi día",
      "Por lo valiente que eres al enfrentar los desafíos de la vida",
      "Por como te esfuerzas cada día",
      "Por hacerme mejor persona",
    ],
    accent: "lavender",
  },
  {
    id: 4,
    type: "message",
    emoji: "🌸",
    quote:
      "Cada momento contigo es un regalo que atesoro. Gracias por elegirme, por quedarte y por amarme.",
    author: "Tuyo para siempre",
    accent: "rose",
  },
  {
    id: 5,
    type: "promise",
    emoji: "🌙",
    title: "Mis promesas para ti",
    promises: [
      "Estar a tu lado en cada tormenta y celebrar contigo cada alegría",
      "Hacerte reír todos los días, incluso en los momentos difíciles",
      "Amarte con todo mi corazón, sin importar las circunstancias",
      "Crecer juntos y construir un futuro lleno de amor y felicidad",
    ],
    accent: "mint",
  },
  {
    id: 6,
    type: "message",
    emoji: "💜",
    quote:
      "No sé qué hice para merecer a alguien tan maravillosa como tú, pero haré todo para seguir siendo digno de tu amor.",
    author: "El que te ama hasta el infinito",
    accent: "lavender",
  },
  {
    id: 7,
    type: "closing",
    emoji: "💖",
    title: "¡Feliz Mesoaniversario!",
    subtitle: "Que sean muchos más a tu lado",
    tag: "Te amo demasiado 💕",
    accent: "rose",
  },
];

// Nombres de fotos que el usuario puede colocar en /public/photos/
const PHOTO_NAMES = [
  "foto1.jpg",
  "foto2.jpg",
  "foto3.jpg",
  "foto4.jpg",
  "foto5.jpg",
  "foto6.jpg",
];

// Posiciones y rotaciones fijas para cada foto en el fondo
const PHOTO_LAYOUT = [
  { top: "4%", left: "2%", rotate: "-8deg", size: 160, delay: 0 },
  { top: "3%", right: "3%", rotate: "7deg", size: 150, delay: 0.3 },
  { top: "38%", left: "-1%", rotate: "-5deg", size: 140, delay: 0.6 },
  { top: "38%", right: "-1%", rotate: "6deg", size: 145, delay: 0.2 },
  { bottom: "5%", left: "3%", rotate: "9deg", size: 155, delay: 0.5 },
  { bottom: "4%", right: "2%", rotate: "-7deg", size: 150, delay: 0.1 },
];

const ACCENT_COLORS = {
  rose: {
    bg: "linear-gradient(135deg, #1a0e1a 0%, #2d1a2d 50%, #1a0e1a 100%)",
    orb1: "rgba(248,187,217,0.15)",
    orb2: "rgba(229,127,168,0.1)",
    orb3: "rgba(179,157,219,0.08)",
    glow: "#f8bbd9",
    glowText: "linear-gradient(135deg, #f8bbd9, #e57fa8, #b39ddb)",
    badge: "rgba(248,187,217,0.15)",
    badgeBorder: "rgba(248,187,217,0.4)",
    dot: "#f8bbd9",
    dotShadow: "rgba(248,187,217,0.5)",
    navActive: "#f8bbd9",
  },
  mint: {
    bg: "linear-gradient(135deg, #0a1a14 0%, #0f2a1f 50%, #0a1a14 100%)",
    orb1: "rgba(168,230,207,0.12)",
    orb2: "rgba(92,184,138,0.08)",
    orb3: "rgba(179,157,219,0.07)",
    glow: "#a8e6cf",
    glowText: "linear-gradient(135deg, #a8e6cf, #5cb88a, #b39ddb)",
    badge: "rgba(168,230,207,0.12)",
    badgeBorder: "rgba(168,230,207,0.35)",
    dot: "#a8e6cf",
    dotShadow: "rgba(168,230,207,0.5)",
    navActive: "#a8e6cf",
  },
  lavender: {
    bg: "linear-gradient(135deg, #0e0a1a 0%, #1a1030 50%, #0e0a1a 100%)",
    orb1: "rgba(179,157,219,0.15)",
    orb2: "rgba(124,107,176,0.1)",
    orb3: "rgba(248,187,217,0.07)",
    glow: "#b39ddb",
    glowText: "linear-gradient(135deg, #b39ddb, #7c6bb0, #f8bbd9)",
    badge: "rgba(179,157,219,0.15)",
    badgeBorder: "rgba(179,157,219,0.4)",
    dot: "#b39ddb",
    dotShadow: "rgba(179,157,219,0.5)",
    navActive: "#b39ddb",
  },
};

// ─── Background Photos ───────────────────────────────────────────────────────
function BackgroundPhotos({ accentColor }) {
  const [loaded, setLoaded] = useState({});

  const handleLoad = (name) => setLoaded((prev) => ({ ...prev, [name]: true }));
  const handleError = (name) =>
    setLoaded((prev) => ({ ...prev, [name]: false }));

  return (
    <div className="bg-photos-container">
      {PHOTO_NAMES.map((name, i) => {
        const layout = PHOTO_LAYOUT[i];
        const isLoaded = loaded[name];
        if (isLoaded === false) return null;

        const posStyle = {};
        if (layout.top) posStyle.top = layout.top;
        if (layout.bottom) posStyle.bottom = layout.bottom;
        if (layout.left) posStyle.left = layout.left;
        if (layout.right) posStyle.right = layout.right;

        return (
          <div
            key={name}
            className="bg-photo-frame"
            style={{
              ...posStyle,
              "--rotate": layout.rotate,
              "--delay": `${layout.delay}s`,
              width: layout.size,
              height: layout.size,
              borderColor: `${accentColor}40`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}20, 0 0 20px ${accentColor}15`,
              opacity: isLoaded ? 1 : 0,
            }}
          >
            <img
              src={`/photos/${name}`}
              alt=""
              className="bg-photo-img"
              onLoad={() => handleLoad(name)}
              onError={() => handleError(name)}
            />
            <div
              className="bg-photo-overlay"
              style={{
                background: `linear-gradient(135deg, ${accentColor}18, transparent)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Music Player ─────────────────────────────────────────────────────────────
function MusicPlayer({ colors }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [noMusic, setNoMusic] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || noMusic) return;
    if (!started) setStarted(true);
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const handleError = () => setNoMusic(true);

  if (noMusic) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/cancion.mp3"
        loop
        onError={handleError}
      />
      <button
        className={`music-btn ${playing ? "music-btn--playing" : ""}`}
        onClick={toggle}
        title={playing ? "Pausar música" : "Reproducir música"}
        style={{
          borderColor: `${colors.glow}50`,
          color: colors.glow,
          boxShadow: playing ? `0 0 18px ${colors.dotShadow}` : "none",
        }}
      >
        {playing ? (
          <span className="music-bars">
            <span style={{ animationDelay: "0s" }} />
            <span style={{ animationDelay: "0.15s" }} />
            <span style={{ animationDelay: "0.3s" }} />
            <span style={{ animationDelay: "0.1s" }} />
          </span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}

// ─── Stars ───────────────────────────────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));
  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Petals ───────────────────────────────────────────────────────────────────
function FloatingPetals() {
  const petals = ["🌸", "🌿", "✨", "💫", "🌺", "🍃"];
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    emoji: petals[i % petals.length],
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    delay: i * 0.6,
    duration: 4 + Math.random() * 3,
    size: 14 + Math.random() * 14,
  }));
  return (
    <div className="petals-container">
      {items.map((item) => (
        <span
          key={item.id}
          className="petal"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            opacity: 0.25,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}

// ─── Slide renderers ──────────────────────────────────────────────────────────
function CoverSlide({ slide, colors }) {
  return (
    <div className="slide-content cover-slide">
      <div className="cover-emoji">{slide.emoji}</div>
      <h1
        className="cover-title"
        style={{
          background: colors.glowText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {slide.title.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </h1>
      <div
        className="cover-divider"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
        }}
      />
      <p className="cover-subtitle" style={{ color: colors.glow }}>
        {slide.subtitle}
      </p>
    </div>
  );
}

function MessageSlide({ slide, colors }) {
  return (
    <div className="slide-content message-slide">
      <div
        className="message-badge"
        style={{
          background: colors.badge,
          border: `1px solid ${colors.badgeBorder}`,
        }}
      >
        <span className="message-emoji">{slide.emoji}</span>
      </div>
      <blockquote className="message-quote" style={{ color: "#f0e8ff" }}>
        <span
          className="quote-mark"
          style={{ color: colors.glow, opacity: 0.4 }}
        >
          "
        </span>
        {slide.quote}
        <span
          className="quote-mark quote-mark-end"
          style={{ color: colors.glow, opacity: 0.4 }}
        >
          "
        </span>
      </blockquote>
      <div
        className="message-divider"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
        }}
      />
      <p className="message-author" style={{ color: colors.glow }}>
        — {slide.author}
      </p>
    </div>
  );
}

function ListSlide({ slide, colors, listKey }) {
  const items = slide[listKey] || [];
  return (
    <div className="slide-content list-slide">
      <div className="list-header">
        <span className="list-emoji">{slide.emoji}</span>
        <h2
          className="list-title"
          style={{
            background: colors.glowText,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {slide.title}
        </h2>
      </div>
      <ul className="list-items">
        {items.map((item, i) => (
          <li
            key={i}
            className="list-item"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <span
              className="list-dot"
              style={{
                background: colors.glow,
                boxShadow: `0 0 8px ${colors.dotShadow}`,
              }}
            />
            <span className="list-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ClosingSlide({ slide, colors }) {
  return (
    <div className="slide-content closing-slide">
      <div className="closing-rings">
        <div
          className="ring ring-outer"
          style={{ borderColor: `${colors.glow}20` }}
        />
        <div
          className="ring ring-mid"
          style={{ borderColor: `${colors.glow}15` }}
        />
      </div>
      <div className="closing-emoji">{slide.emoji}</div>
      <h1
        className="closing-title"
        style={{
          background: colors.glowText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {slide.title}
      </h1>
      <p
        className="closing-subtitle"
        style={{ color: "rgba(240,232,255,0.7)" }}
      >
        {slide.subtitle}
      </p>
      <div
        className="closing-tag"
        style={{
          background: colors.badge,
          border: `1px solid ${colors.badgeBorder}`,
          color: colors.glow,
        }}
      >
        {slide.tag}
      </div>
    </div>
  );
}

function renderSlide(slide, colors) {
  switch (slide.type) {
    case "cover":
      return <CoverSlide slide={slide} colors={colors} />;
    case "message":
      return <MessageSlide slide={slide} colors={colors} />;
    case "reasons":
      return <ListSlide slide={slide} colors={colors} listKey="reasons" />;
    case "promise":
      return <ListSlide slide={slide} colors={colors} listKey="promises" />;
    case "closing":
      return <ClosingSlide slide={slide} colors={colors} />;
    default:
      return null;
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const slide = slides[current];
  const colors = ACCENT_COLORS[slide.accent];

  const goTo = useCallback(
    (index, dir = "next") => {
      if (animating || index === current) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 380);
    },
    [animating, current],
  );

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1, "next");
  }, [current, goTo]);
  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  return (
    <div
      className="app"
      style={{ background: colors.bg, transition: "background 0.8s ease" }}
    >
      <Stars />
      <FloatingPetals />
      <BackgroundPhotos accentColor={colors.glow} />

      {/* Ambient orbs */}
      <div
        className="orb orb-1"
        style={{
          background: `radial-gradient(circle, ${colors.orb1}, transparent 70%)`,
        }}
      />
      <div
        className="orb orb-2"
        style={{
          background: `radial-gradient(circle, ${colors.orb2}, transparent 70%)`,
        }}
      />
      <div
        className="orb orb-3"
        style={{
          background: `radial-gradient(circle, ${colors.orb3}, transparent 70%)`,
        }}
      />

      {/* Slide */}
      <div
        className={`slide-wrapper ${animating ? (direction === "next" ? "exit-left" : "exit-right") : "enter"}`}
        key={current}
      >
        <div className="slide-card">{renderSlide(slide, colors)}</div>
      </div>

      {/* Navigation */}
      <div className="nav-container">
        <button
          className="nav-btn"
          onClick={prev}
          disabled={current === 0}
          style={{
            borderColor:
              current === 0 ? "rgba(255,255,255,0.1)" : `${colors.glow}50`,
            color: current === 0 ? "rgba(255,255,255,0.2)" : colors.glow,
          }}
          aria-label="Anterior"
        >
          ←
        </button>

        <div className="nav-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`nav-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              style={{
                background:
                  i === current ? colors.navActive : "rgba(255,255,255,0.2)",
                boxShadow:
                  i === current ? `0 0 10px ${colors.dotShadow}` : "none",
                transform: i === current ? "scale(1.4)" : "scale(1)",
              }}
              aria-label={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="nav-btn"
          onClick={next}
          disabled={current === slides.length - 1}
          style={{
            borderColor:
              current === slides.length - 1
                ? "rgba(255,255,255,0.1)"
                : `${colors.glow}50`,
            color:
              current === slides.length - 1
                ? "rgba(255,255,255,0.2)"
                : colors.glow,
          }}
          aria-label="Siguiente"
        >
          →
        </button>
      </div>

      {/* Music player */}
      <MusicPlayer colors={colors} />

      {/* Counter */}
      <div className="slide-counter" style={{ color: "rgba(255,255,255,0.3)" }}>
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}
