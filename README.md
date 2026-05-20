# Snake — React + Vite

Implementación del clásico juego Snake usando **React** con **Vite**. Construido para el Laboratorio 6 del curso de Diseño Web, con foco en estructura limpia por componentes, manejo de estado con hooks y separación clara de responsabilidades.

## Características

- Movimiento con teclado (flechas o `W`/`A`/`S`/`D`)
- Crecimiento al comer comida
- Detección de colisiones con paredes y con la propia serpiente
- Puntaje, mejor puntaje de la sesión y nivel de dificultad
- Aumento progresivo de velocidad por nivel
- Pantalla de inicio y de Game Over con botón de reinicio
- Animaciones suaves (interpolación de segmentos, pulso de la comida)

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y ejecución

```bash
npm install
npm run dev
```

Vite expone la app en `http://localhost:5173` por defecto.

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Cómo jugar

| Acción              | Tecla                          |
| ------------------- | ------------------------------ |
| Mover arriba        | `↑` o `W`                      |
| Mover abajo         | `↓` o `S`                      |
| Mover izquierda     | `←` o `A`                      |
| Mover derecha       | `→` o `D`                      |
| Iniciar / Reiniciar | `Espacio`, `Enter` o el botón  |

- Cada comida suma **10 puntos**.
- Cada **4 comidas** sube el nivel y aumenta la velocidad.
- Chocar con un muro o contigo mismo termina el juego.

## Estructura del proyecto

```
snake-game/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # Entry point: monta <Game />
│   ├── Game.jsx              # Contenedor principal: estado + game loop
│   ├── constants.js          # Tablero, velocidades, direcciones
│   ├── components/
│   │   ├── Board.jsx         # Tablero: contiene Snake + Food
│   │   ├── Snake.jsx         # Renderiza los segmentos
│   │   ├── Food.jsx          # Renderiza la comida
│   │   ├── Score.jsx         # Puntaje, nivel y mejor puntaje
│   │   └── StartScreen.jsx   # Overlay de inicio / Game Over
│   └── styles/
│       ├── index.css         # Estilos globales
│       └── Game.css          # Estilos del juego
```

### Responsabilidades

- **`Game.jsx`** — dueño del estado (`snake`, `food`, `direction`, `status`, `score`, `best`). Implementa el game loop con `useEffect` + `setInterval` y el manejador de teclado.
- **`Board.jsx`** — recibe `snake` y `food` por **props** y los renderiza dentro de su contenedor. No tiene estado propio.
- **`Snake.jsx`** y **`Food.jsx`** — componentes de presentación puros; reciben posiciones por props.
- **`Score.jsx`** — componente puro que muestra puntaje, nivel y mejor puntaje.
- **`StartScreen.jsx`** — overlay condicional para los estados `idle` y `gameover`.

## Decisiones técnicas

- **`useState`** para el estado del juego (sin variables globales ni manipulación directa del DOM).
- **`useEffect`** para el game loop (intervalo) y para el listener de teclado.
- **`useRef`** para guardar la dirección actual y la dirección encolada — evita el _race_ donde dos teclas presionadas en el mismo tick provocarían reversa instantánea.
- La velocidad se recalcula a partir del puntaje (`level = 1 + floor(score / 40)`), y el efecto del loop se vuelve a montar solo cuando cambia la velocidad.

## Licencia

Uso académico — Laboratorio 6.
