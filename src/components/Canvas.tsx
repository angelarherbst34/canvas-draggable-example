import '@/css/components/Canvas.css'

import { useCanvas } from '@/hooks'
import { useCanvasStore } from '@/store'
import { CanvasImage, CanvasRef, Draw } from '@/types'
import { memo, MouseEvent, useCallback, useState } from 'react'

export const Canvas = memo(function Canvas(
  props: React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > & {
    draw: Draw
    getClickedImage: (x: number, y: number) => CanvasImage | undefined
    moveImage: (
      x: number,
      y: number,
      image: CanvasImage,
      ref: CanvasRef,
    ) => void
  },
) {
  const { draw, getClickedImage, moveImage, ...rest } = props

  const { ref, setRef } = useCanvasStore()
  const setRefCallback = useCallback(setRef, [setRef])
  useCanvas(draw)

  const [startX, setStartX] = useState<number>(0)
  const [startY, setStartY] = useState<number>(0)
  const [currentImage, setCurrentImage] = useState<CanvasImage | null>(null)

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const x = Number(e.clientX)
    const y = Number(e.clientY)

    setStartX(x)
    setStartY(y)

    const image = getClickedImage(x, y)
    if (image) setCurrentImage(image)
  }
  const handleMouseUpOrOut = () => {
    if (!currentImage) return
    setCurrentImage(null)
  }
  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!currentImage) return

    const x = Number(e.clientX)
    const y = Number(e.clientY)

    const dx = x - startX
    const dy = y - startY

    if (ref) moveImage(dx, dy, currentImage, ref)
  }

  return (
    <canvas
      ref={setRefCallback}
      {...rest}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrOut}
      onMouseOut={handleMouseUpOrOut}
    />
  )
})
