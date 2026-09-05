"use client";

import { useId } from "react";

export function InstagramIcon({ className }: { className?: string }) {
  const rawId = useId().replace(/:/g, "");
  const gradientId = `instagram-gradient-${rawId}`;

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <defs>
        <radialGradient id={gradientId} cx="30%" cy="100%" r="125%">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="45%" stopColor="#ff0169" />
          <stop offset="75%" stopColor="#d300c5" />
          <stop offset="100%" stopColor="#7638fa" />
        </radialGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill={`url(#${gradientId})`} />
    </svg>
  );
}

