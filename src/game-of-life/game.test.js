import {
    getNextGeneration,
    generateGrid,
} from './game';

const rows = 10;
const cols = 10;
const newGrid = () => generateGrid(rows, cols);
let grid, resultGrid;

beforeEach(() => {
    grid = newGrid();
    resultGrid = newGrid();
});

test('generates correct rows count', ()=> {
    expect(grid.length).toBe(rows);
});

test('generates correct cols count', ()=> {
    expect(grid.every(row => row.length === cols)).toBe(true);
});

test('handles square correctly', () => {
    grid[5][5] = 1;
    grid[5][6] = 1;
    grid[6][5] = 1;
    grid[6][6] = 1;
    expect(grid).toStrictEqual(getNextGeneration(grid));
});

test('handles straight line correctly', () => {
    grid[5][5] = 1;
    grid[5][6] = 1;
    grid[5][7] = 1;
    resultGrid[4][6] = 1;
    resultGrid[5][6] = 1;
    resultGrid[6][6] = 1;
    expect(resultGrid).toStrictEqual(getNextGeneration(grid));
});

test('handles Y shape correctly', () => {
    grid[5][5] = 1;
    grid[5][7] = 1;
    grid[6][6] = 1;
    grid[6][7] = 1;
    grid[7][6] = 1;
    
    resultGrid[5][7] = 1;
    resultGrid[6][7] = 1;
    resultGrid[7][7] = 1;
    resultGrid[7][6] = 1;
    resultGrid[6][5] = 1;

    expect(resultGrid).toStrictEqual(getNextGeneration(grid));
});