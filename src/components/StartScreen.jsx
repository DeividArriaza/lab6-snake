export default function StartScreen({ status, score }) {
  if (status === 'gameover') {
    return (
      <div className="cue cue--gameover" role="status" aria-live="polite">
        <div className="stamp">
          Juego terminado
          <span className="stamp__divider">·</span>
          {String(score).padStart(2, '0')} pts
        </div>
        <p className="cue__retry">
          presione espacio para jugar de nuevo.
        </p>
      </div>
    )
  }

  return (
    <div className="cue cue--idle" role="status">
      <p className="cue__text">
        <em>presione espacio para comenzar.</em>
      </p>
    </div>
  )
}
