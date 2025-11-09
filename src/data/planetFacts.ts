// src/data/planetFacts.ts
// Comprehensive planet information database with facts and romantic messaging

import type { PlanetInfoData } from "@/types/planet-info.types";

export const planetFacts: PlanetInfoData = {
  Mercury: {
    name: "Mercury",
    type: "Rocky Planet",
    colorTheme: {
      text: "text-stone-400",
      border: "border-stone-500/30",
      glow: "shadow-stone-500/20",
    },
    facts: [
      {
        icon: "ruler",
        label: "Distance from Sun",
        value: "57.9 million km",
      },
      {
        icon: "clock",
        label: "Orbital Period",
        value: "88 Earth days",
      },
      {
        icon: "sun",
        label: "Day Length",
        value: "59 Earth days",
      },
      {
        icon: "moon",
        label: "Moons",
        value: "0",
      },
      {
        icon: "thermometer",
        label: "Temperature Range",
        value: "-173°C to 427°C",
      },
      {
        icon: "sparkles",
        label: "Unique Fact",
        value: "Smallest planet with largest temperature range",
      },
    ],
  },
  Venus: {
    name: "Venus",
    type: "Rocky Planet",
    colorTheme: {
      text: "text-amber-300",
      border: "border-amber-500/30",
      glow: "shadow-amber-500/20",
    },
    facts: [
      {
        icon: "ruler",
        label: "Distance from Sun",
        value: "108.2 million km",
      },
      {
        icon: "clock",
        label: "Orbital Period",
        value: "225 Earth days",
      },
      {
        icon: "sun",
        label: "Day Length",
        value: "243 Earth days",
      },
      {
        icon: "moon",
        label: "Moons",
        value: "0",
      },
      {
        icon: "thermometer",
        label: "Temperature",
        value: "462°C (hottest planet)",
      },
      {
        icon: "sparkles",
        label: "Unique Fact",
        value: "Rotates backwards and day is longer than year",
      },
    ],
  },
  Earth: {
    name: "Earth",
    type: "Rocky Planet",
    colorTheme: {
      text: "text-blue-400",
      border: "border-blue-500/30",
      glow: "shadow-blue-500/20",
    },
    facts: [
      {
        icon: "ruler",
        label: "Distance from Sun",
        value: "149.6 million km",
      },
      {
        icon: "clock",
        label: "Orbital Period",
        value: "365.25 days",
      },
      {
        icon: "sun",
        label: "Day Length",
        value: "24 hours",
      },
      {
        icon: "moon",
        label: "Moons",
        value: "1 (Luna)",
      },
      {
        icon: "droplets",
        label: "Atmosphere",
        value: "78% N₂, 21% O₂",
      },
      {
        icon: "sparkles",
        label: "Unique Fact",
        value: "Only planet with liquid water oceans",
      },
    ],
  },
  Mars: {
    name: "Mars",
    type: "Rocky Planet",
    colorTheme: {
      text: "text-red-400",
      border: "border-red-500/30",
      glow: "shadow-red-500/20",
    },
    facts: [
      {
        icon: "ruler",
        label: "Distance from Sun",
        value: "227.9 million km",
      },
      {
        icon: "clock",
        label: "Orbital Period",
        value: "687 Earth days",
      },
      {
        icon: "sun",
        label: "Day Length",
        value: "24.6 hours",
      },
      {
        icon: "moon",
        label: "Moons",
        value: "2 (Phobos, Deimos)",
      },
      {
        icon: "thermometer",
        label: "Temperature",
        value: "-87°C to -5°C",
      },
      {
        icon: "sparkles",
        label: "Unique Fact",
        value: "Home to Olympus Mons, tallest volcano in solar system",
      },
    ],
  },
  Jupiter: {
    name: "Jupiter",
    type: "Gas Giant",
    colorTheme: {
      text: "text-orange-400",
      border: "border-orange-500/30",
      glow: "shadow-orange-500/20",
    },
    facts: [
      {
        icon: "ruler",
        label: "Distance from Sun",
        value: "778.5 million km",
      },
      {
        icon: "clock",
        label: "Orbital Period",
        value: "11.86 Earth years",
      },
      {
        icon: "sun",
        label: "Day Length",
        value: "10 hours",
      },
      {
        icon: "moon",
        label: "Moons",
        value: "95 confirmed",
      },
      {
        icon: "wind",
        label: "Atmosphere",
        value: "90% H₂, 10% He",
      },
      {
        icon: "sparkles",
        label: "Unique Fact",
        value: "Great Red Spot is a storm larger than Earth",
      },
    ],
  },
  Saturn: {
    name: "Saturn",
    type: "Gas Giant",
    colorTheme: {
      text: "text-yellow-300",
      border: "border-yellow-500/30",
      glow: "shadow-yellow-500/20",
    },
    facts: [
      {
        icon: "ruler",
        label: "Distance from Sun",
        value: "1.43 billion km",
      },
      {
        icon: "clock",
        label: "Orbital Period",
        value: "29.5 Earth years",
      },
      {
        icon: "sun",
        label: "Day Length",
        value: "10.7 hours",
      },
      {
        icon: "moon",
        label: "Moons",
        value: "146 confirmed",
      },
      {
        icon: "circle",
        label: "Rings",
        value: "Made of billions of ice particles",
      },
      {
        icon: "sparkles",
        label: "Unique Fact",
        value: "Could float in water due to low density",
      },
    ],
  },
  Uranus: {
    name: "Uranus",
    type: "Ice Giant",
    colorTheme: {
      text: "text-cyan-400",
      border: "border-cyan-500/30",
      glow: "shadow-cyan-500/20",
    },
    facts: [
      {
        icon: "ruler",
        label: "Distance from Sun",
        value: "2.87 billion km",
      },
      {
        icon: "clock",
        label: "Orbital Period",
        value: "84 Earth years",
      },
      {
        icon: "sun",
        label: "Day Length",
        value: "17.2 hours",
      },
      {
        icon: "moon",
        label: "Moons",
        value: "27",
      },
      {
        icon: "thermometer",
        label: "Temperature",
        value: "-224°C (coldest atmosphere)",
      },
      {
        icon: "sparkles",
        label: "Unique Fact",
        value: "Rotates on its side with 97.7° axial tilt",
      },
    ],
  },
  Neptune: {
    name: "Neptune",
    type: "Ice Giant",
    colorTheme: {
      text: "text-indigo-400",
      border: "border-indigo-500/30",
      glow: "shadow-indigo-500/20",
    },
    facts: [
      {
        icon: "ruler",
        label: "Distance from Sun",
        value: "4.5 billion km",
      },
      {
        icon: "clock",
        label: "Orbital Period",
        value: "165 Earth years",
      },
      {
        icon: "sun",
        label: "Day Length",
        value: "16 hours",
      },
      {
        icon: "moon",
        label: "Moons",
        value: "14",
      },
      {
        icon: "wind",
        label: "Wind Speed",
        value: "2,100 km/h (fastest in solar system)",
      },
      {
        icon: "sparkles",
        label: "Unique Fact",
        value: "Deep blue color from methane atmosphere",
      },
    ],
  },
};
