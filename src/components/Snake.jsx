import { CELL_SIZE } from '../constants.js'

export default function Snake({ segments }) {
  return (
    <>
      {segments.map((seg, i) => {
        const style = {
          left: seg.x * CELL_SIZE,
          top: seg.y * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
        }
        const isHead = i === 0
        const className = 'snake-segment' + (isHead ? ' snake-segment--head' : '')
        return (
          <div key={i} className={className} style={style}>
            {isHead && <span className="snake-segment__eye" />}
          </div>
        )
      })}
    </>
  )
}
