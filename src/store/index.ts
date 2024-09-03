import {
  CanvasDimensions,
  CanvasImage,
  Coordinate,
  SelectedCanvasImage,
} from '@/types'
import {
  getImageCoordsWithinCanvas,
  isCoordWithinBounds,
  isImageInCanvas,
} from '@/utils'
import { create } from 'zustand'

type CanvasRef = HTMLCanvasElement | null
interface CanvasState {
  ref: CanvasRef
  canvasImages: CanvasImage[]
  selectedCanvasImage: SelectedCanvasImage | null
}

interface CanvasActions {
  setRef: (ref: CanvasRef) => void
  setSelectedCanvasImage: (
    selectedCanvasImage: SelectedCanvasImage | null,
  ) => void
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
    selectedCanvasImage: null as SelectedCanvasImage | null,
    setSelectedCanvasImage: (selectedCanvasImage: SelectedCanvasImage | null) =>
      set({ selectedCanvasImage }),
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
        (canvasImage) => canvasImage.id === image.id,
      )

      let newImage = {
        ...image,
        x: image.x + coord.x,
        y: image.y + coord.y,
      }

      // If the image would be placed outside of the canvas with the new coordinates
      // then change them to stay within the canvas limits intead
      const isInCanvas = isImageInCanvas(canvasDimensions, newImage)
      if (!isInCanvas) {
        const imageCoordsWithinCanvas = getImageCoordsWithinCanvas(
          canvasDimensions,
          newImage,
        )
        newImage = {
          ...newImage,
          x: imageCoordsWithinCanvas.x,
          y: imageCoordsWithinCanvas.y,
        }
      }

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
