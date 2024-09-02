import { CanvasDimensions, CanvasImage, Coordinate } from '@/types'
import { isCoordWithinBounds, isImageInCanvas } from '@/utils'
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
  moveCanvasImage: (
    image: CanvasImage,
    coord: Coordinate,
    canvasDimensions: CanvasDimensions | null,
  ) => void
  getClickedCanvasImage: (coord: Coordinate) => CanvasImage | undefined
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
    moveCanvasImage: (
      image: CanvasImage,
      coord: Coordinate,
      canvasDimensions: CanvasDimensions | null,
    ) => {
      const canvasImagesCopy = [...get().canvasImages]
      const index = canvasImagesCopy.findIndex(
        (canvasImage) => canvasImage.image === image.image,
      )

      const newImage = {
        ...image,
        x: image.x + coord.x,
        y: image.y + coord.y,
      }

      // If this move will place the image outside of the canvas then don't move it
      const isInCanvas = isImageInCanvas(canvasDimensions, newImage)
      if (!isInCanvas) return

      canvasImagesCopy.splice(index, 1, newImage)
      set({ canvasImages: canvasImagesCopy })
    },
    getClickedCanvasImage: (coord: Coordinate) => {
      const canvasImages = get().canvasImages
      const index: number = canvasImages.findLastIndex(
        (canvasImage: CanvasImage) => isCoordWithinBounds(canvasImage, coord),
      )
      return index === -1 ? undefined : canvasImages[index]
    },
  }),
)
