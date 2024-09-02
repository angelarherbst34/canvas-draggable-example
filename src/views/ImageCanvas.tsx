import '@/css/App.css'
import { Canvas } from '@/components/Canvas'
import { CanvasContext, CanvasImage, Draw } from '@/types'
import { useCallback } from 'react'
import { useCanvasStore } from '@/store'

export function ImageCanvas() {
  const { addCanvasImage } = useCanvasStore()

  // Uses useCallback as these methods are a dependency of a useEffect
  // Without it they will continuously be called
  const loadImage = useCallback(
    (context: CanvasContext, url: string, x: number, y: number) => {
      if (!context) return

      const image = new Image()
      image.src = url

      image.onload = () => {
        const canvasImage: CanvasImage = {
          image,
          x,
          y,
          width: image.width,
          height: image.height,
        }
        addCanvasImage(canvasImage)
      }
      image.onerror = (err) => {
        console.error(err) // eslint-disable-line no-console
      }
    },
    [addCanvasImage],
  )
  const draw: Draw = useCallback(
    (context) => {
      if (!context) return

      loadImage(context, 'src/assets/cat.png', 0, 0)
      loadImage(context, 'src/assets/dog.png', 200, 300)
    },
    [loadImage],
  )

  return <Canvas draw={draw} />
}

export default ImageCanvas
