function pad2(n) {
  return String(n).padStart(2, '0')
}

function formatSpeed(s) {
  const [int, dec = '0'] = s.toFixed(1).split('.')
  return int.padStart(2, '0') + '.' + dec
}

export default function Score({ score, best, level, speed }) {
  return (
    <>
      <div className="score-block score-block--primary">
        <span className="score-block__label">puntaje</span>
        <span className="score-block__value">
          <span key={score} className="score-block__digit">
            {pad2(score)}
          </span>
        </span>
      </div>
      <div className="score-block">
        <span className="score-block__label">nivel</span>
        <span className="score-block__value">
          <span key={level} className="score-block__digit">
            {pad2(level)}
          </span>
        </span>
      </div>
      <div className="score-block">
        <span className="score-block__label">velocidad</span>
        <span className="score-block__value">
          <span key={speed} className="score-block__digit">
            {formatSpeed(speed)}
          </span>
        </span>
        <span className="score-block__unit">celdas / segundo</span>
      </div>
      <div className="score-block">
        <span className="score-block__label">mejor</span>
        <span className="score-block__value">
          <span key={best} className="score-block__digit">
            {pad2(best)}
          </span>
        </span>
      </div>
    </>
  )
}
