import Snake from './Snake.jsx'
import Food from './Food.jsx'
import { CELL_SIZE } from '../constants.js'

export default function Board({ cols, rows, snake, food, active }) {
  const style = {
    width: cols * CELL_SIZE,
    height: rows * CELL_SIZE,
    '--cell-size': `${CELL_SIZE}px`,
    '--cols': cols,
    '--rows': rows,
  }

  return (
    <div className="board" style={style}>
      {active && <Food position={food} />}
      {active && <Snake segments={snake} />}
    </div>
  )
}
