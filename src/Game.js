// @flow
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';

import { useGameOfLife } from './game-of-life';
import type { LiveStatus } from './game-of-life/game';

import './Game.css';

type CellProps = {
  alive: LiveStatus,
};

type GameProps = {
  rows: number,
  cols: number,
  timeout: number,
  liveCells: number,
}

const Cell = React.memo((props: CellProps) => {
  return <div className={cn('cell', { alive: !!props.alive })} />;
});

function Game({ rows, cols, timeout, liveCells }: GameProps): Node {
  const [grid] = useGameOfLife(rows, cols, timeout, liveCells);

  return (
    <div className="grid" style={{ width: 12 * cols }}>
      {grid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}x${colIndex}x${cell}`} alive={cell} />
        ))  
      })}
    </div>
  );
}

Game.defaultProps = {
  rows: 50,
  cols: 50,
  timeout: 400,
  liveCells: 1000,
};

export default Game;
