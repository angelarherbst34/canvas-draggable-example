import { useRef } from 'react'

export function Canvas(
  props: React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  >,
) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  // Rest of canvas logic

  return <canvas ref={ref} {...props} />
}
