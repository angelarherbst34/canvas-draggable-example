import { CanvasImage } from '@/types'
import { create } from 'zustand'

// To save to localStorage
// import { persist } from 'zustand/middleware'
// persist(() => ({}), { name: 'canvas-storage' }),

type CanvasRef = HTMLCanvasElement | null
interface CanvasState {
  ref: CanvasRef
  canvasImages: CanvasImage[]
}
interface CanvasActions {
  setRef: (ref: CanvasRef) => void
  addCanvasImage: (canvasImage: CanvasImage) => void
  setCanvasImages: (canvasImages: CanvasImage[]) => void
  moveCanvasImage: (dx: number, dy: number, image: CanvasImage) => void
  getClickedCanvasImage: (x: number, y: number) => CanvasImage | undefined
}
export const useCanvasStore = create<CanvasState & CanvasActions>(
  (set, get) => ({
    ref: null as CanvasRef,
    setRef: (ref: CanvasRef) => {
      set({ ref })
    },
    canvasImages: [] as CanvasImage[],
    setCanvasImages: (canvasImages: CanvasImage[]) => set({ canvasImages }),
    addCanvasImage: (canvasImage: CanvasImage) =>
      set((state) => ({ canvasImages: [...state.canvasImages, canvasImage] })),
    moveCanvasImage: (dx: number, dy: number, image: CanvasImage) => {
      const canvasImagesCopy = [...get().canvasImages]
      const index = canvasImagesCopy.findIndex(
        (canvasImage) => canvasImage.image === image.image,
      )
      const newImage = { ...image, x: image.x + dx, y: image.y + dy }
      canvasImagesCopy.splice(index, 1, newImage)
      set({ canvasImages: canvasImagesCopy })
    },
    getClickedCanvasImage: (x: number, y: number) => {
      const canvasImages = get().canvasImages
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const index: number = canvasImages.findLastIndex(
        (canvasImage: CanvasImage) =>
          canvasImage.x < x &&
          canvasImage.y < y &&
          x < canvasImage.x + canvasImage.width &&
          y < canvasImage.y + canvasImage.height,
      )
      return index === -1 ? undefined : canvasImages[index]
    },
  }),
)
