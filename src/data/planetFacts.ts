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
    romanticMessage:
      "You were the spark that crossed the distance faster than anything. Like Mercury racing around the Sun, our first messages moved quick, full of curiosity and a little chaos. I remember the way your words felt—electric, alive, real. That was the beginning of everything, the moment my world tilted toward you. Even now, when I think back to that first hello, I smile, because it was the quiet start of something endless.",
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
    romanticMessage:
      "Venus reminds me of you in every way—bright, magnetic, full of warmth that lingers even after you've gone. You carry love in your voice and beauty in your soul. Every time I look at Venus, I think about how your presence feels like a sunrise. You don't just enter a room, you change its color. You make ordinary moments feel like art. Loving you feels natural, like the universe wrote your name in the stars long before we met.",
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
    romanticMessage:
      "In this vast galaxy filled with stars and possibilities, we found each other on this single, small planet. Every city, every sky, every ocean feels different now because you exist somewhere beneath it. The world feels smaller but the love feels infinite. When I hold you, even from afar, I feel grounded, like the Earth itself steadies beneath us. This is our home, our little world where love grows like forests and hope shines like sunlight through clouds.",
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
    romanticMessage:
      "There are days when life tests us, when things don't go as planned, and emotions run high. But our love is like Mars, burning red and alive, refusing to fade. We don't give up; we grow stronger with every challenge. You are my fire, my courage, the heartbeat that keeps me fighting for us. Together we've built something that doesn't break—it burns brighter. Every orbit around the Sun reminds me that passion and patience can live side by side when two hearts truly belong.",
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
    romanticMessage:
      "You are my calm inside the storm. Jupiter's size reminds me of how deeply I care for you, how much I want to keep you safe and happy. If love had a form, it would be this giant planet—vast, powerful, steady. I will always be your shelter when things get hard, the one who stands between you and anything that could hurt you. You can rest in the certainty that my love is as strong and endless as Jupiter's pull.",
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
    romanticMessage:
      "The rings of Saturn look delicate, but they are made of millions of pieces held together by gravity. That's us. Every memory, every laugh, every late-night talk forms the rings around our love. They shimmer because of everything we've been through together. You are my forever, my constant promise, the one I'll keep choosing no matter how many orbits we complete. Every time I imagine our future, I see those golden rings and think of everything beautiful we've built.",
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
    romanticMessage:
      "Love with you is never ordinary. You tilt my world in the best possible way, just like Uranus spins differently from every other planet. You bring laughter when I least expect it and comfort in the quietest moments. Every surprise, every inside joke, every silly thing we share makes me love you more. You remind me that love isn't supposed to be predictable—it's supposed to be full of wonder. And you are my favorite wonder.",
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
    romanticMessage:
      "When I think of Neptune, I think of deep oceans, quiet and endless. That's how your love feels—peaceful, strong, and vast. You've seen parts of me no one else ever has, and somehow you still choose to stay. There's something unspoken between us, something that doesn't need words to exist. It's in every heartbeat, every silence, every thought that finds its way back to you. You are the calm to my storms, the depth I never knew I needed.",
  },
};
