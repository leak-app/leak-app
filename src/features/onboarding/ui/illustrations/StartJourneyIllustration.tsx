import { animate, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

export function StartJourneyIllustration({
  className = 'w-full h-auto max-h-56',
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Pathway glow pulse
    const pathAnim = animate(svg.querySelector('.anim-path-glow'), {
      opacity: [0.15, 0.4],
      duration: 2200,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    // Forward motion dashes
    const dashAnim = animate(svg.querySelector('.anim-dash'), {
      strokeDashoffset: [0, -24],
      duration: 1400,
      ease: 'linear',
      loop: true,
    });

    // Sparkle accents
    const sparklesAnim = animate(svg.querySelectorAll('.anim-sparkle'), {
      opacity: [0.3, 1],
      scale: [0.8, 1.2],
      transformOrigin: 'center',
      duration: 1500,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
      delay: stagger(300),
    });

    // Horizon star pulse
    const starAnim = animate(svg.querySelector('.anim-star'), {
      scale: [0.9, 1.15],
      transformOrigin: 'center',
      duration: 2000,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    return () => {
      pathAnim.revert();
      dashAnim.revert();
      sparklesAnim.revert();
      starAnim.revert();
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
        cy="110"
        r="95"
        fill="#38BDF8"
        fillOpacity="0.03"
      />
      <circle
        cx="160"
        cy="80"
        r="50"
        fill="#A78BFA"
        fillOpacity="0.04"
      />

      {/* === Geometric Pathway (centered, receding) === */}
      {/* Path surface */}
      <path
        d="M85 200L160 50L235 200Z"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1.5"
      />

      {/* Path glow fill */}
      <path
        className="anim-path-glow"
        d="M100 190L160 70L220 190Z"
        fill="#38BDF8"
        opacity="0.2"
      />

      {/* Center dashed line (forward motion) */}
      <line
        className="anim-dash"
        x1="160"
        y1="75"
        x2="160"
        y2="195"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeDasharray="6 6"
      />

      {/* Side edge glow lines */}
      <line
        x1="93"
        y1="190"
        x2="155"
        y2="65"
        stroke="#38BDF8"
        strokeWidth="1"
        strokeOpacity="0.25"
      />
      <line
        x1="227"
        y1="190"
        x2="165"
        y2="65"
        stroke="#A78BFA"
        strokeWidth="1"
        strokeOpacity="0.25"
      />

      {/* === Horizon Star === */}
      <g
        className="anim-star"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <path
          d="M160 30L165 45L180 45L168 54L172 68L160 59L148 68L152 54L140 45L155 45Z"
          fill="#38BDF8"
        />
      </g>

      {/* Horizon glow */}
      <circle
        cx="160"
        cy="48"
        r="22"
        fill="#38BDF8"
        fillOpacity="0.08"
      />
      <circle
        cx="160"
        cy="48"
        r="12"
        fill="#A78BFA"
        fillOpacity="0.1"
      />

      {/* === Side Surface Cards === */}
      {/* Left card */}
      <rect
        x="18"
        y="95"
        width="55"
        height="38"
        rx="10"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      <line
        x1="28"
        y1="108"
        x2="58"
        y2="108"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="120"
        x2="48"
        y2="120"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Right card */}
      <rect
        x="248"
        y="105"
        width="55"
        height="38"
        rx="10"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      <line
        x1="258"
        y1="118"
        x2="288"
        y2="118"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="258"
        y1="130"
        x2="278"
        y2="130"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Bottom-left card */}
      <rect
        x="25"
        y="145"
        width="50"
        height="32"
        rx="10"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      <line
        x1="35"
        y1="158"
        x2="60"
        y2="158"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="168"
        x2="52"
        y2="168"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Bottom-right card */}
      <rect
        x="252"
        y="155"
        width="50"
        height="32"
        rx="10"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      <line
        x1="262"
        y1="168"
        x2="287"
        y2="168"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="262"
        y1="178"
        x2="279"
        y2="178"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* === Floating sparkle accents === */}
      <circle
        className="anim-sparkle"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="45"
        cy="65"
        r="4.5"
        fill="#38BDF8"
      />
      <circle
        className="anim-sparkle"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="278"
        cy="75"
        r="4"
        fill="#A78BFA"
      />
      <circle
        className="anim-sparkle"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="100"
        cy="35"
        r="3"
        fill="#A78BFA"
      />
      <circle
        className="anim-sparkle"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        cx="220"
        cy="30"
        r="3.5"
        fill="#38BDF8"
      />

      {/* Side accent lines */}
      <line
        x1="30"
        y1="195"
        x2="68"
        y2="195"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="252"
        y1="195"
        x2="290"
        y2="195"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
