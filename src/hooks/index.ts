import { useCanvasStore } from '@/store'
import { CanvasContext, Draw } from '@/types'
import { useEffect, useState } from 'react'

function resizeCanvas(context: CanvasContext) {
  if (!context) return
  const canvas: HTMLCanvasElement = context.canvas
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    // Use a temporary canvas to complete the size changes to avoid flicker
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

export const useCanvas = (draw: Draw) => {
  const { ref } = useCanvasStore()

  useEffect(() => {
    if (!ref) return

    const context: CanvasContext =
      ref.getContext('2d', {
        alpha: false,
      }) ?? null
    if (!context) return

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
}

export const useCanvasContext = (): CanvasContext => {
    const { ref } = useCanvasStore()
    return (ref?.getContext('2d', {
      alpha: false,
    }) ?? null) as CanvasContext
}

