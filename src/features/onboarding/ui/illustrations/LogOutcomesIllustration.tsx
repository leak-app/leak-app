import { animate } from 'animejs';
import { useEffect, useRef } from 'react';

export function LogOutcomesIllustration({
  className = 'w-full h-auto max-h-56',
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Counterbalancing scale pans
    const leftPanAnim = animate(svg.querySelector('.anim-pan-left'), {
      translateY: [-3, 3],
      duration: 2500,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    const rightPanAnim = animate(svg.querySelector('.anim-pan-right'), {
      translateY: [3, -3],
      duration: 2500,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    // Star pulse on rating icons
    const starsAnim = animate(svg.querySelectorAll('.anim-star'), {
      scale: [0.9, 1.1],
      transformOrigin: 'center',
      duration: 1400,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    return () => {
      leftPanAnim.revert();
      rightPanAnim.revert();
      starsAnim.revert();
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
        cy="115"
        r="90"
        fill="#A78BFA"
        fillOpacity="0.03"
      />

      {/* === Scale Structure (centered) === */}
      {/* Center Stand */}
      <line
        x1="160"
        y1="55"
        x2="160"
        y2="180"
        stroke="#475569"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Base */}
      <path
        d="M135 180H185"
        stroke="#475569"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M140 184H180"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pivot triangle */}
      <path
        d="M155 55L160 42L165 55Z"
        fill="#38BDF8"
      />

      {/* Pivot Beam */}
      <path
        d="M85 75L160 62L235 75"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* === Left Pan: Spending Block === */}
      <g className="anim-pan-left">
        <line
          x1="85"
          y1="75"
          x2="85"
          y2="108"
          stroke="#334155"
          strokeWidth="1.5"
        />
        {/* Pan dish */}
        <path
          d="M55 108C55 124 115 124 115 108Z"
          fill="#1E293B"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />
        {/* Spending block on pan */}
        <rect
          x="68"
          y="92"
          width="34"
          height="18"
          rx="5"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="1"
        />
        <line
          x1="74"
          y1="99"
          x2="96"
          y2="99"
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="74"
          y1="105"
          x2="88"
          y2="105"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* === Right Pan: Star Rating Icons === */}
      <g className="anim-pan-right">
        <line
          x1="235"
          y1="75"
          x2="235"
          y2="108"
          stroke="#334155"
          strokeWidth="1.5"
        />
        {/* Pan dish */}
        <path
          d="M205 108C205 124 265 124 265 108Z"
          fill="#1E293B"
          stroke="#A78BFA"
          strokeWidth="1.5"
        />
        {/* 5-star rating icons */}
        <g
          className="anim-star"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <path
            d="M215 100L216.8 93L221 93L217.5 97.5L218.8 103L215 100.5L211.2 103L212.5 97.5L209 93L213.2 93Z"
            fill="#A78BFA"
          />
        </g>
        <g
          className="anim-star"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <path
            d="M228 100L229.8 93L234 93L230.5 97.5L231.8 103L228 100.5L224.2 103L225.5 97.5L222 93L226.2 93Z"
            fill="#A78BFA"
          />
        </g>
        <g
          className="anim-star"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <path
            d="M241 100L242.8 93L247 93L243.5 97.5L244.8 103L241 100.5L237.2 103L238.5 97.5L235 93L239.2 93Z"
            fill="#A78BFA"
          />
        </g>
        <g
          className="anim-star"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <path
            d="M254 100L255.8 93L260 93L256.5 97.5L257.8 103L254 100.5L250.2 103L251.5 97.5L248 93L252.2 93Z"
            fill="#A78BFA"
          />
        </g>
        <g
          className="anim-star"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <path
            d="M254 100L255.8 93L260 93L256.5 97.5L257.8 103L254 100.5L250.2 103L251.5 97.5L248 93L252.2 93Z"
            fill="#A78BFA"
            fillOpacity="0.3"
          />
        </g>
      </g>

      {/* === Side labels === */}
      {/* Left label: "Cost" */}
      <rect
        x="48"
        y="140"
        width="52"
        height="20"
        rx="10"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      <line
        x1="58"
        y1="150"
        x2="88"
        y2="150"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Right label: "Value" */}
      <rect
        x="218"
        y="140"
        width="52"
        height="20"
        rx="10"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      <line
        x1="228"
        y1="150"
        x2="258"
        y2="150"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Accent dots */}
      <circle
        cx="40"
        cy="60"
        r="4"
        fill="#38BDF8"
        fillOpacity="0.4"
      />
      <circle
        cx="280"
        cy="55"
        r="3.5"
        fill="#A78BFA"
        fillOpacity="0.4"
      />
    </svg>
  );
}
