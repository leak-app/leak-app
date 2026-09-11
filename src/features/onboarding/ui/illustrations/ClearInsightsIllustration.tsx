import { animate } from 'animejs';
import { useEffect, useRef } from 'react';

export function ClearInsightsIllustration({
  className = 'w-full h-auto max-h-56',
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Outer progress ring fill
    const ringAnim = animate(svg.querySelector('.anim-ring'), {
      strokeDashoffset: [201, 55],
      duration: 1200,
      ease: 'outCubic',
    });

    // Inner ring fill
    const ring2Anim = animate(svg.querySelector('.anim-ring-2'), {
      strokeDashoffset: [151, 85],
      duration: 1400,
      delay: 200,
      ease: 'outCubic',
    });

    // Text fade-in
    const textAnim = animate(svg.querySelector('.anim-text'), {
      opacity: [0, 1],
      translateY: [4, 0],
      duration: 600,
      delay: 300,
      ease: 'outQuad',
    });

    // Chart line draw-in
    const chartAnim = animate(svg.querySelector('.anim-chart-line'), {
      strokeDashoffset: [120, 0],
      duration: 1000,
      delay: 400,
      ease: 'outQuad',
    });

    // Trend dot pulse
    const dotAnim = animate(svg.querySelector('.anim-trend-dot'), {
      scale: [0.8, 1.3],
      opacity: [0.6, 1],
      transformOrigin: 'center',
      duration: 1600,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
      delay: 1200,
    });

    return () => {
      ringAnim.revert();
      ring2Anim.revert();
      textAnim.revert();
      chartAnim.revert();
      dotAnim.revert();
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
        r="100"
        fill="#38BDF8"
        fillOpacity="0.03"
      />

      {/* === Dashboard Panel (centered, wide) === */}
      <rect
        x="35"
        y="30"
        width="250"
        height="180"
        rx="16"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="2"
      />

      {/* Panel header bar */}
      <line
        x1="55"
        y1="55"
        x2="130"
        y2="55"
        stroke="#475569"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="255"
        cy="55"
        r="4"
        fill="#334155"
      />
      <circle
        cx="243"
        cy="55"
        r="4"
        fill="#334155"
      />

      {/* === Circular Progress Rings (left area) === */}
      {/* Outer ring track */}
      <circle
        cx="115"
        cy="135"
        r="32"
        stroke="#334155"
        strokeWidth="7"
      />
      {/* Outer ring fill - cyan */}
      <circle
        className="anim-ring"
        cx="115"
        cy="135"
        r="32"
        stroke="#38BDF8"
        strokeWidth="7"
        strokeDasharray="201"
        strokeDashoffset="55"
        strokeLinecap="round"
        transform="rotate(-90 115 135)"
      />

      {/* Inner ring track */}
      <circle
        cx="115"
        cy="135"
        r="23"
        stroke="#334155"
        strokeWidth="5"
      />
      {/* Inner ring fill - purple */}
      <circle
        className="anim-ring-2"
        cx="115"
        cy="135"
        r="23"
        stroke="#A78BFA"
        strokeWidth="5"
        strokeDasharray="151"
        strokeDashoffset="85"
        strokeLinecap="round"
        transform="rotate(-90 115 135)"
      />

      {/* Center percentage */}
      <text
        className="anim-text"
        x="115"
        y="140"
        textAnchor="middle"
        fill="#38BDF8"
        fontSize="14"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        72%
      </text>

      {/* === Right side metrics === */}
      {/* Mini bar chart */}
      <rect
        x="175"
        y="85"
        width="14"
        height="35"
        rx="3"
        fill="#334155"
      />
      <rect
        x="175"
        y="100"
        width="14"
        height="20"
        rx="3"
        fill="#38BDF8"
        fillOpacity="0.5"
      />
      <rect
        x="195"
        y="75"
        width="14"
        height="45"
        rx="3"
        fill="#334155"
      />
      <rect
        x="195"
        y="95"
        width="14"
        height="25"
        rx="3"
        fill="#A78BFA"
        fillOpacity="0.5"
      />
      <rect
        x="215"
        y="90"
        width="14"
        height="30"
        rx="3"
        fill="#334155"
      />
      <rect
        x="215"
        y="102"
        width="14"
        height="18"
        rx="3"
        fill="#38BDF8"
        fillOpacity="0.5"
      />
      <rect
        x="235"
        y="80"
        width="14"
        height="40"
        rx="3"
        fill="#334155"
      />
      <rect
        x="235"
        y="98"
        width="14"
        height="22"
        rx="3"
        fill="#A78BFA"
        fillOpacity="0.5"
      />

      {/* === Trend Line Chart (bottom right) === */}
      <path
        className="anim-chart-line"
        d="M175 175C190 168 200 172 215 158C230 144 245 135 260 125"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="120"
        strokeDashoffset="0"
      />
      {/* Chart area fill */}
      <path
        d="M175 175C190 168 200 172 215 158C230 144 245 135 260 125V185H175Z"
        fill="#38BDF8"
        fillOpacity="0.06"
      />
      {/* Trend endpoint */}
      <circle
        className="anim-trend-dot"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="260"
        cy="125"
        r="4"
        fill="#38BDF8"
      />

      {/* Metric label lines */}
      <line
        x1="175"
        y1="145"
        x2="220"
        y2="145"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="175"
        y1="155"
        x2="200"
        y2="155"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
