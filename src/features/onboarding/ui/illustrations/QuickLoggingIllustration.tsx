import { animate, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

export function QuickLoggingIllustration({
  className = 'w-full h-auto max-h-56',
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Button glow pulse
    const btnAnim = animate(svg.querySelector('.anim-button'), {
      scale: [0.95, 1.05],
      transformOrigin: 'center',
      duration: 1600,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    // Glow ring
    const glowAnim = animate(svg.querySelector('.anim-glow'), {
      opacity: [0.12, 0.4],
      scale: [0.95, 1.12],
      transformOrigin: 'center',
      duration: 1600,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    // Floating checklist items
    const checksAnim = animate(svg.querySelectorAll('.anim-check'), {
      translateY: [-2.5, 2.5],
      opacity: [0.5, 1],
      duration: 2000,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
      delay: stagger(250),
    });

    // Chip float
    const chipsAnim = animate(svg.querySelectorAll('.anim-chip'), {
      translateY: [-2, 2],
      duration: 2200,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
      delay: stagger(200),
    });

    return () => {
      btnAnim.revert();
      glowAnim.revert();
      checksAnim.revert();
      chipsAnim.revert();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ambient */}
      <circle
        cx="160"
        cy="120"
        r="90"
        fill="#38BDF8"
        fillOpacity="0.04"
      />

      {/* === Category Quick Chips (top) === */}
      <rect
        className="anim-chip"
        x="55"
        y="28"
        width="60"
        height="22"
        rx="11"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="1.5"
      />
      <circle
        cx="68"
        cy="39"
        r="3"
        fill="#38BDF8"
      />

      <rect
        className="anim-chip"
        x="125"
        y="28"
        width="65"
        height="22"
        rx="11"
        fill="#1E293B"
        stroke="#A78BFA"
        strokeWidth="1.5"
      />
      <circle
        cx="138"
        cy="39"
        r="3"
        fill="#A78BFA"
      />

      <rect
        className="anim-chip"
        x="200"
        y="28"
        width="62"
        height="22"
        rx="11"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="1.5"
      />
      <circle
        cx="213"
        cy="39"
        r="3"
        fill="#38BDF8"
      />

      {/* === Sleek Dark Card (center) === */}
      <rect
        x="80"
        y="60"
        width="160"
        height="145"
        rx="16"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="2"
      />

      {/* Card content lines */}
      <line
        x1="100"
        y1="85"
        x2="175"
        y2="85"
        stroke="#475569"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="102"
        x2="150"
        y2="102"
        stroke="#334155"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="116"
        x2="165"
        y2="116"
        stroke="#334155"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Amount display */}
      <rect
        x="100"
        y="130"
        width="80"
        height="24"
        rx="6"
        fill="#0F172A"
      />
      <line
        x1="110"
        y1="142"
        x2="165"
        y2="142"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* === Giant Glowing Tap Button === */}
      <g
        className="anim-button"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle
          cx="195"
          cy="168"
          r="20"
          fill="#38BDF8"
        />
        {/* Plus icon */}
        <line
          x1="188"
          y1="168"
          x2="202"
          y2="168"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="195"
          y1="161"
          x2="195"
          y2="175"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      {/* Glow ring */}
      <circle
        className="anim-glow"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="195"
        cy="168"
        r="27"
        stroke="#38BDF8"
        strokeWidth="2"
        fill="none"
        opacity="0.25"
      />

      {/* === Floating Checklist Items (right side) === */}
      <g className="anim-check">
        <rect
          x="255"
          y="70"
          width="48"
          height="18"
          rx="9"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="1"
        />
        <path
          d="M262 79L265 82L272 76"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="anim-check">
        <rect
          x="260"
          y="96"
          width="48"
          height="18"
          rx="9"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="1"
        />
        <path
          d="M267 105L270 108L277 102"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="anim-check">
        <rect
          x="255"
          y="122"
          width="48"
          height="18"
          rx="9"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="1"
        />
        <path
          d="M262 131L265 134L272 128"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Left side floating items */}
      <g className="anim-check">
        <rect
          x="18"
          y="80"
          width="48"
          height="18"
          rx="9"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="1"
        />
        <path
          d="M25 89L28 92L35 86"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="anim-check">
        <rect
          x="22"
          y="106"
          width="48"
          height="18"
          rx="9"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="1"
        />
        <path
          d="M29 115L32 118L39 112"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
