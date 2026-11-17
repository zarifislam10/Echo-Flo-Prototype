import { useState, useEffect } from "react";
import { useSettings, useUpdateSettings } from "../settingsStore";
import imgCamera from "figma:asset/6b49c519802c10d34d662ee7e25ae9d2067819d8.png";

interface EmotionBubble {
  id: string;
  label: string;
  value: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const initialEmotions: EmotionBubble[] = [
  { id: "1", label: "confused", value: 100, x: 15, y: 38, color: "rgba(120,40,40,0.75)", size: 80 },
  { id: "2", label: "fear", value: 85, x: 65, y: 22, color: "rgba(140,30,30,0.7)", size: 70 },
  { id: "3", label: "intrigued", value: 86, x: 60, y: 60, color: "rgba(120,110,80,0.7)", size: 70 },
];

export function VisionPage() {
  const settings = useSettings();
  const update = useUpdateSettings();
  const [emotions, setEmotions] = useState<EmotionBubble[]>(initialEmotions);
  const [mainEmotion, setMainEmotion] = useState<string>("anxious");

  const isScanning = !settings.scanningPaused;
  const auraAlpha = settings.auraEnabled ? settings.auraOpacity / 100 : 0;

  // Drift emotion bubbles only when scanning
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setEmotions((prev) =>
        prev.map((e) => ({
          ...e,
          value: Math.max(10, Math.min(100, e.value + Math.floor(Math.random() * 11) - 5)),
          x: e.x + (Math.random() - 0.5) * 2,
          y: e.y + (Math.random() - 0.5) * 2,
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [isScanning]);

  // Cycle main emotion only when scanning
  useEffect(() => {
    if (!isScanning) return;
    const mainEmotions = ["anxious", "nervous", "uneasy", "tense", "worried"];
    const interval = setInterval(() => {
      setMainEmotion(mainEmotions[Math.floor(Math.random() * mainEmotions.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Camera Feed Background */}
      <img
        src={imgCamera}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Red overlay glow effects — controlled by aura opacity */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 200,
          height: 200,
          left: "30%",
          top: "20%",
          background: `radial-gradient(circle, rgba(255,50,50,${0.3 * auraAlpha}) 0%, transparent 70%)`,
          transition: "opacity 0.5s ease",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 150,
          height: 150,
          left: "55%",
          top: "15%",
          background: `radial-gradient(circle, rgba(255,50,50,${0.25 * auraAlpha}) 0%, transparent 70%)`,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Emotion Bubbles — controlled by aura settings */}
      {settings.auraEnabled &&
        emotions.map((emotion) => (
          <div
            key={emotion.id}
            className="absolute flex flex-col items-center justify-center rounded-2xl transition-all duration-1000"
            style={{
              left: `${emotion.x}%`,
              top: `${emotion.y}%`,
              width: emotion.size,
              height: emotion.size,
              background: emotion.color,
              backdropFilter: "blur(10px)",
              transform: "translate(-50%, -50%)",
              opacity: auraAlpha,
            }}
          >
            <span className="text-white" style={{ fontSize: 22, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
              {emotion.value}%
            </span>
            <span className="text-white/90" style={{ fontSize: 11, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
              {emotion.label}
            </span>
          </div>
        ))}

      {/* Main Emotion Label */}
      {settings.auraEnabled && (
        <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2" style={{ opacity: auraAlpha }}>
          <span
            className="text-white drop-shadow-lg italic"
            style={{ fontSize: 32, fontWeight: 400, textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)" }}
          >
            {mainEmotion}
          </span>
        </div>
      )}

      {/* Scanning indicator */}
      <button
        onClick={() => update({ scanningPaused: !settings.scanningPaused })}
        className="absolute top-8 right-4 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20"
        style={{ background: isScanning ? "rgba(255,60,60,0.3)" : "rgba(100,100,100,0.3)" }}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isScanning ? "bg-red-400 animate-pulse" : "bg-gray-400"}`} />
          <span className="text-white" style={{ fontSize: 12, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
            {isScanning ? "SCANNING" : "PAUSED"}
          </span>
        </div>
      </button>

      {/* ECHO LENS VIEW title */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-6 pointer-events-none">
        <span
          className="text-white tracking-[0.25em] uppercase drop-shadow-lg"
          style={{
            fontSize: 13,
            fontWeight: 600,
            textShadow: "0 1px 12px rgba(0,0,0,0.7), 0 0 30px rgba(255,255,255,0.15)",
            letterSpacing: "0.25em",
          }}
        >
          ECHO LENS VIEW
        </span>
      </div>

      {/* Simulated data badge */}
      <div className="absolute top-8 left-4 px-2 py-1 rounded-full backdrop-blur-md border border-white/20"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        <span className="text-white/70" style={{ fontSize: 9, letterSpacing: "0.1em" }}>
          SIMULATED
        </span>
      </div>

      {/* Live indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div
          className="flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-md border border-white/25"
          style={{ background: "rgba(0,0,0,0.35)" }}
        >
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-white" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em" }}>
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}
