import { animate, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

export function WelcomeIllustration({
  className = 'w-full h-auto max-h-56',
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Phone floating bob
    const phoneAnim = animate(svg.querySelector('.anim-phone'), {
      translateY: [-4, 4],
      duration: 2800,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    // Sparkle accents
    const sparklesAnim = animate(svg.querySelectorAll('.anim-sparkle'), {
      opacity: [0.3, 1],
      scale: [0.75, 1.25],
      transformOrigin: 'center',
      duration: 1500,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
      delay: stagger(350),
    });

    // Chart line draw-in
    const chartAnim = animate(svg.querySelector('.anim-chart'), {
      strokeDashoffset: [150, 0],
      duration: 1400,
      ease: 'outCubic',
    });

    return () => {
      phoneAnim.revert();
      sparklesAnim.revert();
      chartAnim.revert();
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
      {/* Ambient glow */}
      <circle
        cx="160"
        cy="120"
        r="100"
        fill="#38BDF8"
        fillOpacity="0.04"
      />
      <circle
        cx="160"
        cy="120"
        r="65"
        fill="#A78BFA"
        fillOpacity="0.03"
      />

      {/* === Floating Smartphone Mockup (centered) === */}
      <g className="anim-phone">
        {/* Phone body */}
        <rect
          x="110"
          y="28"
          width="100"
          height="175"
          rx="16"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="2"
        />
        {/* Screen area */}
        <rect
          x="118"
          y="44"
          width="84"
          height="142"
          rx="8"
          fill="#0F172A"
        />

        {/* Status bar */}
        <circle
          cx="160"
          cy="37"
          r="1.5"
          fill="#475569"
        />

        {/* Pipeline diagram on screen */}
        <rect
          x="130"
          y="60"
          width="56"
          height="6"
          rx="3"
          fill="#334155"
        />
        <rect
          x="130"
          y="60"
          width="20"
          height="6"
          rx="3"
          fill="#38BDF8"
        />
        <rect
          x="154"
          y="60"
          width="14"
          height="6"
          rx="3"
          fill="#A78BFA"
        />

        {/* Metric cards on screen */}
        <rect
          x="130"
          y="76"
          width="56"
          height="22"
          rx="6"
          fill="#1E293B"
        />
        <line
          x1="136"
          y1="84"
          x2="162"
          y2="84"
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="136"
          y1="92"
          x2="150"
          y2="92"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <rect
          x="130"
          y="104"
          width="56"
          height="22"
          rx="6"
          fill="#1E293B"
        />
        <line
          x1="136"
          y1="112"
          x2="158"
          y2="112"
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="136"
          y1="120"
          x2="155"
          y2="120"
          stroke="#A78BFA"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Rising trend chart */}
        <path
          className="anim-chart"
          d="M130 168C140 163 150 158 160 148C170 138 180 125 192 115"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="150"
          strokeDashoffset="0"
        />
        {/* Chart area fill */}
        <path
          d="M130 168C140 163 150 158 160 148C170 138 180 125 192 115V175H130Z"
          fill="#38BDF8"
          fillOpacity="0.1"
        />
        {/* Chart baseline */}
        <line
          x1="130"
          y1="175"
          x2="192"
          y2="175"
          stroke="#334155"
          strokeWidth="1"
        />

        {/* Home indicator */}
        <rect
          x="145"
          y="192"
          width="30"
          height="3"
          rx="1.5"
          fill="#334155"
        />
      </g>

      {/* === Floating accent sparkles === */}
      <circle
        className="anim-sparkle"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="60"
        cy="55"
        r="5"
        fill="#38BDF8"
      />
      <circle
        className="anim-sparkle"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="265"
        cy="70"
        r="4"
        fill="#A78BFA"
      />
      <circle
        className="anim-sparkle"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="50"
        cy="175"
        r="3.5"
        fill="#A78BFA"
      />
      <circle
        className="anim-sparkle"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="275"
        cy="165"
        r="4.5"
        fill="#38BDF8"
      />

      {/* Side floating cards */}
      <rect
        x="30"
        y="95"
        width="55"
        height="30"
        rx="10"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      <line
        x1="40"
        y1="107"
        x2="65"
        y2="107"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="115"
        x2="55"
        y2="115"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect
        x="235"
        y="105"
        width="55"
        height="30"
        rx="10"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      <line
        x1="245"
        y1="117"
        x2="270"
        y2="117"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="245"
        y1="125"
        x2="260"
        y2="125"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
