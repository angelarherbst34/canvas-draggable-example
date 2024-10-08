import '@/css/components/Canvas.css'

import { useCanvas, useCanvasDimensions } from '@/hooks'
import { useCanvasStore } from '@/store'
import { Draw } from '@/types'
import { memo, MouseEvent } from 'react'

export const Canvas = memo(function Canvas(
  props: React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > & { draw: Draw },
) {
  const { draw, ...rest } = props

  // Perform logic to resize and draw the canvas + images
  useCanvas(draw)

  // Click handlers to drag an image
  const {
    ref,
    setRef,
    moveCanvasImage,
    getClickedCanvasImage,
    selectedCanvasImage,
    setSelectedCanvasImage,
  } = useCanvasStore()
  const canvasDimensions = useCanvasDimensions()

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const x = Number(e.clientX)
    const y = Number(e.clientY)

    const canvasImage = getClickedCanvasImage({ x, y })
    if (canvasImage) setSelectedCanvasImage({ x, y, canvasImage })
  }
  const handleMouseUpOrOut = () => {
    if (!selectedCanvasImage) return
    setSelectedCanvasImage(null)
  }
  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!selectedCanvasImage) return

    const x = Number(e.clientX)
    const y = Number(e.clientY)
    const dx = x - selectedCanvasImage.x
    const dy = y - selectedCanvasImage.y

    if (ref)
      moveCanvasImage(
        selectedCanvasImage.canvasImage,
        { x: dx, y: dy },
        canvasDimensions,
      )
  }

  return (
    <canvas
      ref={setRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrOut}
      onMouseOut={handleMouseUpOrOut}
      {...rest}
    />
  )
})
