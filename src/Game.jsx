import { useState, useEffect, useRef, useCallback } from 'react'
import Board from './components/Board.jsx'
import Score from './components/Score.jsx'
import StartScreen from './components/StartScreen.jsx'
import {
  BOARD_COLS,
  BOARD_ROWS,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  BASE_SPEED_MS,
  MIN_SPEED_MS,
  SPEED_STEP_MS,
  FOODS_PER_LEVEL,
  DIRECTIONS,
} from './constants.js'
import './styles/Game.css'

function randomFood(snake) {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`))
  const free = []
  for (let y = 0; y < BOARD_ROWS; y++) {
    for (let x = 0; x < BOARD_COLS; x++) {
      if (!occupied.has(`${x},${y}`)) free.push({ x, y })
    }
  }
  return free[Math.floor(Math.random() * free.length)]
}

export default function Game() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState(() => randomFood(INITIAL_SNAKE))
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [status, setStatus] = useState('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  const level = 1 + Math.floor(score / (10 * FOODS_PER_LEVEL))
  const speed = Math.max(MIN_SPEED_MS, BASE_SPEED_MS - (level - 1) * SPEED_STEP_MS)
  const cellsPerSecond = Math.round((1000 / speed) * 10) / 10

  const directionRef = useRef(direction)
  const queuedDirRef = useRef(null)
  const foodRef = useRef(food)
  const snakeRef = useRef(snake)

  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  useEffect(() => {
    foodRef.current = food
  }, [food])

  useEffect(() => {
    snakeRef.current = snake
  }, [snake])

  const startGame = useCallback(() => {
    const fresh = INITIAL_SNAKE.map((s) => ({ ...s }))
    const newFood = randomFood(fresh)
    setSnake(fresh)
    setFood(newFood)
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    queuedDirRef.current = null
    foodRef.current = newFood
    snakeRef.current = fresh
    setScore(0)
    setStatus('playing')
  }, [])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === ' ' || e.key === 'Enter') {
        if (status !== 'playing') {
          e.preventDefault()
          startGame()
        }
        return
      }
      const newDir = DIRECTIONS[e.key]
      if (!newDir) return
      e.preventDefault()
      const cur = queuedDirRef.current ?? directionRef.current
      if (newDir.x === -cur.x && newDir.y === -cur.y) return
      if (newDir.x === cur.x && newDir.y === cur.y) return
      queuedDirRef.current = newDir
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [status, startGame])

  useEffect(() => {
    if (status !== 'playing') return

    const tick = () => {
      if (queuedDirRef.current) {
        directionRef.current = queuedDirRef.current
        setDirection(queuedDirRef.current)
        queuedDirRef.current = null
      }
      const dir = directionRef.current
      const prev = snakeRef.current
      const head = prev[0]
      const newHead = { x: head.x + dir.x, y: head.y + dir.y }

      if (
        newHead.x < 0 ||
        newHead.x >= BOARD_COLS ||
        newHead.y < 0 ||
        newHead.y >= BOARD_ROWS
      ) {
        setStatus('gameover')
        return
      }

      const currentFood = foodRef.current
      const willGrow =
        newHead.x === currentFood.x && newHead.y === currentFood.y
      const bodyToCheck = willGrow ? prev : prev.slice(0, -1)
      for (const seg of bodyToCheck) {
        if (seg.x === newHead.x && seg.y === newHead.y) {
          setStatus('gameover')
          return
        }
      }

      const newSnake = willGrow
        ? [newHead, ...prev]
        : [newHead, ...prev.slice(0, -1)]

      snakeRef.current = newSnake
      setSnake(newSnake)

      if (willGrow) {
        setScore((s) => s + 10)
        const next = randomFood(newSnake)
        foodRef.current = next
        setFood(next)
      }
    }

    const id = setInterval(tick, speed)
    return () => clearInterval(id)
  }, [status, speed])

  useEffect(() => {
    if (status === 'gameover') {
      setBest((b) => Math.max(b, score))
    }
  }, [status, score])

  return (
    <div className="game-shell">
      <header className="masthead">
        <h1 className="masthead__title">Snake.</h1>
      </header>

      <aside className="colophon">
        N.º 001
        <span className="colophon__rule" />
        MAY 2026
        <br />
        LAB. 06
      </aside>

      <section className="stage">
        <Board
          cols={BOARD_COLS}
          rows={BOARD_ROWS}
          snake={snake}
          food={food}
          active={status === 'playing'}
        />
        {status !== 'playing' && (
          <StartScreen status={status} score={score} onStart={startGame} />
        )}
      </section>

      <div className="gutter" aria-hidden="true" />

      <aside className="side">
        <Score score={score} best={best} level={level} speed={cellsPerSecond} />
      </aside>

      <footer className="footer">
        <div className="footer__controls">
          <span className="footer__caption">teclas&nbsp;—</span>
          <span>
            <span className="key-stamp">W</span>
            <span className="key-stamp">A</span>
            <span className="key-stamp">S</span>
            <span className="key-stamp">D</span>
          </span>
          <span className="footer__caption">o flechas. espacio para comenzar.</span>
        </div>
        <div className="footer__meta">
          DAVID LÓPEZ · 24730 · UNIVERSIDAD DEL VALLE DE GUATEMALA
        </div>
      </footer>
    </div>
  )
}
