<script setup>
    class Cell{
    constructor(){
        this.color = null;
        this.edges = {
            t: null,
            b: null,
            l: null,
            r: null,
        };
    }

    getColor(){
        if(this.color != null) return this.color;
        if(selectedCell === this) return renderingInfo.cell.selectedColor;
        return renderingInfo.cell.defaultColor;
    }

    isFull(){
        return this.edges.t.color != null
            && this.edges.l.color != null
            && this.edges.b.color != null
            && this.edges.r.color != null;
    }
}

class Edge{
    constructor(){
        this.color = null;
        this.cells = [];
    }

    getColor(){
        if(this.color != null) return this.color;
        if(selectedEdge === this) return renderingInfo.edge.selectedColor;
        return renderingInfo.edge.defaultColor;
    }
}

const colors = ['red', 'blue', 'yellow', 'green'];
let colorIndex = 0;

const gridInfo = {
    w: 10,
    h: 10,
    pad: 1,
};

var grid = [];

function createGrid(){
    grid = [];
    for(let y = 0; y < gridInfo.h; y++){
        grid.push([]);
        for(let x = 0; x < gridInfo.w; x++){
            let cell = new Cell();
            cell.edges.t = y>0 ? grid[y-1][x].edges.b : new Edge();
            cell.edges.l = x>0 ? grid[y][x-1].edges.r : new Edge();
            cell.edges.b = new Edge();
            cell.edges.r = new Edge();

            cell.edges.t.cells.push(cell);
            cell.edges.l.cells.push(cell);
            cell.edges.b.cells.push(cell);
            cell.edges.r.cells.push(cell);

            grid[y].push(cell);
        }
    }
}
//#endregion

//#region UI
const canvas = document.querySelector("#renderer");
const ctx = canvas.getContext("2d");
// const ctx:CanvasRenderingContext2D = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 1000;

const cellWidth = canvas.width/(gridInfo.w + gridInfo.pad*2);
const cellHeight = canvas.height/(gridInfo.h + gridInfo.pad*2);

const renderingInfo = {
    joint: {
        scale: 0.15,
        color: '#CCC',
    },
    edge: {
        thicknessScale: 0.05,
        defaultColor: '#444',
        selectedColor: 'white',
    },
    cell:{
        opacity: 0.5,
        defaultColor: 'transparent',
        selectedColor: 'gray'
    },
};

function x_gridToCanvas(x){
    return cellWidth * (x+1);
}

function y_gridToCanvas(y){
    return cellHeight * (y+1);
}

function renderGrid(){
    let w = canvas.width;
    let h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Squares
    ctx.globalAlpha = renderingInfo.cell.opacity;
    for(let y = 0; y < gridInfo.h; y++){
        for(let x = 0; x < gridInfo.w; x++){
            ctx.fillStyle = grid[y][x].getColor();
            ctx.fillRect(x_gridToCanvas(x), y_gridToCanvas(y), cellWidth, cellHeight);
        }
    }

    // Edges
    ctx.globalAlpha = 1;
    ctx.lineWidth = renderingInfo.edge.thicknessScale * cellWidth;
    function drawEdge(color, x, y, horizontal, vertical){
        ctx.beginPath();

        ctx.moveTo(x_gridToCanvas(x), y_gridToCanvas(y));
        ctx.lineTo(x_gridToCanvas(x + horizontal), y_gridToCanvas(y + vertical));

        ctx.strokeStyle = color;
        ctx.stroke();
    }

    for(let y = 0; y < gridInfo.h; y++){
        for(let x = 0; x < gridInfo.w; x++){
            if(y==0) drawEdge(grid[y][x].edges.t.getColor(), x, y, 1, 0);
            if(x==0) drawEdge(grid[y][x].edges.l.getColor(), x, y, 0, 1);
            drawEdge(grid[y][x].edges.b.getColor(), x, y+1, 1, 0);
            drawEdge(grid[y][x].edges.r.getColor(), x+1, y, 0, 1);
        }
    }

    // Points
    let jointSize = cellWidth * renderingInfo.joint.scale;
    ctx.fillStyle = renderingInfo.joint.color;
    for(let y = 0; y < gridInfo.h + 1; y++){
        for(let x = 0; x < gridInfo.w + 1; x++){
            ctx.beginPath();
            ctx.arc(cellWidth * (x+1), cellHeight * (y+1), jointSize/2, 0, 360);
            ctx.fill();
        }
    }
}

let selectedCell = null;
let selectedEdge = null;

function canvasToGrid(cx, cy){
    res = {
        x: cx / cellWidth - gridInfo.pad,
        y: cy / cellHeight - gridInfo.pad
    };

    res.rx = Math.floor(res.x);
    res.ry = Math.floor(res.y);
    return res;
}

document.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    let cx = (e.pageX - rect.left) / rect.width * canvas.width;
    let cy = (e.pageY - rect.top) / rect.height * canvas.height;

    let {x,y,rx,ry} = canvasToGrid(cx, cy);

    let newSelectedCell = null;
    let newSelectedEdge = null;
    if(rx>=0 && rx<gridInfo.w && ry>=0 && ry<gridInfo.h){
        newSelectedCell = grid[ry][rx];
        x = x%1 - 0.5;
        y = y%1 - 0.5;

        let radius = Math.sqrt(x*x + y*y);
        let theta = Math.acos(x / radius) * 180 / Math.PI;

        if(theta <= 45) newSelectedEdge = newSelectedCell.edges.r;
        else if(theta >= 135) newSelectedEdge = newSelectedCell.edges.l;
        else if(y < 0) newSelectedEdge = newSelectedCell.edges.t;
        else newSelectedEdge = newSelectedCell.edges.b;
    }

    // Lazy render
    if(newSelectedCell !== selectedCell || newSelectedEdge !== selectedEdge) {
        selectedCell = newSelectedCell;
        selectedEdge = newSelectedEdge;
        renderGrid();
    }
});

document.addEventListener('click', (e) => {
    if(!selectedEdge) return;
    if(selectedEdge.color != null) return;

    let color = colors[colorIndex%colors.length];
    selectedEdge.color = color;

    let coloredCells = 0;
    selectedEdge.cells.forEach(cell => {
        if(cell.isFull()){
            cell.color = color;
            coloredCells++;
        }
    });

    if(coloredCells == 0) colorIndex++;
    renderGrid();
})
//#endregion

createGrid();
renderGrid();
</script>

<template>
    <div id="container">
        <div class="layer row">
            <canvas id="renderer"></canvas>
        </div>
    </div>
</template>

<style scoped>
</style>
