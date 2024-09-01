import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// For state persistence, uses localStorage
export const canvasStore = create(
  persist(() => ({}), { name: 'canvas-storage' }),
)
