import { CELL_SIZE } from '../constants.js'

export default function Food({ position }) {
  const style = {
    left: position.x * CELL_SIZE,
    top: position.y * CELL_SIZE,
    width: CELL_SIZE,
    height: CELL_SIZE,
  }
  return <div className="food" style={style} aria-label="comida" />
}
