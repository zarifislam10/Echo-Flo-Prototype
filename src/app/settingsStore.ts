import { useSyncExternalStore, useCallback } from "react";

export interface Settings {
  auraOpacity: number;
  auraEnabled: boolean;
  colorMode: number; // 0 = Normal, 1 = Deuteranopia, 2 = Protanopia
  pulseNoise: boolean;
  systemSound: boolean;
  vibration: boolean;
  scanningPaused: boolean;
}

const STORAGE_KEY = "echoflo-settings";

const defaults: Settings = {
  auraOpacity: 50,
  auraEnabled: true,
  colorMode: 0,
  pulseNoise: true,
  systemSound: true,
  vibration: true,
  scanningPaused: false,
};

function load(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {}
  return { ...defaults };
}

let current: Settings = load();
const listeners = new Set<() => void>();

function emit() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  listeners.forEach((l) => l());
}

export function getSettings(): Settings {
  return current;
}

export function updateSettings(patch: Partial<Settings>) {
  current = { ...current, ...patch };
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSettings(): Settings {
  return useSyncExternalStore(subscribe, getSettings);
}

export function useUpdateSettings() {
  return useCallback((patch: Partial<Settings>) => updateSettings(patch), []);
}
