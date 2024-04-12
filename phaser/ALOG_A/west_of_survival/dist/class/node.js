export default class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = 1;
        this.h = 1;
        this.f = this.g+this.h;
        this.neighbors = [];
        this.previous = undefined;
        this.obstacle = false;
    }

    addNeighbors(grid) {
        let i = this.x;
        let j = this.y;
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
    }
}