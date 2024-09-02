# Canvas Draggable Example

How long did it take you to complete this assignment?
- About a day, including the time I spent reading documentation

What about this assignment did you find most challenging?
- Structuring the canvas file structure and the logic flow

What about this assignment did you find unclear?
- The resolution, keeping 16:9 but taking up all available space. If I stretch it then it would no longer keep the image ratio or canvas ratio, so I decided to crop.
- Supported screen sizes are not listed, which would be helpful to know for the smallest supported (do the images need to be scaled down or a minimum size specified?)

Do you feel like this assignment has an appropriate level of difficulty?
- Yes

Briefly explain the technical decisions you made in this project, i.e. architecture, code-splitting, libraries, or other decisions and tradeoffs.
- I selected zustand for state management and for potential future state persistence. It has great support, adoption, minimal overhead, and is faster than competitors such as Redux. It is very similar to pinia for those who also use Vue.
- I selected uuid to add ids to Images, as I needed a key to easily compare images. It is a tried and true library, and unique enough until they are stored in a backend.
- I separated out my files into modular folders (components, views, store, hooks) to prepare for feature expansion. The current logic is mostly in the default file (index.ts), however it would be moved to a named file and exported from index if more features were developed.
- I componentized the canvas, its parent, extracted the image controller into zustand and the canvas controller into a custom hook. I did this to maintain separation of concerns, and more easily refactor should additional requirements or canvases be needed.
  - ImageCanvas: Loads the images and would handle any file upload/removal.
  - Canvas: Calls the canvas controller and handles its own image events, but this could be moved to the Image parent if we needed multiple canvases or different functionality.
  - useCanvasStore: Handles the canvas ref and all image storage/modification. In case of refactor the image logic could be moved to another store.
  - useCanvas hook: Handles all canvas draw and resize logic. The image draw could be moved to another hook and then called in the Image parent if additional functionality in the canvas is needed.
