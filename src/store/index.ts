import { CanvasImage } from '@/types'
import { create } from 'zustand'

// To save to localStorage
// import { persist } from 'zustand/middleware'
// persist(() => ({}), { name: 'canvas-storage' }),

type CanvasRef = HTMLCanvasElement | null
interface CanvasStore {
  ref: CanvasRef
  setRef: (ref: CanvasRef) => void
  canvasImages: CanvasImage[]
  setCanvasImages: (canvasImages: CanvasImage[]) => void
}
export const useCanvasStore = create<CanvasStore>((set) => ({
  ref: null as CanvasRef,
  setRef: (ref: CanvasRef) => {
    set({ ref })
  },
  canvasImages: [] as CanvasImage[],
  setCanvasImages: (canvasImages: CanvasImage[]) => set({ canvasImages }),
}))
