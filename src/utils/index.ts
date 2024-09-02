import { CanvasContext, CanvasRef } from '@/types'

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
