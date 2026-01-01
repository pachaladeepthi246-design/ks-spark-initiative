import React from 'react';

interface RobotProps {
  className?: string;
  size?: number;
}

// Main Mascot Robot - Friendly waving robot
export const RobotMascot: React.FC<RobotProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`robot-bounce ${className}`}
  >
    {/* Antenna */}
    <circle cx="60" cy="12" r="6" fill="#F97316" className="pulse-glow" />
    <rect x="57" y="15" width="6" height="12" rx="3" fill="#3B82F6" />
    
    {/* Head */}
    <rect x="30" y="25" width="60" height="45" rx="12" fill="url(#headGradient)" />
    <rect x="35" y="30" width="50" height="35" rx="8" fill="#1E3A5F" opacity="0.1" />
    
    {/* Eyes */}
    <ellipse cx="45" cy="48" rx="10" ry="12" fill="white" />
    <ellipse cx="75" cy="48" rx="10" ry="12" fill="white" />
    <circle cx="47" cy="48" r="5" fill="#1E293B" />
    <circle cx="77" cy="48" r="5" fill="#1E293B" />
    <circle cx="49" cy="46" r="2" fill="white" />
    <circle cx="79" cy="46" r="2" fill="white" />
    
    {/* Blush */}
    <ellipse cx="38" cy="55" rx="5" ry="3" fill="#FDA4AF" opacity="0.6" />
    <ellipse cx="82" cy="55" rx="5" ry="3" fill="#FDA4AF" opacity="0.6" />
    
    {/* Smile */}
    <path d="M50 60 Q60 68 70 60" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
    
    {/* Body */}
    <rect x="35" y="72" width="50" height="35" rx="10" fill="url(#bodyGradient)" />
    <rect x="45" y="80" width="30" height="8" rx="4" fill="white" opacity="0.3" />
    
    {/* Heart on chest */}
    <path d="M60 88 L56 84 Q53 81 56 78 Q60 75 60 80 Q60 75 64 78 Q67 81 64 84 Z" fill="#F97316" />
    
    {/* Left Arm - Waving */}
    <g className="robot-wave">
      <rect x="12" y="75" width="20" height="12" rx="6" fill="url(#armGradient)" />
      <circle cx="10" cy="81" r="8" fill="url(#armGradient)" />
    </g>
    
    {/* Right Arm */}
    <rect x="88" y="80" width="20" height="12" rx="6" fill="url(#armGradient)" />
    <circle cx="110" cy="86" r="8" fill="url(#armGradient)" />
    
    {/* Legs */}
    <rect x="42" y="107" width="14" height="12" rx="5" fill="url(#legGradient)" />
    <rect x="64" y="107" width="14" height="12" rx="5" fill="url(#legGradient)" />
    
    <defs>
      <linearGradient id="headGradient" x1="30" y1="25" x2="90" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="bodyGradient" x1="35" y1="72" x2="85" y2="107" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
      <linearGradient id="armGradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="legGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="#1E40AF" />
        <stop offset="1" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
  </svg>
);

// Robot with Coin - For payments/billing
export const RobotCoin: React.FC<RobotProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Body */}
    <rect x="12" y="18" width="24" height="22" rx="6" fill="url(#coinRobotBody)" />
    
    {/* Head */}
    <rect x="10" y="6" width="28" height="18" rx="6" fill="url(#coinRobotHead)" />
    
    {/* Eyes */}
    <circle cx="18" cy="14" r="4" fill="white" />
    <circle cx="30" cy="14" r="4" fill="white" />
    <circle cx="19" cy="14" r="2" fill="#1E293B" />
    <circle cx="31" cy="14" r="2" fill="#1E293B" />
    
    {/* Smile */}
    <path d="M20 19 Q24 22 28 19" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    
    {/* Antenna */}
    <circle cx="24" cy="3" r="2" fill="#F97316" />
    <rect x="23" y="3" width="2" height="4" fill="#3B82F6" />
    
    {/* Coin */}
    <circle cx="38" cy="28" r="8" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
    <text x="38" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400E">$</text>
    
    {/* Arm holding coin */}
    <rect x="32" y="24" width="8" height="4" rx="2" fill="#60A5FA" />
    
    <defs>
      <linearGradient id="coinRobotHead" x1="10" y1="6" x2="38" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="coinRobotBody" x1="12" y1="18" x2="36" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

// Robot with Megaphone - For marketing
export const RobotMegaphone: React.FC<RobotProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Body */}
    <rect x="14" y="20" width="20" height="18" rx="5" fill="url(#megaRobotBody)" />
    
    {/* Head */}
    <rect x="12" y="8" width="24" height="16" rx="5" fill="url(#megaRobotHead)" />
    
    {/* Eyes */}
    <circle cx="20" cy="15" r="3" fill="white" />
    <circle cx="28" cy="15" r="3" fill="white" />
    <circle cx="21" cy="15" r="1.5" fill="#1E293B" />
    <circle cx="29" cy="15" r="1.5" fill="#1E293B" />
    
    {/* Excited expression */}
    <ellipse cx="20" cy="19" rx="2" ry="1" fill="#FDA4AF" opacity="0.5" />
    <ellipse cx="28" cy="19" rx="2" ry="1" fill="#FDA4AF" opacity="0.5" />
    
    {/* Antenna */}
    <circle cx="24" cy="5" r="2" fill="#F97316" />
    <rect x="23" y="5" width="2" height="4" fill="#3B82F6" />
    
    {/* Megaphone */}
    <path d="M36 18 L44 12 L44 26 L36 20 Z" fill="#F97316" />
    <rect x="32" y="17" width="6" height="6" rx="1" fill="#FB923C" />
    
    {/* Sound waves */}
    <path d="M45 14 Q48 19 45 24" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M46 12 Q50 19 46 26" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
    
    {/* Arm */}
    <rect x="32" y="22" width="6" height="3" rx="1.5" fill="#60A5FA" />
    
    <defs>
      <linearGradient id="megaRobotHead" x1="12" y1="8" x2="36" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="megaRobotBody" x1="14" y1="20" x2="34" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

// Robot with Chat Bubble - For support/chatbot
export const RobotChat: React.FC<RobotProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Chat bubble */}
    <path d="M28 6 L42 6 Q46 6 46 10 L46 20 Q46 24 42 24 L34 24 L30 28 L30 24 L28 24 Q24 24 24 20 L24 10 Q24 6 28 6" fill="white" stroke="#3B82F6" strokeWidth="2" />
    <circle cx="31" cy="15" r="1.5" fill="#3B82F6" />
    <circle cx="35" cy="15" r="1.5" fill="#3B82F6" />
    <circle cx="39" cy="15" r="1.5" fill="#3B82F6" />
    
    {/* Body */}
    <rect x="8" y="26" width="20" height="16" rx="5" fill="url(#chatRobotBody)" />
    
    {/* Head */}
    <rect x="6" y="14" width="24" height="16" rx="5" fill="url(#chatRobotHead)" />
    
    {/* Eyes */}
    <circle cx="14" cy="21" r="3" fill="white" />
    <circle cx="22" cy="21" r="3" fill="white" />
    <circle cx="15" cy="21" r="1.5" fill="#1E293B" />
    <circle cx="23" cy="21" r="1.5" fill="#1E293B" />
    
    {/* Happy smile */}
    <path d="M14 26 Q18 29 22 26" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    
    {/* Antenna */}
    <circle cx="18" cy="11" r="2" fill="#F97316" />
    <rect x="17" y="11" width="2" height="4" fill="#3B82F6" />
    
    <defs>
      <linearGradient id="chatRobotHead" x1="6" y1="14" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="chatRobotBody" x1="8" y1="26" x2="28" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

// Robot with Rocket - For social media/growth
export const RobotRocket: React.FC<RobotProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Rocket */}
    <path d="M38 8 Q42 12 42 20 L38 24 L34 24 L34 20 Q34 12 38 8" fill="#F97316" />
    <ellipse cx="38" cy="18" rx="2" ry="3" fill="white" opacity="0.5" />
    <path d="M34 22 L32 26 L36 24 Z" fill="#EF4444" />
    <path d="M42 22 L44 26 L40 24 Z" fill="#EF4444" />
    
    {/* Fire trail */}
    <path d="M38 24 Q36 28 38 30 Q40 28 38 24" fill="#FCD34D" />
    <path d="M38 28 Q37 31 38 33 Q39 31 38 28" fill="#F97316" opacity="0.7" />
    
    {/* Body */}
    <rect x="8" y="22" width="22" height="18" rx="5" fill="url(#rocketRobotBody)" />
    
    {/* Head */}
    <rect x="6" y="8" width="26" height="18" rx="6" fill="url(#rocketRobotHead)" />
    
    {/* Eyes - looking up at rocket */}
    <circle cx="14" cy="16" r="4" fill="white" />
    <circle cx="24" cy="16" r="4" fill="white" />
    <circle cx="15" cy="14" r="2" fill="#1E293B" />
    <circle cx="25" cy="14" r="2" fill="#1E293B" />
    
    {/* Excited open mouth */}
    <ellipse cx="19" cy="22" rx="4" ry="2" fill="#1E293B" />
    
    {/* Antenna */}
    <circle cx="19" cy="5" r="2" fill="#F97316" />
    <rect x="18" y="5" width="2" height="4" fill="#3B82F6" />
    
    <defs>
      <linearGradient id="rocketRobotHead" x1="6" y1="8" x2="32" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="rocketRobotBody" x1="8" y1="22" x2="30" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

// Robot with Pen - For content/ads generation
export const RobotPen: React.FC<RobotProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Body */}
    <rect x="12" y="20" width="22" height="18" rx="5" fill="url(#penRobotBody)" />
    
    {/* Head */}
    <rect x="10" y="6" width="26" height="18" rx="6" fill="url(#penRobotHead)" />
    
    {/* Eyes - focused look */}
    <circle cx="18" cy="14" r="4" fill="white" />
    <circle cx="28" cy="14" r="4" fill="white" />
    <circle cx="19" cy="14" r="2" fill="#1E293B" />
    <circle cx="29" cy="14" r="2" fill="#1E293B" />
    
    {/* Concentrated expression */}
    <path d="M20 20 L26 20" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Antenna */}
    <circle cx="23" cy="3" r="2" fill="#F97316" />
    <rect x="22" y="3" width="2" height="4" fill="#3B82F6" />
    
    {/* Pen */}
    <rect x="36" y="14" width="4" height="20" rx="1" fill="#F97316" transform="rotate(30 38 24)" />
    <path d="M42 34 L44 38 L40 36 Z" fill="#1E293B" transform="rotate(30 42 36)" />
    
    {/* Arm holding pen */}
    <rect x="30" y="24" width="8" height="4" rx="2" fill="#60A5FA" transform="rotate(-15 34 26)" />
    
    {/* Paper/sparkles */}
    <circle cx="44" cy="40" r="1" fill="#FCD34D" />
    <circle cx="40" cy="42" r="0.8" fill="#FCD34D" />
    <circle cx="46" cy="44" r="0.6" fill="#FCD34D" />
    
    <defs>
      <linearGradient id="penRobotHead" x1="10" y1="6" x2="36" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="penRobotBody" x1="12" y1="20" x2="34" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

// Robot with Phone - For WhatsApp
export const RobotPhone: React.FC<RobotProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Body */}
    <rect x="8" y="20" width="22" height="18" rx="5" fill="url(#phoneRobotBody)" />
    
    {/* Head */}
    <rect x="6" y="6" width="26" height="18" rx="6" fill="url(#phoneRobotHead)" />
    
    {/* Eyes */}
    <circle cx="14" cy="14" r="4" fill="white" />
    <circle cx="24" cy="14" r="4" fill="white" />
    <circle cx="15" cy="14" r="2" fill="#1E293B" />
    <circle cx="25" cy="14" r="2" fill="#1E293B" />
    
    {/* Happy smile */}
    <path d="M14 19 Q19 23 24 19" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    
    {/* Antenna */}
    <circle cx="19" cy="3" r="2" fill="#F97316" />
    <rect x="18" y="3" width="2" height="4" fill="#3B82F6" />
    
    {/* Phone */}
    <rect x="32" y="12" width="12" height="22" rx="2" fill="#25D366" />
    <rect x="34" y="14" width="8" height="16" rx="1" fill="white" />
    <circle cx="38" cy="32" r="1" fill="white" />
    
    {/* WhatsApp icon simplified */}
    <path d="M38 20 Q36 22 38 24 Q40 22 38 20" fill="#25D366" />
    
    {/* Arm holding phone */}
    <rect x="28" y="22" width="6" height="4" rx="2" fill="#60A5FA" />
    
    <defs>
      <linearGradient id="phoneRobotHead" x1="6" y1="6" x2="32" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="phoneRobotBody" x1="8" y1="20" x2="30" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

// Robot with Chart - For analytics/dashboard
export const RobotChart: React.FC<RobotProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Body */}
    <rect x="4" y="22" width="20" height="18" rx="5" fill="url(#chartRobotBody)" />
    
    {/* Head */}
    <rect x="2" y="8" width="24" height="18" rx="6" fill="url(#chartRobotHead)" />
    
    {/* Eyes */}
    <circle cx="10" cy="16" r="3" fill="white" />
    <circle cx="18" cy="16" r="3" fill="white" />
    <circle cx="11" cy="16" r="1.5" fill="#1E293B" />
    <circle cx="19" cy="16" r="1.5" fill="#1E293B" />
    
    {/* Smile */}
    <path d="M10 21 Q14 24 18 21" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    
    {/* Antenna */}
    <circle cx="14" cy="5" r="2" fill="#F97316" />
    <rect x="13" y="5" width="2" height="4" fill="#3B82F6" />
    
    {/* Chart */}
    <rect x="26" y="14" width="18" height="26" rx="2" fill="white" stroke="#E2E8F0" strokeWidth="1" />
    
    {/* Chart bars */}
    <rect x="29" y="30" width="3" height="6" rx="1" fill="#3B82F6" />
    <rect x="34" y="24" width="3" height="12" rx="1" fill="#8B5CF6" />
    <rect x="39" y="20" width="3" height="16" rx="1" fill="#F97316" />
    
    {/* Chart line */}
    <path d="M30 28 L35 22 L40 18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Arm pointing */}
    <rect x="22" y="26" width="6" height="3" rx="1.5" fill="#60A5FA" />
    
    <defs>
      <linearGradient id="chartRobotHead" x1="2" y1="8" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="chartRobotBody" x1="4" y1="22" x2="24" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

// Robot with Star - For premium/pro features
export const RobotStar: React.FC<RobotProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Star */}
    <path d="M38 6 L40 12 L46 12 L41 16 L43 22 L38 18 L33 22 L35 16 L30 12 L36 12 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
    
    {/* Body */}
    <rect x="10" y="22" width="22" height="18" rx="5" fill="url(#starRobotBody)" />
    
    {/* Head */}
    <rect x="8" y="8" width="26" height="18" rx="6" fill="url(#starRobotHead)" />
    
    {/* Eyes - looking at star */}
    <circle cx="16" cy="16" r="4" fill="white" />
    <circle cx="26" cy="16" r="4" fill="white" />
    <circle cx="18" cy="14" r="2" fill="#1E293B" />
    <circle cx="28" cy="14" r="2" fill="#1E293B" />
    
    {/* Excited open smile */}
    <ellipse cx="21" cy="22" rx="4" ry="2" fill="#1E293B" />
    
    {/* Antenna */}
    <circle cx="21" cy="5" r="2" fill="#F97316" />
    <rect x="20" y="5" width="2" height="4" fill="#3B82F6" />
    
    {/* Sparkles */}
    <circle cx="6" cy="14" r="1" fill="#FCD34D" />
    <circle cx="4" cy="20" r="0.8" fill="#FCD34D" />
    <circle cx="44" cy="28" r="1" fill="#FCD34D" />
    
    <defs>
      <linearGradient id="starRobotHead" x1="8" y1="8" x2="34" y2="26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="starRobotBody" x1="10" y1="22" x2="32" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

export default {
  RobotMascot,
  RobotCoin,
  RobotMegaphone,
  RobotChat,
  RobotRocket,
  RobotPen,
  RobotPhone,
  RobotChart,
  RobotStar,
};
