import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // or '0.0.0.0' to listen on all addresses
    port: 3000,        // change from 5173 if VPN blocks it
    strictPort: true   // fail instead of picking a random port
  }
})