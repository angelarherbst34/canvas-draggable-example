import {
  CanvasContext,
  CanvasDimensions,
  CanvasImage,
  CanvasRef,
  Coordinate,
} from '@/types'

export function resizeCanvas(context: CanvasContext) {
  if (!context) return
  const canvas: HTMLCanvasElement = context.canvas
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    // Use a temporary canvas to complete the size changes to avoid flickering
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const tempContext = tempCanvas.getContext('2d')

    if (tempContext) {
      tempContext.drawImage(canvas, 0, 0)
      canvas.width = width
      canvas.height = height
      context.drawImage(tempContext.canvas, 0, 0)
    }
  }
}
export const getCanvasContext = (ref: CanvasRef) => {
  return (
    ref?.getContext('2d', {
      alpha: false,
    }) ?? null
  )
}
export function isCoordWithinBounds(
  dimensions: CanvasDimensions | CanvasImage | null,
  coordinate: Coordinate,
): boolean {
  if (!dimensions) return false
  return (
    dimensions.x < coordinate.x &&
    dimensions.y < coordinate.y &&
    coordinate.x < dimensions.x + dimensions.width &&
    coordinate.y < dimensions.y + dimensions.height
  )
}
export function isImageInCanvas(
  canvasDimensions: CanvasDimensions | null,
  canvasImage: CanvasImage,
) {
  if (!canvasDimensions) return
  return (
    isCoordWithinBounds(canvasDimensions, canvasImage) &&
    isCoordWithinBounds(canvasDimensions, {
      x: canvasImage.x + canvasImage.width,
      y: canvasImage.y + canvasImage.height,
    })
  )
}
export function getCanvasDimentions(
  context: CanvasContext,
): CanvasDimensions | null {
  if (!context) return null
  return {
    x: 0,
    y: 0,
    width: context.canvas.width,
    height: context.canvas.height,
  }
}
