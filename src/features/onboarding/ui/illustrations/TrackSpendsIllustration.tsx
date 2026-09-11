import { animate, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

export function TrackSpendsIllustration({
  className = 'w-full h-auto max-h-56',
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Giant coin bob
    const coinAnim = animate(svg.querySelector('.anim-coin'), {
      translateY: [-3.5, 3.5],
      duration: 2400,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    // Floating badges
    const badgesAnim = animate(svg.querySelectorAll('.anim-badge'), {
      translateY: [2.5, -2.5],
      duration: 2200,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
      delay: stagger(300),
    });

    // Total line breathing
    const totalAnim = animate(svg.querySelector('.anim-total-line'), {
      opacity: [0.5, 1],
      duration: 1800,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    // Entry float
    const entriesAnim = animate(svg.querySelectorAll('.anim-entry'), {
      translateY: [2, -2],
      opacity: [0.5, 1],
      duration: 2000,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
      delay: stagger(250),
    });

    return () => {
      coinAnim.revert();
      badgesAnim.revert();
      totalAnim.revert();
      entriesAnim.revert();
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

      {/* === Main Transaction Card (center) === */}
      <rect
        x="90"
        y="40"
        width="140"
        height="165"
        rx="14"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="2"
      />

      {/* Card header */}
      <line
        x1="110"
        y1="65"
        x2="180"
        y2="65"
        stroke="#475569"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Transaction entries on card */}
      <rect
        x="110"
        y="82"
        width="100"
        height="18"
        rx="5"
        fill="#0F172A"
      />
      <line
        x1="117"
        y1="91"
        x2="148"
        y2="91"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="185"
        y1="91"
        x2="203"
        y2="91"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect
        x="110"
        y="107"
        width="100"
        height="18"
        rx="5"
        fill="#0F172A"
      />
      <line
        x1="117"
        y1="116"
        x2="152"
        y2="116"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="185"
        y1="116"
        x2="203"
        y2="116"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect
        x="110"
        y="132"
        width="100"
        height="18"
        rx="5"
        fill="#0F172A"
      />
      <line
        x1="117"
        y1="141"
        x2="145"
        y2="141"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="185"
        y1="141"
        x2="203"
        y2="141"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Total block */}
      <rect
        x="110"
        y="160"
        width="100"
        height="26"
        rx="8"
        fill="#334155"
      />
      <line
        className="anim-total-line"
        x1="125"
        y1="173"
        x2="195"
        y2="173"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* === Category tag being attached === */}
      <rect
        x="165"
        y="25"
        width="58"
        height="22"
        rx="11"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="1.5"
      />
      <circle
        cx="178"
        cy="36"
        r="3.5"
        fill="#38BDF8"
      />
      <line
        x1="185"
        y1="36"
        x2="213"
        y2="36"
        stroke="#38BDF8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* === Giant Glowing Coin (left) === */}
      <g className="anim-coin">
        <circle
          cx="42"
          cy="80"
          r="26"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="2.5"
        />
        <circle
          cx="42"
          cy="80"
          r="19"
          fill="#38BDF8"
          fillOpacity="0.12"
        />
        <text
          x="42"
          y="87"
          textAnchor="middle"
          fill="#38BDF8"
          fontSize="18"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          $
        </text>
      </g>

      {/* === Floating Category Badges === */}
      <g className="anim-badge">
        <rect
          x="242"
          y="65"
          width="55"
          height="22"
          rx="11"
          fill="#1E293B"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />
        <circle
          cx="254"
          cy="76"
          r="3.5"
          fill="#38BDF8"
        />
      </g>
      <g className="anim-badge">
        <rect
          x="248"
          y="100"
          width="55"
          height="22"
          rx="11"
          fill="#1E293B"
          stroke="#A78BFA"
          strokeWidth="1.5"
        />
        <circle
          cx="260"
          cy="111"
          r="3.5"
          fill="#A78BFA"
        />
      </g>
      <g className="anim-badge">
        <rect
          x="240"
          y="135"
          width="55"
          height="22"
          rx="11"
          fill="#1E293B"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />
        <circle
          cx="252"
          cy="146"
          r="3.5"
          fill="#38BDF8"
        />
      </g>

      {/* === Floating spending entries (left) === */}
      <g className="anim-entry">
        <rect
          x="22"
          y="130"
          width="48"
          height="14"
          rx="7"
          fill="#1E293B"
          stroke="#475569"
          strokeWidth="1"
        />
      </g>
      <g className="anim-entry">
        <rect
          x="18"
          y="150"
          width="52"
          height="14"
          rx="7"
          fill="#1E293B"
          stroke="#A78BFA"
          strokeWidth="1"
        />
      </g>

      {/* Subtle coin outlines */}
      <circle
        cx="280"
        cy="180"
        r="10"
        stroke="#334155"
        strokeWidth="1"
        fill="none"
      />
      <circle
        cx="55"
        cy="180"
        r="7"
        stroke="#334155"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
