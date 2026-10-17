export const GRID_SIZE = 20;

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export function getInitialState() {
  const snake = [{ x: 10, y: 10 }];
  return {
    snake,
    direction: DIRECTIONS.RIGHT,
    food: randomFood(snake),
    score: 0,
    gameOver: false,
  };
}

export function randomFood(snake) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
  return food;
}

export function move(state) {
  if (state.gameOver) return state;

  const head = state.snake[0];
  const newHead = {
    x: head.x + state.direction.x,
    y: head.y + state.direction.y,
  };

  // Wall collision
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= GRID_SIZE ||
    newHead.y >= GRID_SIZE
  ) {
    return { ...state, gameOver: true };
  }

  // Self collision
  if (state.snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
    return { ...state, gameOver: true };
  }

  let newSnake = [newHead, ...state.snake];

  // Eat food
  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    return {
      ...state,
      snake: newSnake,
      food: randomFood(newSnake),
      score: state.score + 1,
    };
  }

  newSnake.pop();

  return { ...state, snake: newSnake };
}

export function changeDirection(current, next) {
  // Prevent reverse
  if (
    (current.x === 1 && next.x === -1) ||
    (current.x === -1 && next.x === 1) ||
    (current.y === 1 && next.y === -1) ||
    (current.y === -1 && next.y === 1)
  ) {
    return current;
  }
  return next;
}