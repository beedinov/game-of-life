// @flow
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

export type LiveStatus = 1 | 0;
export type Grid = Array<Array<LiveStatus>>;

export const generateGrid = (rows: number, cols: number): Grid =>
    Array(rows).fill(null).map(() => Array(cols).fill(0));

export const getInitialGrid = (rows: number, cols: number, cells: number = 200): Grid => {
    const initialGrid = generateGrid(rows, cols);
    const random =  (min, max) => min + Math.round(Math.random() * (max - min));

    for (let i = 0; i < cells; i++) {
        initialGrid[random(0, rows - 1)][random(0, cols - 1)] = 1;
    }
    
    return initialGrid;
};

const getLiveNeighbours = (grid: Grid, currentRow: number, currentCol: number): number => {
    let count = 0;
    
    for (let row = currentRow - 1; row <= currentRow + 1; row++) {
        for (let col = currentCol - 1; col <= currentCol + 1; col++) {
            if (col === currentCol && row === currentRow) continue;

            const isCellAlive = !!get(grid, [row, col]);
            
            if (isCellAlive) count++;
        }
    }
    
    return count;
};

const evaluate = (alive: LiveStatus, liveNeighboursCount: number, y: number, x: number): LiveStatus => {
    if (!alive && liveNeighboursCount === 3) return 1;
    if (alive && liveNeighboursCount > 3) return 0;
    if (alive && liveNeighboursCount < 2) return 0;

    return alive;
}

export const getNextGeneration = (grid: Grid): Grid => {
    const nextGrid = cloneDeep(grid);

    for (let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col++) {
            const liveNeighboursCount = getLiveNeighbours(grid, row, col);

            nextGrid[row][col] = evaluate(grid[row][col], liveNeighboursCount, row, col);
        }
    }

    return nextGrid;
};