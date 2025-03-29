import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: '#008080', // Teal for balance & growth
        accent: '#FFD700',  // Yellow for optimism & energy
        background: '#FAFAFA', // Soft white for a clean & inviting look
        text: '#333333', // Dark gray for readability
      },
    },
  },

  plugins: [
    tailwindcss(),
  ],
})