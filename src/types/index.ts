export type CanvasRef = HTMLCanvasElement | null
export type CanvasContext = CanvasRenderingContext2D | null
export type Draw = (ctx?: CanvasContext) => void
export interface Coordinate {
  x: number
  y: number
}
export interface SelectedCanvasImage extends Coordinate {
  canvasImage: CanvasImage
}
export interface CanvasDimensions extends Coordinate {
  width: number
  height: number
}
export interface CanvasImage extends CanvasDimensions {
  image: HTMLImageElement
}
