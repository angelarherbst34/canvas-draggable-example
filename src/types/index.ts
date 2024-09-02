export type CanvasContext = CanvasRenderingContext2D | null
export type Draw = (ctx?: CanvasContext) => void
export interface Coordinates {
  x: number
  y: number
}
export interface SelectedCanvasImage extends Coordinates {
  canvasImage: CanvasImage
}
export interface CanvasImage extends Coordinates {
  image: HTMLImageElement
  width: number
  height: number
}

export type CanvasRef = HTMLCanvasElement | null
