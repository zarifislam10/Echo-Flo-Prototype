import { useNavigate } from "react-router";
import { Home } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { EchoLogo } from "./EchoLogo";
import { useSettings, useUpdateSettings } from "../settingsStore";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
        enabled ? "bg-blue-500/30" : "bg-slate-300/50"
      }`}
      style={{ border: "1px solid rgba(255,255,255,0.4)" }}
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ${
          enabled ? "left-7 bg-blue-600 shadow-md" : "left-1 bg-slate-400"
        }`}
      />
    </button>
  );
}

function Slider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="relative w-full h-8 flex items-center">
      <div className="absolute w-full h-1 rounded-full" style={{ background: "rgba(0,0,0,0.1)" }} />
      <div
        className="absolute h-1 rounded-full bg-blue-500/60"
        style={{ width: `${value}%` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-8 opacity-0 cursor-pointer"
      />
      <div
        className="absolute w-5 h-5 rounded-full bg-white border-2 border-blue-400 shadow-lg pointer-events-none"
        style={{ left: `calc(${value}% - 10px)` }}
      />
    </div>
  );
}

export function SettingsPage() {
  const navigate = useNavigate();
  const settings = useSettings();
  const update = useUpdateSettings();

  const colorModes = [
    { name: "Normal", type: "full" },
    { name: "Deuteranopia", type: "deut" },
    { name: "Protanopia", type: "prot" },
  ];

  return (
    <div
      className="flex flex-col items-center px-4 pt-6 pb-6 min-h-full"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-start mb-2">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full border"
          style={{ background: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.5)" }}
        >
          <Home size={18} className="text-slate-600" />
        </button>
        <EchoLogo size={42} />
        <div className="w-10" />
      </div>

      {/* Title */}
      <h1
        className="mt-4 mb-6 tracking-wider text-[#ffffff]"
        style={{ fontSize: 18, fontWeight: 300 }}
      >
        SYSTEM SETTINGS
      </h1>

      {/* Visualizations Section */}
      <div className="w-full mb-4">
        <h2
          className="mb-3 text-[#ffffff]"
          style={{ fontSize: 18, fontWeight: 300 }}
        >
          Visualizations
        </h2>
        <GlassCard className="w-full p-5">
          <span className="text-slate-600 tracking-widest" style={{ fontSize: 12 }}>
            AURA OPACITY
          </span>
          <div className="mt-3 mb-4">
            <Slider value={settings.auraOpacity} onChange={(v) => update({ auraOpacity: v })} />
          </div>
          <Toggle enabled={settings.auraEnabled} onToggle={() => update({ auraEnabled: !settings.auraEnabled })} />

          <div className="mt-6">
            <span className="tracking-widest text-[#45556c]" style={{ fontSize: 12 }}>
              COLORBLIND MODES
            </span>
            <div className="flex gap-3 mt-3">
              {colorModes.map((mode, i) => (
                <button
                  key={mode.name}
                  onClick={() => update({ colorMode: i })}
                  className="flex flex-col items-center gap-2 flex-1 transition-all duration-300"
                >
                  <div
                    className="w-[72px] h-[72px] rounded-2xl overflow-hidden flex items-center justify-center relative"
                    style={{
                      background: "rgba(220, 220, 225, 0.85)",
                      boxShadow:
                        settings.colorMode === i
                          ? "0 4px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4)"
                          : "0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)",
                      border:
                        settings.colorMode === i
                          ? "2px solid rgba(255,255,255,0.7)"
                          : "1px solid rgba(255,255,255,0.4)",
                    }}
                  >
                    {mode.type === "full" ? (
                      <div
                        className="w-[56px] h-[56px] rounded-full"
                        style={{
                          background:
                            "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                          opacity: settings.colorMode === i ? 1 : 0.45,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    ) : mode.type === "deut" ? (
                      <div
                        className="w-[56px] h-[56px] rounded-full"
                        style={{
                          background:
                            "conic-gradient(#c4a200, #e8d44a, #f5e77a, #d4c85a, #8a7a20, #4a5a8a, #2040a0, #5030a0, #9a6a30, #c4a200)",
                          opacity: settings.colorMode === i ? 1 : 0.45,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    ) : (
                      <div
                        className="w-[56px] h-[56px] rounded-full"
                        style={{
                          background:
                            "conic-gradient(#8a7a30, #c4b050, #e8d880, #b0a860, #5a6040, #3a4a7a, #1a30a0, #4a2090, #7a5a40, #8a7a30)",
                          opacity: settings.colorMode === i ? 1 : 0.45,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    )}
                    {settings.colorMode !== i && (
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: "rgba(180, 180, 190, 0.4)",
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    )}
                  </div>
                  <span className="text-slate-400" style={{ fontSize: 11, fontWeight: 300 }}>
                    {mode.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Haptics & Audio */}
      <div className="w-full">
        <h2
          className="mb-3 text-[#ffffff]"
          style={{ fontSize: 18, fontWeight: 300 }}
        >
          Haptics & Audio
        </h2>
        <GlassCard className="w-full p-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-3">
              <span className="text-slate-600" style={{ fontSize: 13 }}>
                Pulse Noise
              </span>
              <Toggle enabled={settings.pulseNoise} onToggle={() => update({ pulseNoise: !settings.pulseNoise })} />
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-slate-600" style={{ fontSize: 13 }}>
                System Sound
              </span>
              <Toggle enabled={settings.systemSound} onToggle={() => update({ systemSound: !settings.systemSound })} />
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-slate-600" style={{ fontSize: 13 }}>
                Vibration
              </span>
              <Toggle enabled={settings.vibration} onToggle={() => update({ vibration: !settings.vibration })} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Simulated data notice */}
      <div className="mt-6 text-center">
        <span className="text-slate-400 tracking-wider" style={{ fontSize: 10 }}>
          PROTOTYPE - ALL DATA IS SIMULATED
        </span>
      </div>
    </div>
  );
}
