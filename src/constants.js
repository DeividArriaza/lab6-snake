export const BOARD_COLS = 20
export const BOARD_ROWS = 20
export const CELL_SIZE = 36

export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
]

export const INITIAL_DIRECTION = { x: 1, y: 0 }

export const BASE_SPEED_MS = 160
export const MIN_SPEED_MS = 60
export const SPEED_STEP_MS = 10
export const FOODS_PER_LEVEL = 4

export const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
}
