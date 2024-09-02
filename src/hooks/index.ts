import { useCanvasStore } from '@/store'
import { CanvasDimensions, Draw } from '@/types'
import { getCanvasContext, getCanvasDimentions, resizeCanvas } from '@/utils'
import { useEffect } from 'react'

export const useCanvasDimensions = (): CanvasDimensions | null => {
  const { ref } = useCanvasStore()
  const context = getCanvasContext(ref)
  if (!ref || !context) return null
  return getCanvasDimentions(context)
}

export const useCanvas = (draw: Draw) => {
  const { ref, canvasImages, selectedCanvasImage } = useCanvasStore()

  useEffect(() => {
    const context = getCanvasContext(ref)
    if (!ref || !context) return

    // Calculate size and complete the initial draw of the canvas
    const render = () => {
      resizeCanvas(context)
      draw(context)
    }
    const frameId = window.requestAnimationFrame(render)

    // Resize canvas if window size changes
    const observer = new ResizeObserver(() => {
      resizeCanvas(context)
    })
    observer.observe(ref)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [draw, ref])

  // Draw images whenever they are added or changed
  useEffect(() => {
    const context = getCanvasContext(ref)
    if (!ref || !context) return

    const canvas = context.canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    canvasImages.forEach((canvasImage) => {
      const { image, x, y, width, height } = canvasImage
      context.drawImage(image, x, y)

      if (selectedCanvasImage?.canvasImage.id === canvasImage.id) {
        context.strokeStyle = '#32CD32' // lime green
        context.lineWidth = 2
        context.strokeRect(x, y, width, height)
      }
    })
  }, [canvasImages, ref, selectedCanvasImage?.canvasImage])
}
