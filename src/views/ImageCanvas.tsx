import '@/css/App.css'
import { Canvas } from '@/components/Canvas'
import { CanvasContext, CanvasImage, Draw } from '@/types'
import { useCallback, useEffect } from 'react'
import { useCanvasStore } from '@/store'

export function ImageCanvas() {
  const { canvasImages, setCanvasImages, ref } = useCanvasStore()

  const context =
    ref?.getContext('2d', {
      alpha: false,
    }) ?? null

  useEffect(() => {
    if (!context) return
    const canvas = context.canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    canvasImages.forEach((canvasImage) => {
      const { image, x, y } = canvasImage
      context.drawImage(image, x, y)
    })
  }, [canvasImages, context])

  const loadImage = useCallback((context: CanvasContext, url: string) => {
    if (!context) return

    const image = new Image()
    image.src = url

    image.onload = () => {
      const canvasImage = {
        image,
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      }
      const newCanvasImages = [...canvasImages, canvasImage]
      setCanvasImages(newCanvasImages)
    }
    image.onerror = (err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [])
  const moveImage = useCallback(
    (dx: number, dy: number, image: CanvasImage) => {
      const index = canvasImages.findIndex(
        (canvasImage) => canvasImage === image,
      )
      const newImage = { ...image, x: image.x + dx, y: image.y + dy }
      const canvasCopy = canvasImages.slice()
      canvasCopy.splice(index, 1, newImage)
      setCanvasImages(canvasCopy)
    },
    [canvasImages, setCanvasImages],
  )
  const draw: Draw = useCallback(
    (context) => {
      if (!context) return

      loadImage(context, 'src/assets/cat.png')
      loadImage(context, 'src/assets/dog.png')
    },
    [loadImage],
  )
  const getClickedImage = useCallback(
    (x: number, y: number): CanvasImage | undefined => {
      return canvasImages.find(
        (canvasImage) =>
          canvasImage.x < x &&
          canvasImage.y < y &&
          x < canvasImage.x + canvasImage.width &&
          y < canvasImage.y + canvasImage.height,
      )
    },
    [canvasImages],
  )

  return (
    <Canvas
      draw={draw}
      getClickedImage={getClickedImage}
      moveImage={moveImage}
    />
  )
}

export default ImageCanvas
