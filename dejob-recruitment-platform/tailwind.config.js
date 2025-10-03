/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				'mono': ['Space Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
				'space': ['Space Mono', 'monospace'],
				'jetbrains': ['JetBrains Mono', 'monospace'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Base Web3 Fintech Colors
				dark: {
					'900': '#0a0a0a', // Primary dark background
					'800': '#111111',
					'700': '#1a1a1a',
					'600': '#262626',
					'500': '#333333',
					'400': '#4a4a4a',
					'300': '#666666',
					'200': '#808080',
					'100': '#999999',
				},
				// Electric Blue (Primary neon)
				electric: {
					'500': '#00d4ff', // Main electric blue
					'400': '#33ddff',
					'300': '#66e6ff',
					'200': '#99efff',
					'100': '#ccf7ff',
					'glow': '#00d4ff33', // For glow effects
				},
				// Cyber Green
				cyber: {
					'500': '#00ff88', // Main cyber green
					'400': '#33ff99',
					'300': '#66ffaa',
					'200': '#99ffbb',
					'100': '#ccffcc',
					'glow': '#00ff8833',
				},
				// Neon Purple
				neon: {
					'500': '#aa00ff', // Main neon purple
					'400': '#bb33ff',
					'300': '#cc66ff',
					'200': '#dd99ff',
					'100': '#eeccff',
					'glow': '#aa00ff33',
				},
				// Updated theme colors
				border: 'rgb(38 38 38)', // dark-600
				input: 'rgb(26 26 26)', // dark-700
				ring: 'rgb(0 212 255)', // electric-500
				background: 'rgb(10 10 10)', // dark-900
				foreground: 'rgb(255 255 255)',
				primary: {
					DEFAULT: 'rgb(0 212 255)', // electric-500
					foreground: 'rgb(10 10 10)',
				},
				secondary: {
					DEFAULT: 'rgb(170 0 255)', // neon-500
					foreground: 'rgb(255 255 255)',
				},
				accent: {
					DEFAULT: 'rgb(0 255 136)', // cyber-500
					foreground: 'rgb(10 10 10)',
				},
				destructive: {
					DEFAULT: 'rgb(239 68 68)',
					foreground: 'rgb(248 250 252)',
				},
				muted: {
					DEFAULT: 'rgb(38 38 38)', // dark-600
					foreground: 'rgb(161 161 170)',
				},
				popover: {
					DEFAULT: 'rgb(17 17 17)', // dark-800
					foreground: 'rgb(255 255 255)',
				},
				card: {
					DEFAULT: 'rgb(17 17 17)', // dark-800
					foreground: 'rgb(255 255 255)',
				},
			},
			borderRadius: {
				lg: '0.75rem', // More angular for Web3 aesthetic
				md: '0.5rem',
				sm: '0.25rem',
			},
			boxShadow: {
				// Neon glow effects
				'glow-electric': '0 0 20px rgb(0 212 255 / 0.5), 0 0 40px rgb(0 212 255 / 0.3)',
				'glow-cyber': '0 0 20px rgb(0 255 136 / 0.5), 0 0 40px rgb(0 255 136 / 0.3)',
				'glow-neon': '0 0 20px rgb(170 0 255 / 0.5), 0 0 40px rgb(170 0 255 / 0.3)',
				'inner-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.1)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
					'50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)' },
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' },
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'matrix-rain': 'matrix-rain 3s linear infinite',
				'gradient-shift': 'gradient-shift 3s ease infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'cyber-grid': 'linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)',
			},
			backgroundSize: {
				'grid-sm': '20px 20px',
				'grid-md': '40px 40px',
				'grid-lg': '60px 60px',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}