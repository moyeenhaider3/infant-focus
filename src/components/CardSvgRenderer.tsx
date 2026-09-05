import React from 'react';
import { CardItem } from '../types';

interface CardSvgRendererProps {
  card: CardItem;
  inverted?: boolean;
  className?: string;
}

export const CardSvgRenderer: React.FC<CardSvgRendererProps> = ({
  card,
  inverted = false,
  className = 'w-full h-full',
}) => {
  // Base colors determined by invert mode
  const bg = inverted ? '#000000' : '#FFFFFF';
  const fg = inverted ? '#FFFFFF' : '#000000';
  const red = '#E60000';
  const blue = '#0066FF';
  const yellow = '#FFD000';

  const renderGraphic = () => {
    switch (card.svgType) {
      // ----------------------------------------------------
      // SHAPES
      // ----------------------------------------------------
      case 'concentric-circle':
        return (
          <g>
            <circle cx="200" cy="200" r="180" fill={fg} />
            <circle cx="200" cy="200" r="140" fill={bg} />
            <circle cx="200" cy="200" r="100" fill={fg} />
            <circle cx="200" cy="200" r="60" fill={bg} />
            <circle cx="200" cy="200" r="28" fill={fg} />
          </g>
        );

      case 'checkerboard-macro':
        return (
          <g>
            <rect x="20" y="20" width="180" height="180" fill={fg} />
            <rect x="200" y="20" width="180" height="180" fill={bg} />
            <rect x="20" y="200" width="180" height="180" fill={bg} />
            <rect x="200" y="200" width="180" height="180" fill={fg} />
            <rect x="20" y="20" width="360" height="360" fill="none" stroke={fg} strokeWidth="12" />
          </g>
        );

      case 'solid-triangle':
        return (
          <g>
            <polygon points="200,30 370,350 30,350" fill={fg} />
            <polygon points="200,140 300,320 100,320" fill={bg} />
            <polygon points="200,210 245,295 155,295" fill={fg} />
          </g>
        );

      case 'nested-squares':
        return (
          <g>
            <rect x="30" y="30" width="340" height="340" fill={fg} />
            <rect x="75" y="75" width="250" height="250" fill={bg} />
            <rect x="120" y="120" width="160" height="160" fill={fg} />
            <rect x="160" y="160" width="80" height="80" fill={bg} />
            <rect x="185" y="185" width="30" height="30" fill={fg} />
          </g>
        );

      case 'diamond-matrix':
        return (
          <g>
            <polygon points="200,20 380,200 200,380 20,200" fill={fg} />
            <polygon points="200,70 330,200 200,330 70,200" fill={bg} />
            <polygon points="200,120 280,200 200,280 120,200" fill={fg} />
            <polygon points="200,165 235,200 200,235 165,200" fill={bg} />
          </g>
        );

      case 'harmonic-half':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={bg} stroke={fg} strokeWidth="10" />
            <path d="M 200 30 A 170 170 0 0 1 200 370 A 85 85 0 0 1 200 200 A 85 85 0 0 0 200 30 Z" fill={fg} />
            <circle cx="200" cy="115" r="30" fill={bg} />
            <circle cx="200" cy="285" r="30" fill={fg} />
          </g>
        );

      // ----------------------------------------------------
      // FACES (Schematic & High Contrast)
      // ----------------------------------------------------
      case 'face-schematic-smile':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill="none" stroke={fg} strokeWidth="18" />
            {/* Eyes */}
            <circle cx="140" cy="145" r="28" fill={fg} />
            <circle cx="260" cy="145" r="28" fill={fg} />
            <circle cx="132" cy="138" r="8" fill={bg} />
            <circle cx="252" cy="138" r="8" fill={bg} />
            {/* Smile */}
            <path d="M 120 230 Q 200 320 280 230" fill="none" stroke={fg} strokeWidth="20" strokeLinecap="round" />
            {/* Nose dot */}
            <circle cx="200" cy="195" r="12" fill={fg} />
          </g>
        );

      case 'face-direct-eyes':
        return (
          <g>
            <rect x="25" y="25" width="350" height="350" rx="36" fill="none" stroke={fg} strokeWidth="14" />
            {/* Left Eye */}
            <ellipse cx="120" cy="170" rx="55" ry="38" fill={fg} />
            <ellipse cx="120" cy="170" rx="36" ry="36" fill={bg} />
            <circle cx="120" cy="170" r="22" fill={fg} />
            <circle cx="114" cy="164" r="6" fill={bg} />
            {/* Right Eye */}
            <ellipse cx="280" cy="170" rx="55" ry="38" fill={fg} />
            <ellipse cx="280" cy="170" rx="36" ry="36" fill={bg} />
            <circle cx="280" cy="170" r="22" fill={fg} />
            <circle cx="274" cy="164" r="6" fill={bg} />
            {/* Eyebrows */}
            <path d="M 75 110 Q 120 85 165 110" fill="none" stroke={fg} strokeWidth="14" strokeLinecap="round" />
            <path d="M 235 110 Q 280 85 325 110" fill="none" stroke={fg} strokeWidth="14" strokeLinecap="round" />
            {/* Gentle smile */}
            <path d="M 140 270 Q 200 320 260 270" fill="none" stroke={fg} strokeWidth="16" strokeLinecap="round" />
          </g>
        );

      case 'face-wink':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={fg} />
            <circle cx="200" cy="200" r="148" fill={bg} />
            {/* Open Eye */}
            <circle cx="140" cy="150" r="28" fill={fg} />
            <circle cx="132" cy="142" r="8" fill={bg} />
            {/* Winking Eye */}
            <path d="M 235 155 Q 265 130 295 155" fill="none" stroke={fg} strokeWidth="16" strokeLinecap="round" />
            {/* Big Smile with Tongue/Dimple */}
            <path d="M 125 230 Q 200 330 275 230 Z" fill={fg} />
            <circle cx="200" cy="270" r="18" fill={bg} />
          </g>
        );

      case 'face-profile':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill="none" stroke={fg} strokeWidth="14" />
            <path
              d="M 150 70 Q 180 60 210 90 Q 215 130 215 150 L 250 175 L 215 195 L 215 215 Q 235 225 220 240 L 205 245 Q 225 265 195 285 L 180 330"
              fill="none"
              stroke={fg}
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="175" cy="145" r="14" fill={fg} />
          </g>
        );

      case 'face-crescents':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={fg} />
            <circle cx="200" cy="200" r="145" fill={bg} />
            {/* Happy arch eyes */}
            <path d="M 105 160 Q 140 100 175 160" fill="none" stroke={fg} strokeWidth="22" strokeLinecap="round" />
            <path d="M 225 160 Q 260 100 295 160" fill="none" stroke={fg} strokeWidth="22" strokeLinecap="round" />
            {/* Laughing open mouth */}
            <path d="M 130 220 Q 200 320 270 220 Z" fill={fg} />
          </g>
        );

      case 'face-tri-dots':
        return (
          <g>
            {/* Classic CONSPEC infant face template: oval with top 2 dots and bottom 1 dot */}
            <ellipse cx="200" cy="200" rx="140" ry="175" fill="none" stroke={fg} strokeWidth="18" />
            <circle cx="150" cy="140" r="32" fill={fg} />
            <circle cx="250" cy="140" r="32" fill={fg} />
            <circle cx="200" cy="260" r="32" fill={fg} />
          </g>
        );

      // ----------------------------------------------------
      // PATTERNS (Concentric, Radial, Optical)
      // ----------------------------------------------------
      case 'pattern-bullseye':
        return (
          <g>
            <circle cx="200" cy="200" r="180" fill={fg} />
            <circle cx="200" cy="200" r="145" fill={bg} />
            <circle cx="200" cy="200" r="110" fill={fg} />
            <circle cx="200" cy="200" r="75" fill={bg} />
            <circle cx="200" cy="200" r="40" fill={fg} />
          </g>
        );

      case 'pattern-sunburst':
        return (
          <g>
            <circle cx="200" cy="200" r="175" fill={bg} stroke={fg} strokeWidth="8" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const nextAngle = ((i * 30 + 15) * Math.PI) / 180;
              const x1 = 200 + 175 * Math.cos(angle);
              const y1 = 200 + 175 * Math.sin(angle);
              const x2 = 200 + 175 * Math.cos(nextAngle);
              const y2 = 200 + 175 * Math.sin(nextAngle);
              return (
                <path
                  key={i}
                  d={`M 200 200 L ${x1} ${y1} A 175 175 0 0 1 ${x2} ${y2} Z`}
                  fill={fg}
                />
              );
            })}
            <circle cx="200" cy="200" r="45" fill={fg} stroke={bg} strokeWidth="10" />
          </g>
        );

      case 'pattern-stripes-vertical':
        return (
          <g>
            <rect x="20" y="20" width="360" height="360" fill={bg} stroke={fg} strokeWidth="12" />
            <rect x="55" y="20" width="45" height="360" fill={fg} />
            <rect x="145" y="20" width="45" height="360" fill={fg} />
            <rect x="235" y="20" width="45" height="360" fill={fg} />
            <rect x="325" y="20" width="45" height="360" fill={fg} />
          </g>
        );

      case 'pattern-arch-spiral':
        return (
          <g>
            <path
              d="M 200 200
                 A 15 15 0 0 1 200 230
                 A 35 35 0 0 1 200 160
                 A 65 65 0 0 1 200 290
                 A 100 100 0 0 1 200 90
                 A 135 135 0 0 1 200 360
                 A 170 170 0 0 1 200 20"
              fill="none"
              stroke={fg}
              strokeWidth="22"
              strokeLinecap="round"
            />
          </g>
        );

      case 'pattern-chevron':
        return (
          <g>
            <path d="M 50 80 L 200 160 L 350 80" fill="none" stroke={fg} strokeWidth="26" strokeLinecap="round" />
            <path d="M 50 170 L 200 250 L 350 170" fill="none" stroke={fg} strokeWidth="26" strokeLinecap="round" />
            <path d="M 50 260 L 200 340 L 350 260" fill="none" stroke={fg} strokeWidth="26" strokeLinecap="round" />
          </g>
        );

      case 'pattern-macro-dots':
        return (
          <g>
            <circle cx="100" cy="100" r="45" fill={fg} />
            <circle cx="200" cy="100" r="45" fill={fg} />
            <circle cx="300" cy="100" r="45" fill={fg} />
            <circle cx="100" cy="200" r="45" fill={fg} />
            <circle cx="200" cy="200" r="45" fill={fg} />
            <circle cx="300" cy="200" r="45" fill={fg} />
            <circle cx="100" cy="300" r="45" fill={fg} />
            <circle cx="200" cy="300" r="45" fill={fg} />
            <circle cx="300" cy="300" r="45" fill={fg} />
          </g>
        );

      // ----------------------------------------------------
      // ANIMALS (High-contrast silhouettes)
      // ----------------------------------------------------
      case 'animal-panda':
        return (
          <g>
            {/* Panda head */}
            <circle cx="200" cy="210" r="115" fill={bg} stroke={fg} strokeWidth="14" />
            {/* Ears */}
            <circle cx="110" cy="115" r="42" fill={fg} />
            <circle cx="290" cy="115" r="42" fill={fg} />
            {/* Eye patches */}
            <ellipse cx="150" cy="195" rx="30" ry="24" transform="rotate(-20 150 195)" fill={fg} />
            <ellipse cx="250" cy="195" rx="30" ry="24" transform="rotate(20 250 195)" fill={fg} />
            {/* Pupil reflections */}
            <circle cx="154" cy="195" r="9" fill={bg} />
            <circle cx="246" cy="195" r="9" fill={bg} />
            {/* Nose & mouth */}
            <ellipse cx="200" cy="245" rx="20" ry="14" fill={fg} />
            <path d="M 200 259 L 200 275 M 180 275 Q 200 295 220 275" fill="none" stroke={fg} strokeWidth="8" strokeLinecap="round" />
          </g>
        );

      case 'animal-penguin':
        return (
          <g>
            {/* Penguin body silhouette */}
            <ellipse cx="200" cy="220" rx="100" ry="150" fill={fg} />
            {/* White belly */}
            <ellipse cx="200" cy="235" rx="65" ry="110" fill={bg} />
            {/* Eyes */}
            <circle cx="170" cy="130" r="14" fill={bg} />
            <circle cx="230" cy="130" r="14" fill={bg} />
            <circle cx="170" cy="130" r="7" fill={fg} />
            <circle cx="230" cy="130" r="7" fill={fg} />
            {/* Beak */}
            <polygon points="200,145 185,165 215,165" fill={fg} />
            {/* Feet */}
            <ellipse cx="160" cy="370" rx="28" ry="14" fill={fg} />
            <ellipse cx="240" cy="370" rx="28" ry="14" fill={fg} />
          </g>
        );

      case 'animal-cat':
        return (
          <g>
            {/* Ears */}
            <polygon points="100,170 80,60 170,110" fill={fg} />
            <polygon points="300,170 320,60 230,110" fill={fg} />
            {/* Face */}
            <circle cx="200" cy="210" r="115" fill={fg} />
            {/* Eyes */}
            <ellipse cx="150" cy="190" rx="24" ry="16" fill={bg} />
            <ellipse cx="250" cy="190" rx="24" ry="16" fill={bg} />
            <ellipse cx="150" cy="190" rx="9" ry="16" fill={fg} />
            <ellipse cx="250" cy="190" rx="9" ry="16" fill={fg} />
            {/* Nose & Whiskers */}
            <polygon points="200,225 190,215 210,215" fill={bg} />
            <line x1="80" y1="210" x2="140" y2="225" stroke={bg} strokeWidth="8" strokeLinecap="round" />
            <line x1="75" y1="235" x2="140" y2="235" stroke={bg} strokeWidth="8" strokeLinecap="round" />
            <line x1="320" y1="210" x2="260" y2="225" stroke={bg} strokeWidth="8" strokeLinecap="round" />
            <line x1="325" y1="235" x2="260" y2="235" stroke={bg} strokeWidth="8" strokeLinecap="round" />
          </g>
        );

      case 'animal-owl':
        return (
          <g>
            {/* Owl body */}
            <ellipse cx="200" cy="220" rx="120" ry="150" fill={fg} />
            {/* Huge eye disks */}
            <circle cx="150" cy="160" r="50" fill={bg} />
            <circle cx="250" cy="160" r="50" fill={bg} />
            <circle cx="150" cy="160" r="32" fill={fg} />
            <circle cx="250" cy="160" r="32" fill={fg} />
            <circle cx="140" cy="150" r="10" fill={bg} />
            <circle cx="240" cy="150" r="10" fill={bg} />
            {/* Beak */}
            <polygon points="200,185 185,225 215,225" fill={bg} />
            {/* Belly feathers */}
            <path d="M 160 270 Q 200 300 240 270" fill="none" stroke={bg} strokeWidth="10" strokeLinecap="round" />
            <path d="M 170 305 Q 200 330 230 305" fill="none" stroke={bg} strokeWidth="10" strokeLinecap="round" />
          </g>
        );

      case 'animal-elephant':
        return (
          <g>
            {/* Body and head */}
            <circle cx="230" cy="210" r="95" fill={fg} />
            <ellipse cx="140" cy="200" rx="65" ry="85" fill={fg} />
            {/* Big ear */}
            <ellipse cx="180" cy="190" rx="45" ry="65" fill={bg} stroke={fg} strokeWidth="10" />
            {/* Trunk */}
            <path d="M 100 200 Q 60 220 55 260 Q 50 310 90 310 Q 110 305 105 285" fill="none" stroke={fg} strokeWidth="26" strokeLinecap="round" />
            {/* Eye */}
            <circle cx="130" cy="155" r="10" fill={bg} />
            <circle cx="128" cy="153" r="4" fill={fg} />
          </g>
        );

      case 'animal-butterfly':
        return (
          <g>
            {/* Wings left */}
            <ellipse cx="115" cy="130" rx="80" ry="60" transform="rotate(-25 115 130)" fill={fg} />
            <ellipse cx="125" cy="250" rx="60" ry="45" transform="rotate(20 125 250)" fill={fg} />
            {/* Wings right */}
            <ellipse cx="285" cy="130" rx="80" ry="60" transform="rotate(25 285 130)" fill={fg} />
            <ellipse cx="275" cy="250" rx="60" ry="45" transform="rotate(-20 275 250)" fill={fg} />
            {/* Inner wing circles */}
            <circle cx="115" cy="130" r="24" fill={bg} />
            <circle cx="285" cy="130" r="24" fill={bg} />
            <circle cx="125" cy="250" r="16" fill={bg} />
            <circle cx="275" cy="250" r="16" fill={bg} />
            {/* Center body */}
            <rect x="190" y="90" width="20" height="210" rx="10" fill={fg} />
            <circle cx="200" cy="80" r="16" fill={fg} />
          </g>
        );

      // ----------------------------------------------------
      // STAGE 2: RED ACCENTS
      // ----------------------------------------------------
      case 'shape-red-core':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={fg} />
            <circle cx="200" cy="200" r="125" fill={bg} />
            <circle cx="200" cy="200" r="75" fill={red} />
            <circle cx="200" cy="200" r="28" fill={bg} />
          </g>
        );

      case 'shape-red-ring':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={bg} stroke={fg} strokeWidth="18" />
            <circle cx="200" cy="200" r="130" fill="none" stroke={red} strokeWidth="32" />
            <circle cx="200" cy="200" r="70" fill={fg} />
          </g>
        );

      case 'shape-red-cross':
        return (
          <g>
            <rect x="40" y="40" width="320" height="320" fill={fg} />
            <rect x="160" y="60" width="80" height="280" fill={red} />
            <rect x="60" y="160" width="280" height="80" fill={red} />
            <circle cx="200" cy="200" r="35" fill={bg} />
          </g>
        );

      case 'shape-red-heart':
        return (
          <g>
            <path
              d="M 200 110
                 A 65 65 0 0 0 70 180
                 C 70 260 200 330 200 330
                 C 200 330 330 260 330 180
                 A 65 65 0 0 0 200 110 Z"
              fill={red}
              stroke={fg}
              strokeWidth="24"
            />
            <circle cx="160" cy="180" r="16" fill={bg} />
          </g>
        );

      case 'shape-red-squares':
        return (
          <g>
            <rect x="30" y="30" width="340" height="340" fill={fg} />
            <rect x="80" y="80" width="240" height="240" fill={red} />
            <rect x="130" y="130" width="140" height="140" fill={bg} />
            <rect x="170" y="170" width="60" height="60" fill={fg} />
          </g>
        );

      case 'shape-red-diamond':
        return (
          <g>
            <polygon points="200,20 380,200 200,380 20,200" fill={fg} />
            <polygon points="200,65 335,200 200,335 65,200" fill={red} />
            <polygon points="200,120 280,200 200,280 120,200" fill={bg} />
            <circle cx="200" cy="200" r="32" fill={fg} />
          </g>
        );

      case 'face-red-cheeks':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill="none" stroke={fg} strokeWidth="18" />
            <circle cx="140" cy="140" r="26" fill={fg} />
            <circle cx="260" cy="140" r="26" fill={fg} />
            <circle cx="134" cy="134" r="8" fill={bg} />
            <circle cx="254" cy="134" r="8" fill={bg} />
            {/* Bright Red Cheeks */}
            <circle cx="105" cy="205" r="30" fill={red} />
            <circle cx="295" cy="205" r="30" fill={red} />
            {/* Smile */}
            <path d="M 140 240 Q 200 315 260 240" fill="none" stroke={fg} strokeWidth="18" strokeLinecap="round" />
          </g>
        );

      case 'face-red-lips':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={fg} />
            <circle cx="200" cy="200" r="148" fill={bg} />
            <circle cx="135" cy="145" r="24" fill={fg} />
            <circle cx="265" cy="145" r="24" fill={fg} />
            {/* Bright Red Smile / Lips */}
            <path d="M 120 230 Q 200 320 280 230 Q 200 270 120 230 Z" fill={red} stroke={fg} strokeWidth="6" />
          </g>
        );

      case 'face-red-hat':
        return (
          <g>
            <circle cx="200" cy="240" r="130" fill="none" stroke={fg} strokeWidth="16" />
            <circle cx="150" cy="220" r="22" fill={fg} />
            <circle cx="250" cy="220" r="22" fill={fg} />
            <path d="M 160 290 Q 200 330 240 290" fill="none" stroke={fg} strokeWidth="16" strokeLinecap="round" />
            {/* Red pointy cap */}
            <polygon points="70,170 200,25 330,170" fill={red} stroke={fg} strokeWidth="10" />
            <circle cx="200" cy="25" r="20" fill={fg} />
          </g>
        );

      case 'face-red-iris':
        return (
          <g>
            <rect x="25" y="25" width="350" height="350" rx="30" fill="none" stroke={fg} strokeWidth="14" />
            {/* Left eye with red iris */}
            <ellipse cx="120" cy="170" rx="55" ry="40" fill={fg} />
            <circle cx="120" cy="170" r="32" fill={red} />
            <circle cx="120" cy="170" r="18" fill={fg} />
            <circle cx="114" cy="164" r="5" fill={bg} />
            {/* Right eye with red iris */}
            <ellipse cx="280" cy="170" rx="55" ry="40" fill={fg} />
            <circle cx="280" cy="170" r="32" fill={red} />
            <circle cx="280" cy="170" r="18" fill={fg} />
            <circle cx="274" cy="164" r="5" fill={bg} />
            {/* Smile */}
            <path d="M 130 270 Q 200 330 270 270" fill="none" stroke={fg} strokeWidth="18" strokeLinecap="round" />
          </g>
        );

      case 'face-peek-red':
        return (
          <g>
            <rect x="20" y="180" width="360" height="200" fill={fg} />
            <circle cx="200" cy="180" r="110" fill={bg} stroke={fg} strokeWidth="12" />
            <circle cx="160" cy="145" r="22" fill={fg} />
            <circle cx="240" cy="145" r="22" fill={fg} />
            <circle cx="155" cy="140" r="7" fill={bg} />
            <circle cx="235" cy="140" r="7" fill={bg} />
            <path d="M 175 190 Q 200 205 225 190" fill="none" stroke={fg} strokeWidth="10" strokeLinecap="round" />
            {/* Red blanket edge banner */}
            <rect x="20" y="180" width="360" height="30" fill={red} />
          </g>
        );

      case 'face-profile-red':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={fg} />
            <circle cx="200" cy="200" r="148" fill={bg} />
            <path
              d="M 150 70 Q 180 60 210 90 Q 215 130 215 150 L 250 175 L 215 195 L 215 215 Q 235 225 220 240 L 205 245 Q 225 265 195 285 L 180 330"
              fill="none"
              stroke={red}
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="170" cy="140" r="16" fill={fg} />
          </g>
        );

      // Objects (Red & Contrast)
      case 'object-red-rattle':
        return (
          <g>
            {/* Rattle handle */}
            <rect x="185" y="180" width="30" height="150" rx="15" fill={fg} />
            <circle cx="200" cy="340" r="28" fill={red} stroke={fg} strokeWidth="8" />
            {/* Rattle ring */}
            <circle cx="200" cy="120" r="85" fill={red} stroke={fg} strokeWidth="14" />
            <circle cx="200" cy="120" r="50" fill={bg} />
            <circle cx="200" cy="120" r="26" fill={fg} />
          </g>
        );

      case 'object-red-apple':
        return (
          <g>
            {/* Stem & Leaf */}
            <path d="M 200 110 Q 205 60 230 45" fill="none" stroke={fg} strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="235" cy="70" rx="30" ry="16" transform="rotate(-30 235 70)" fill={fg} />
            {/* Apple */}
            <path
              d="M 200 115
                 C 140 70 60 120 70 210
                 C 80 310 180 350 200 350
                 C 220 350 320 310 330 210
                 C 340 120 260 70 200 115 Z"
              fill={red}
              stroke={fg}
              strokeWidth="16"
            />
            <circle cx="140" cy="170" r="18" fill={bg} />
          </g>
        );

      case 'object-red-balloon':
        return (
          <g>
            <ellipse cx="200" cy="160" rx="110" ry="130" fill={red} stroke={fg} strokeWidth="14" />
            <polygon points="190,290 210,290 200,310" fill={red} stroke={fg} strokeWidth="6" />
            <path d="M 200 310 Q 180 340 210 370" fill="none" stroke={fg} strokeWidth="8" strokeLinecap="round" />
            {/* Highlight */}
            <ellipse cx="150" cy="125" rx="26" ry="40" transform="rotate(-30 150 125)" fill={bg} opacity={0.8} />
          </g>
        );

      case 'object-clock':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={bg} stroke={fg} strokeWidth="20" />
            <circle cx="200" cy="200" r="14" fill={red} />
            {/* Tick marks */}
            <rect x="195" y="45" width="10" height="25" fill={fg} />
            <rect x="195" y="330" width="10" height="25" fill={fg} />
            <rect x="45" y="195" width="25" height="10" fill={fg} />
            <rect x="330" y="195" width="25" height="10" fill={fg} />
            {/* Hands */}
            <line x1="200" y1="200" x2="200" y2="90" stroke={fg} strokeWidth="18" strokeLinecap="round" />
            <line x1="200" y1="200" x2="280" y2="200" stroke={red} strokeWidth="14" strokeLinecap="round" />
          </g>
        );

      case 'object-strawberry':
        return (
          <g>
            <path
              d="M 120 100 Q 200 70 280 100 Q 320 190 200 360 Q 80 190 120 100 Z"
              fill={red}
              stroke={fg}
              strokeWidth="16"
            />
            {/* Green/Black Top Leaves */}
            <polygon points="200,60 160,110 240,110" fill={fg} />
            <polygon points="130,75 165,115 110,120" fill={fg} />
            <polygon points="270,75 235,115 290,120" fill={fg} />
            {/* High contrast seeds */}
            <circle cx="160" cy="160" r="8" fill={bg} />
            <circle cx="240" cy="160" r="8" fill={bg} />
            <circle cx="200" cy="210" r="8" fill={bg} />
            <circle cx="150" cy="250" r="8" fill={bg} />
            <circle cx="250" cy="250" r="8" fill={bg} />
            <circle cx="200" cy="300" r="8" fill={bg} />
          </g>
        );

      case 'object-sailboat':
        return (
          <g>
            {/* Black hull */}
            <path d="M 60 270 L 340 270 L 290 340 L 110 340 Z" fill={fg} />
            {/* Mast */}
            <line x1="190" y1="70" x2="190" y2="265" stroke={fg} strokeWidth="14" />
            {/* Big red sail */}
            <polygon points="195,80 310,245 195,245" fill={red} stroke={fg} strokeWidth="8" />
            {/* Small contrasting sail */}
            <polygon points="180,105 90,245 180,245" fill={bg} stroke={fg} strokeWidth="10" />
          </g>
        );

      case 'animal-ladybug':
        return (
          <g>
            {/* Red wing body */}
            <circle cx="200" cy="230" r="130" fill={red} stroke={fg} strokeWidth="16" />
            {/* Center dividing line */}
            <line x1="200" y1="100" x2="200" y2="360" stroke={fg} strokeWidth="16" />
            {/* Black Head */}
            <circle cx="200" cy="100" r="55" fill={fg} />
            {/* Eyes */}
            <circle cx="180" cy="70" r="10" fill={bg} />
            <circle cx="220" cy="70" r="10" fill={bg} />
            {/* Bold black spots */}
            <circle cx="140" cy="190" r="24" fill={fg} />
            <circle cx="260" cy="190" r="24" fill={fg} />
            <circle cx="130" cy="275" r="24" fill={fg} />
            <circle cx="270" cy="275" r="24" fill={fg} />
          </g>
        );

      case 'animal-red-fish':
        return (
          <g>
            {/* Fish tail */}
            <polygon points="340,110 340,290 250,200" fill={fg} />
            {/* Fish body */}
            <ellipse cx="170" cy="200" rx="120" ry="85" fill={red} stroke={fg} strokeWidth="14" />
            {/* Fin */}
            <polygon points="160,115 220,115 180,70" fill={fg} />
            {/* Eye */}
            <circle cx="110" cy="185" r="18" fill={bg} stroke={fg} strokeWidth="6" />
            <circle cx="106" cy="185" r="9" fill={fg} />
          </g>
        );

      case 'animal-red-bird':
        return (
          <g>
            {/* Body */}
            <ellipse cx="180" cy="210" rx="100" ry="75" fill={red} stroke={fg} strokeWidth="12" />
            {/* Crest / Head */}
            <circle cx="130" cy="145" r="50" fill={red} stroke={fg} strokeWidth="10" />
            <polygon points="120,95 100,55 145,105" fill={red} stroke={fg} strokeWidth="8" />
            {/* Black face mask */}
            <polygon points="115,130 80,155 140,175" fill={fg} />
            {/* Beak */}
            <polygon points="80,155 40,155 75,170" fill={fg} />
            {/* Eye */}
            <circle cx="120" cy="140" r="8" fill={bg} />
            {/* Tail */}
            <polygon points="260,230 360,280 340,210" fill={fg} />
          </g>
        );

      case 'animal-red-crab':
        return (
          <g>
            {/* Legs */}
            <line x1="80" y1="230" x2="30" y2="280" stroke={fg} strokeWidth="14" strokeLinecap="round" />
            <line x1="90" y1="260" x2="50" y2="320" stroke={fg} strokeWidth="14" strokeLinecap="round" />
            <line x1="320" y1="230" x2="370" y2="280" stroke={fg} strokeWidth="14" strokeLinecap="round" />
            <line x1="310" y1="260" x2="350" y2="320" stroke={fg} strokeWidth="14" strokeLinecap="round" />
            {/* Main Shell */}
            <ellipse cx="200" cy="240" rx="110" ry="75" fill={red} stroke={fg} strokeWidth="14" />
            {/* Claws */}
            <circle cx="95" cy="140" r="45" fill={red} stroke={fg} strokeWidth="12" />
            <circle cx="305" cy="140" r="45" fill={red} stroke={fg} strokeWidth="12" />
            <polygon points="85,120 50,70 120,95" fill={fg} />
            <polygon points="315,120 350,70 280,95" fill={fg} />
            {/* Eyes */}
            <circle cx="170" cy="170" r="16" fill={bg} stroke={fg} strokeWidth="6" />
            <circle cx="170" cy="170" r="8" fill={fg} />
            <circle cx="230" cy="170" r="16" fill={bg} stroke={fg} strokeWidth="6" />
            <circle cx="230" cy="170" r="8" fill={fg} />
          </g>
        );

      case 'animal-red-fox':
        return (
          <g>
            {/* Fox head triangle */}
            <polygon points="200,320 60,110 340,110" fill={red} stroke={fg} strokeWidth="14" />
            {/* White/light cheeks */}
            <polygon points="200,320 60,110 140,240" fill={bg} />
            <polygon points="200,320 340,110 260,240" fill={bg} />
            {/* Black nose tip */}
            <circle cx="200" cy="315" r="18" fill={fg} />
            {/* Eyes */}
            <polygon points="120,180 155,190 135,170" fill={fg} />
            <polygon points="280,180 245,190 265,170" fill={fg} />
            {/* Ears */}
            <polygon points="60,110 30,30 110,75" fill={fg} />
            <polygon points="340,110 370,30 290,75" fill={fg} />
          </g>
        );

      case 'animal-red-butterfly':
        return (
          <g>
            <ellipse cx="115" cy="130" rx="80" ry="60" transform="rotate(-25 115 130)" fill={red} stroke={fg} strokeWidth="10" />
            <ellipse cx="125" cy="250" rx="60" ry="45" transform="rotate(20 125 250)" fill={red} stroke={fg} strokeWidth="10" />
            <ellipse cx="285" cy="130" rx="80" ry="60" transform="rotate(25 285 130)" fill={red} stroke={fg} strokeWidth="10" />
            <ellipse cx="275" cy="250" rx="60" ry="45" transform="rotate(-20 275 250)" fill={red} stroke={fg} strokeWidth="10" />
            {/* Wing dots */}
            <circle cx="115" cy="130" r="22" fill={fg} />
            <circle cx="285" cy="130" r="22" fill={fg} />
            <circle cx="115" cy="130" r="8" fill={bg} />
            <circle cx="285" cy="130" r="8" fill={bg} />
            <rect x="190" y="90" width="20" height="210" rx="10" fill={fg} />
          </g>
        );

      case 'pattern-red-bullseye':
        return (
          <g>
            <circle cx="200" cy="200" r="180" fill={fg} />
            <circle cx="200" cy="200" r="145" fill={bg} />
            <circle cx="200" cy="200" r="110" fill={red} />
            <circle cx="200" cy="200" r="75" fill={bg} />
            <circle cx="200" cy="200" r="40" fill={fg} />
          </g>
        );

      case 'pattern-red-spiral':
        return (
          <g>
            <path
              d="M 200 200
                 A 20 20 0 0 1 200 240
                 A 45 45 0 0 1 200 150
                 A 75 75 0 0 1 200 300
                 A 115 115 0 0 1 200 70
                 A 155 155 0 0 1 200 380"
              fill="none"
              stroke={red}
              strokeWidth="24"
              strokeLinecap="round"
            />
            <circle cx="200" cy="200" r="20" fill={fg} />
          </g>
        );

      case 'pattern-red-grid':
        return (
          <g>
            <rect x="30" y="30" width="340" height="340" fill={bg} stroke={fg} strokeWidth="14" />
            <line x1="140" y1="30" x2="140" y2="370" stroke={fg} strokeWidth="18" />
            <line x1="260" y1="30" x2="260" y2="370" stroke={fg} strokeWidth="18" />
            <line x1="30" y1="140" x2="370" y2="140" stroke={red} strokeWidth="18" />
            <line x1="30" y1="260" x2="370" y2="260" stroke={red} strokeWidth="18" />
            {/* Red corner dots */}
            <circle cx="140" cy="140" r="22" fill={red} stroke={fg} strokeWidth="6" />
            <circle cx="260" cy="140" r="22" fill={red} stroke={fg} strokeWidth="6" />
            <circle cx="140" cy="260" r="22" fill={red} stroke={fg} strokeWidth="6" />
            <circle cx="260" cy="260" r="22" fill={red} stroke={fg} strokeWidth="6" />
          </g>
        );

      case 'pattern-red-waves':
        return (
          <g>
            <path d="M 30 100 Q 110 50 200 100 T 370 100" fill="none" stroke={fg} strokeWidth="24" strokeLinecap="round" />
            <path d="M 30 180 Q 110 130 200 180 T 370 180" fill="none" stroke={red} strokeWidth="26" strokeLinecap="round" />
            <path d="M 30 260 Q 110 210 200 260 T 370 260" fill="none" stroke={fg} strokeWidth="24" strokeLinecap="round" />
            <path d="M 30 330 Q 110 280 200 330 T 370 330" fill="none" stroke={red} strokeWidth="26" strokeLinecap="round" />
          </g>
        );

      case 'pattern-red-rays':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={fg} />
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const nextAngle = ((i * 45 + 22.5) * Math.PI) / 180;
              const x1 = 200 + 170 * Math.cos(angle);
              const y1 = 200 + 170 * Math.sin(angle);
              const x2 = 200 + 170 * Math.cos(nextAngle);
              const y2 = 200 + 170 * Math.sin(nextAngle);
              return (
                <path
                  key={i}
                  d={`M 200 200 L ${x1} ${y1} A 170 170 0 0 1 ${x2} ${y2} Z`}
                  fill={i % 2 === 0 ? red : bg}
                />
              );
            })}
            <circle cx="200" cy="200" r="45" fill={bg} stroke={fg} strokeWidth="8" />
          </g>
        );

      case 'pattern-red-matrix':
        return (
          <g>
            <rect x="25" y="25" width="350" height="350" fill={fg} rx="24" />
            <circle cx="100" cy="100" r="32" fill={bg} />
            <circle cx="200" cy="100" r="32" fill={red} />
            <circle cx="300" cy="100" r="32" fill={bg} />
            <circle cx="100" cy="200" r="32" fill={red} />
            <circle cx="200" cy="200" r="32" fill={bg} />
            <circle cx="300" cy="200" r="32" fill={red} />
            <circle cx="100" cy="300" r="32" fill={bg} />
            <circle cx="200" cy="300" r="32" fill={red} />
            <circle cx="300" cy="300" r="32" fill={bg} />
          </g>
        );

      // ----------------------------------------------------
      // STAGE 3: 2-3 MONTHS (Patterns, Spirals, Depth)
      // ----------------------------------------------------
      case 'pattern-s3-vortex':
        return (
          <g>
            <circle cx="200" cy="200" r="175" fill={fg} />
            <circle cx="200" cy="200" r="145" fill={red} />
            <circle cx="200" cy="200" r="115" fill={bg} />
            <circle cx="200" cy="200" r="85" fill={fg} />
            <circle cx="200" cy="200" r="55" fill={red} />
            <circle cx="200" cy="200" r="28" fill={bg} />
            <line x1="25" y1="200" x2="375" y2="200" stroke={fg} strokeWidth="8" />
            <line x1="200" y1="25" x2="200" y2="375" stroke={fg} strokeWidth="8" />
          </g>
        );

      case 'pattern-s3-tunnel':
        return (
          <g>
            <polygon points="200,25 375,200 200,375 25,200" fill={fg} />
            <polygon points="200,60 340,200 200,340 60,200" fill={red} />
            <polygon points="200,95 305,200 200,305 95,200" fill={bg} />
            <polygon points="200,130 270,200 200,270 130,200" fill={fg} />
            <polygon points="200,160 240,200 200,240 160,200" fill={red} />
            <polygon points="200,180 220,200 200,220 180,200" fill={bg} />
          </g>
        );

      case 'pattern-s3-kaleido':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={bg} stroke={fg} strokeWidth="12" />
            {Array.from({ length: 6 }).map((_, i) => {
              const rot = i * 60;
              return (
                <g key={i} transform={`rotate(${rot} 200 200)`}>
                  <ellipse cx="200" cy="115" rx="35" ry="60" fill={i % 2 === 0 ? red : fg} />
                  <circle cx="200" cy="115" r="14" fill={bg} />
                </g>
              );
            })}
            <circle cx="200" cy="200" r="32" fill={fg} stroke={red} strokeWidth="8" />
          </g>
        );

      case 'pattern-s3-ripple':
        return (
          <g>
            <rect x="25" y="25" width="350" height="350" fill={bg} stroke={fg} strokeWidth="10" />
            <circle cx="100" cy="200" r="120" fill="none" stroke={fg} strokeWidth="14" />
            <circle cx="100" cy="200" r="75" fill="none" stroke={red} strokeWidth="14" />
            <circle cx="300" cy="200" r="120" fill="none" stroke={fg} strokeWidth="14" />
            <circle cx="300" cy="200" r="75" fill="none" stroke={red} strokeWidth="14" />
          </g>
        );

      case 'pattern-s3-curved-checker':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={bg} stroke={fg} strokeWidth="10" />
            <path d="M 30 200 A 170 170 0 0 1 370 200 A 170 80 0 0 1 30 200 Z" fill={fg} />
            <path d="M 200 30 A 170 170 0 0 1 200 370 A 80 170 0 0 1 200 30 Z" fill={red} opacity={0.8} />
            <circle cx="200" cy="200" r="45" fill={bg} stroke={fg} strokeWidth="8" />
            <circle cx="200" cy="200" r="22" fill={red} />
          </g>
        );

      case 'pattern-s3-labyrinth':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill="none" stroke={fg} strokeWidth="22" />
            <circle cx="200" cy="200" r="125" fill="none" stroke={red} strokeWidth="22" />
            <circle cx="200" cy="200" r="80" fill="none" stroke={fg} strokeWidth="22" />
            <circle cx="200" cy="200" r="35" fill={red} />
            {/* Breaks in circles to simulate maze contours */}
            <rect x="185" y="10" width="30" height="70" fill={bg} />
            <rect x="185" y="320" width="30" height="70" fill={bg} />
          </g>
        );

      // ----------------------------------------------------
      // STAGE 4: 3-4+ MONTHS (Full Primaries: Blue, Yellow, Red)
      // ----------------------------------------------------
      case 's4-rgb-shapes':
        return (
          <g>
            <rect x="40" y="60" width="130" height="130" fill={red} stroke={fg} strokeWidth="10" />
            <circle cx="280" cy="125" r="65" fill={yellow} stroke={fg} strokeWidth="10" />
            <polygon points="200,210 320,340 80,340" fill={blue} stroke={fg} strokeWidth="10" />
            <circle cx="200" cy="285" r="22" fill={fg} />
          </g>
        );

      case 's4-primary-face':
        return (
          <g>
            <circle cx="200" cy="200" r="170" fill={yellow} stroke={fg} strokeWidth="16" />
            {/* Big blue eyes */}
            <circle cx="140" cy="150" r="32" fill={blue} stroke={fg} strokeWidth="8" />
            <circle cx="260" cy="150" r="32" fill={blue} stroke={fg} strokeWidth="8" />
            <circle cx="140" cy="150" r="14" fill={fg} />
            <circle cx="260" cy="150" r="14" fill={fg} />
            <circle cx="134" cy="144" r="5" fill={bg} />
            <circle cx="254" cy="144" r="5" fill={bg} />
            {/* Big red smile */}
            <path d="M 125 240 Q 200 330 275 240 Z" fill={red} stroke={fg} strokeWidth="10" />
            <circle cx="200" cy="200" r="16" fill={red} />
          </g>
        );

      case 's4-primary-toucan':
        return (
          <g>
            {/* Black toucan head */}
            <circle cx="140" cy="200" r="85" fill={fg} />
            <circle cx="130" cy="180" r="18" fill={blue} stroke={bg} strokeWidth="4" />
            <circle cx="130" cy="180" r="8" fill={fg} />
            {/* Gigantic Primary Beak */}
            <path d="M 170 145 C 280 140 370 200 360 250 C 310 260 230 260 170 240 Z" fill={yellow} stroke={fg} strokeWidth="10" />
            <polygon points="320,180 360,250 300,240" fill={red} />
            <path d="M 170 145 L 220 145 L 200 240 L 170 240 Z" fill={blue} />
          </g>
        );

      case 's4-primary-balloon':
        return (
          <g>
            {/* Basket */}
            <rect x="175" y="320" width="50" height="40" fill={fg} />
            <line x1="180" y1="280" x2="185" y2="320" stroke={fg} strokeWidth="6" />
            <line x1="220" y1="280" x2="215" y2="320" stroke={fg} strokeWidth="6" />
            {/* Hot air balloon sections */}
            <ellipse cx="200" cy="150" rx="120" ry="140" fill={bg} stroke={fg} strokeWidth="12" />
            <path d="M 200 10 C 270 50 270 250 200 290 C 130 250 130 50 200 10 Z" fill={red} />
            <path d="M 200 10 C 235 50 235 250 200 290 C 165 250 165 50 200 10 Z" fill={yellow} />
            <path d="M 200 10 C 215 50 215 250 200 290 C 185 250 185 50 200 10 Z" fill={blue} />
          </g>
        );

      case 's4-primary-target':
        return (
          <g>
            <circle cx="200" cy="200" r="180" fill={fg} />
            <circle cx="200" cy="200" r="145" fill={blue} />
            <circle cx="200" cy="200" r="110" fill={yellow} />
            <circle cx="200" cy="200" r="75" fill={red} />
            <circle cx="200" cy="200" r="35" fill={bg} />
          </g>
        );

      case 's4-primary-rainbow':
        return (
          <g>
            <path d="M 40 320 A 160 160 0 0 1 360 320" fill="none" stroke={red} strokeWidth="32" strokeLinecap="round" />
            <path d="M 72 320 A 128 128 0 0 1 328 320" fill="none" stroke={yellow} strokeWidth="32" strokeLinecap="round" />
            <path d="M 104 320 A 96 96 0 0 1 296 320" fill="none" stroke={blue} strokeWidth="32" strokeLinecap="round" />
            <path d="M 136 320 A 64 64 0 0 1 264 320" fill="none" stroke={fg} strokeWidth="32" strokeLinecap="round" />
          </g>
        );

      default:
        // Default high-contrast fallback target
        return (
          <g>
            <circle cx="200" cy="200" r="160" fill={fg} />
            <circle cx="200" cy="200" r="100" fill={bg} />
            <circle cx="200" cy="200" r="40" fill={red} />
          </g>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-full max-h-full object-contain drop-shadow-sm transition-transform duration-300"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: bg }}
      >
        {renderGraphic()}
      </svg>
    </div>
  );
};
