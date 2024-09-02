export type CanvasContext = CanvasRenderingContext2D | null
export type Draw = (ctx?: CanvasContext) => void
export interface CanvasImage {
  image: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
}
export type CanvasRef = HTMLCanvasElement | null
