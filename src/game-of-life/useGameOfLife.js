// @flow
import { useState, useEffect } from 'react';

import { getInitialGrid, getNextGeneration } from './game';
import type { Grid } from './game';

type useGameOfLifeResult = [Grid];

export function useGameOfLife(rows: number, cols: number, timeout: number = 400, liveCells: number = 200): useGameOfLifeResult {
    const [grid, setGrid] = useState(getInitialGrid(rows, cols, liveCells));
    
    useEffect(() => {
        const timeoutId = setInterval(() => {
            setGrid(getNextGeneration);
        }, timeout);

        return () => {
            clearInterval(timeoutId);
        }
    }, [timeout]);

    return [grid];
};
