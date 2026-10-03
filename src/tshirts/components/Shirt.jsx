"use client";

import { useId } from "react";

// Garment outlines in a 300x336 box; the hanger hook sits at the top centre.
const TEE =
  "M118 46 C128 64 172 64 182 46 L236 64 L292 124 L260 156 L230 128 C228 190 232 260 234 316 C200 324 100 324 66 316 C68 260 72 190 70 128 L40 156 L8 124 L64 64 Z";
const LONG =
  "M118 46 C128 64 172 64 182 46 L236 64 C262 90 276 190 286 298 L254 306 C250 240 240 180 230 140 C228 200 232 265 234 316 C200 324 100 324 66 316 C68 265 72 200 70 140 C60 180 50 240 46 306 L14 298 C24 190 38 90 64 64 Z";
const NECK = "M118 46 C130 39 170 39 182 46 C172 64 128 64 118 46 Z";
const HOOD = "M106 54 C86 0 214 0 194 54 C180 74 120 74 106 54 Z";

const script = { fontFamily: "var(--font-script)" };
const sans = { fontFamily: "var(--font-sans)" };

function Flower({ x, y, r, color }) {
  return (
    <g>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx={x}
          cy={y - r}
          rx={r * 0.55}
          ry={r}
          fill={color}
          transform={`rotate(${a} ${x} ${y})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.45} fill="#f4c430" />
    </g>
  );
}

function Graphic({ type }) {
  switch (type) {
    case "made-this":
      return (
        <text x="150" y="150" textAnchor="middle" fontSize="34" fill="#f4f2ec" style={script}>
          Made This
        </text>
      );
    case "dollar":
      return (
        <g>
          <circle cx="150" cy="158" r="40" fill="#1f9d55" />
          <circle cx="150" cy="158" r="33" fill="none" stroke="#f6f4ef" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="150" y="178" textAnchor="middle" fontSize="56" fontWeight="800" fill="#f6f4ef" style={sans}>
            $
          </text>
          <text x="150" y="226" textAnchor="middle" fontSize="24" fill="#1f9d55" style={script}>
            Made This
          </text>
        </g>
      );
    case "underclass":
      return (
        <g fill="#f4f2ec" textAnchor="middle" fontSize="31" style={script}>
          <text x="150" y="138">Escape The</text>
          <text x="150" y="174">Permanent</text>
          <text x="150" y="210">Underclass</text>
        </g>
      );
    case "remi":
      return (
        <g fill="#f4f2ec" style={sans}>
          <text x="150" y="196" textAnchor="middle" fontSize="50" fontWeight="900" letterSpacing="-2" textLength="138" lengthAdjust="spacingAndGlyphs">
            remi 3
          </text>
          <rect x="82" y="208" width="136" height="5" />
        </g>
      );
    case "flowers":
      return (
        <g>
          <g stroke="#3f8f4f" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M118 216 C120 190 112 170 108 150" />
            <path d="M150 220 C150 190 152 160 150 132" />
            <path d="M182 216 C180 192 190 172 194 154" />
            <path d="M134 218 C132 200 128 190 130 178" />
            <path d="M168 218 C170 200 172 190 170 180" />
          </g>
          <Flower x={108} y={146} r={13} color="#e8554e" />
          <Flower x={150} y={126} r={16} color="#f08fb6" />
          <Flower x={194} y={150} r={13} color="#5b8def" />
          <Flower x={130} y={176} r={10} color="#f59e2f" />
          <Flower x={170} y={178} r={10} color="#9b6bd6" />
          <text x="150" y="250" textAnchor="middle" fontSize="26" fill="#1a1917" style={script}>
            Made This
          </text>
        </g>
      );
    case "mark":
      return (
        <text x="184" y="122" textAnchor="middle" fontSize="13" fill="#9a968c" style={script}>
          bm
        </text>
      );
    default:
      return null;
  }
}

export default function Shirt({ product, className }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (s) => `${uid}-${s}`;
  const url = (s) => `url(#${id(s)})`;
  const { kind, color, inner, dark, camo, graphic } = product;
  const body = kind === "tee" ? TEE : LONG;
  const hoodie = kind === "hoodie";
  // dark fabric needs stronger highlights, light fabric stronger shadows
  const hi = dark ? 0.13 : 0.5;
  const lo = dark ? 0.45 : 0.14;

  return (
    <svg viewBox="0 0 300 336" className={className} role="img" aria-label={product.name}>
      <defs>
        <clipPath id={id("clip")}>
          <path d={body} />
        </clipPath>
        <linearGradient id={id("wood")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcb27a" />
          <stop offset="0.5" stopColor="#b98a50" />
          <stop offset="1" stopColor="#8a5f30" />
        </linearGradient>
        <linearGradient id={id("chrome")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7d8289" />
          <stop offset="0.35" stopColor="#f5f6f7" />
          <stop offset="0.65" stopColor="#a4a9af" />
          <stop offset="1" stopColor="#62676d" />
        </linearGradient>
        <linearGradient id={id("side")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity={lo * 1.3} />
          <stop offset="0.24" stopColor="#000" stopOpacity="0" />
          <stop offset="0.46" stopColor="#fff" stopOpacity={hi * 0.5} />
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity={lo * 1.6} />
        </linearGradient>
        <linearGradient id={id("fall")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={hi * 0.45} />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity={lo} />
        </linearGradient>
        <filter id={id("soft")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={id("softer")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={id("weave")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        {camo && (
          <>
            <filter id={id("camo1")} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="2" seed="4" />
              <feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.30  0 0 0 0 0.17  16 0 0 0 -8.2" />
            </filter>
            <filter id={id("camo2")} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.024 0.034" numOctaves="2" seed="11" />
              <feColorMatrix values="0 0 0 0 0.62  0 0 0 0 0.56  0 0 0 0 0.38  0 16 0 0 -9" />
            </filter>
            <filter id={id("camo3")} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.026 0.036" numOctaves="2" seed="23" />
              <feColorMatrix values="0 0 0 0 0.15  0 0 0 0 0.15  0 0 0 0 0.11  0 0 16 0 -9.2" />
            </filter>
          </>
        )}
      </defs>

      {/* back of hood / inside of neck */}
      {hoodie && <path d={HOOD} fill={inner} />}
      <path d={NECK} fill={inner} />

      {/* hanger */}
      <path d="M150 46 V26 C150 4 177 6 175 25" fill="none" stroke={url("chrome")} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M56 73 Q150 17 244 73" fill="none" stroke={url("wood")} strokeWidth="11" strokeLinecap="round" />
      <path d="M60 70 Q150 16 240 70" fill="none" stroke="#f0d2a4" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />

      {/* garment */}
      <path d={body} fill={color} style={{ pointerEvents: "auto" }} />
      <g clipPath={url("clip")}>
        {camo && (
          <>
            <rect width="300" height="336" filter={url("camo1")} />
            <rect width="300" height="336" filter={url("camo2")} />
            <rect width="300" height="336" filter={url("camo3")} />
          </>
        )}

        {hoodie && (
          <g>
            <path d="M96 236 H204 L216 296 H84 Z" fill="#000" fillOpacity="0.14" stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" />
            <rect x="60" y="298" width="180" height="26" fill="#000" fillOpacity="0.18" />
            <path d="M12 282 L48 290 M252 290 L288 282" stroke="#000" strokeOpacity="0.4" strokeWidth="2" />
          </g>
        )}

        <Graphic type={graphic} />

        {/* hang folds */}
        <g filter={url("soft")} fill="none" strokeLinecap="round">
          <path d="M104 120 C96 200 112 280 102 356" stroke="#000" strokeOpacity={lo} strokeWidth="11" />
          <path d="M120 130 C114 210 126 290 118 356" stroke="#fff" strokeOpacity={hi * 0.6} strokeWidth="8" />
          <path d="M176 150 C186 220 172 290 182 356" stroke="#000" strokeOpacity={lo * 0.9} strokeWidth="10" />
          <path d="M194 140 C202 220 192 300 198 356" stroke="#fff" strokeOpacity={hi * 0.5} strokeWidth="7" />
          <path d="M146 250 C142 290 150 330 146 358" stroke="#000" strokeOpacity={lo * 0.6} strokeWidth="8" />
          <path d="M72 126 C92 112 108 96 122 76" stroke="#000" strokeOpacity={lo * 0.9} strokeWidth="7" />
          <path d="M228 126 C208 112 192 96 178 76" stroke="#000" strokeOpacity={lo * 0.9} strokeWidth="7" />
          <path d="M66 70 C100 82 200 82 234 70" stroke="#fff" strokeOpacity={hi * 0.7} strokeWidth="8" />
        </g>
        {/* fine wrinkles */}
        <g filter={url("softer")} fill="none" strokeLinecap="round" stroke="#000" strokeOpacity={lo * 0.8} strokeWidth="2">
          <path d="M78 142 C96 150 110 150 124 144" />
          <path d="M222 142 C204 152 190 150 178 146" />
          <path d="M84 272 C110 282 130 278 150 284" />
          <path d="M214 258 C196 268 180 266 164 272" />
          {kind !== "tee" && (
            <>
              <path d="M30 220 C40 226 48 224 56 218" />
              <path d="M270 220 C260 226 252 224 244 218" />
              <path d="M26 262 C36 268 46 266 52 260" />
              <path d="M274 262 C264 268 254 266 248 260" />
            </>
          )}
        </g>

        <rect width="300" height="336" fill={url("side")} />
        <rect width="300" height="336" fill={url("fall")} />
        <rect width="300" height="336" filter={url("weave")} opacity={dark ? 0.16 : 0.22} style={{ mixBlendMode: "soft-light" }} />
        {/* rounded edge */}
        <path d={body} fill="none" stroke="#000" strokeOpacity={lo * 1.4} strokeWidth="9" filter={url("softer")} />
        {/* hem stitch */}
        <path d="M66 307 C100 315 200 315 234 307" fill="none" stroke={dark ? "#fff" : "#000"} strokeOpacity="0.14" strokeWidth="1" strokeDasharray="3 2" />
      </g>

      {/* collar */}
      {hoodie ? (
        <g>
          <path d="M106 54 C122 92 178 92 194 54 C186 104 114 104 106 54 Z" fill={color} />
          <path d="M106 54 C122 92 178 92 194 54" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="2" />
          <path d="M136 84 C134 104 138 122 135 140 M164 84 C167 102 163 118 166 134" fill="none" stroke="#e9e6dc" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      ) : (
        <g fill="none" strokeLinecap="round">
          <path d="M119 48 C129 67 171 67 181 48" stroke={color} strokeWidth="7" />
          <path d="M119 48 C129 67 171 67 181 48" stroke="#000" strokeOpacity={dark ? 0.35 : 0.1} strokeWidth="7" />
          <path d="M116 52 C128 74 172 74 184 52" stroke={dark ? "#fff" : "#000"} strokeOpacity="0.12" strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}
