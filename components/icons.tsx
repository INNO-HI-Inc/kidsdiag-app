/* === Icon set (line style, no emoji) === */

type IconProps = { className?: string; size?: number };

const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconTarget({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function IconTree({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3v18" />
      <path d="M6 9c0-3 6-3 6-3s6 0 6 3" />
      <path d="M4 15c0-2 4-2 4-2s4 0 4 2" />
      <path d="M16 17c0-2 4-2 4-2s2 0 2 2" />
    </svg>
  );
}

export function IconChat({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function IconChart({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-6" />
    </svg>
  );
}

export function IconCheck({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function IconArrowRight({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

export function IconBook({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2z" />
      <path d="M18 6h2v14h-2" />
    </svg>
  );
}

export function IconUsers({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IconDoc({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function IconGrad({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M22 10L12 4 2 10l10 6 10-6z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

export function IconClock({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function IconSparkle({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0L13.4 8.6L22 10L13.4 11.4L12 20L10.6 11.4L2 10L10.6 8.6L12 0Z" />
    </svg>
  );
}

export function IconShield({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 2l9 4v6c0 5-3.8 9.4-9 10-5.2-.6-9-5-9-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconPencil({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
    </svg>
  );
}

export function IconPause({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
export function IconChevronDown({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
export function IconHelpCircle({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
export function IconRefresh({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

export function IconSquiggle({ color = "#fcd34d", className }: { color?: string; className?: string }) {
  return (
    <svg className={className ?? "absolute -bottom-2 left-0 w-full h-3 pointer-events-none"} viewBox="0 0 200 12" preserveAspectRatio="none">
      <path d="M2,8 Q35,2 70,7 T138,8 T198,7" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
