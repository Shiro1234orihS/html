<script>
import { ref, onMounted, reactive } from 'vue';

class Cell {
    constructor() {
        this.color = null;
        this.edges = {
            t: null,
            b: null,
            l: null,
            r: null,
        };
    }

    getColor(selectedCell, renderingInfo) {
        if (this.color != null) return this.color;
        if (selectedCell.value === this) return renderingInfo.cell.selectedColor;
        return renderingInfo.cell.defaultColor;
    }

    isFull() {
        return this.edges.t.color != null &&
            this.edges.l.color != null &&
            this.edges.b.color != null &&
            this.edges.r.color != null;
    }
}

class Edge {
    constructor() {
        this.color = null;
        this.cells = [];
    }

    getColor(selectedEdge, renderingInfo) {
        if (this.color != null) return this.color;
        if (selectedEdge.value === this) return renderingInfo.edge.selectedColor;
        return renderingInfo.edge.defaultColor;
    }
}

export default {
    name: 'AllServer',
    setup() {
        const grid = ref([]);
        const gridInfo = reactive({
            w: 10,
            h: 10,
            pad: 1,
        });

        const colors = ref(['red', 'blue', 'yellow', 'green']);
        let colorIndex = 0;
        let canvas = null;
        let ctx = null;

        const selectedCell = ref(null);
        const selectedEdge = ref(null);

        let cellWidth = 0;
        let cellHeight = 0;

        function createGrid() {
            grid.value = [];
            for (let y = 0; y < gridInfo.h; y++) {
                grid.value.push([]);
                for (let x = 0; x < gridInfo.w; x++) {
                    const cell = new Cell();
                    cell.edges.t = y > 0 ? grid.value[y - 1][x].edges.b : new Edge();
                    cell.edges.l = x > 0 ? grid.value[y][x - 1].edges.r : new Edge();
                    cell.edges.b = new Edge();
                    cell.edges.r = new Edge();

                    cell.edges.t.cells.push(cell);
                    cell.edges.l.cells.push(cell);
                    cell.edges.b.cells.push(cell);
                    cell.edges.r.cells.push(cell);

                    grid.value[y].push(cell);
                }
            }
        }

        const renderingInfo = reactive({
            joint: { scale: 0.15, color: '#CCC' },
            edge: { thicknessScale: 0.05, defaultColor: '#444', selectedColor: 'white' },
            cell: { opacity: 0.5, defaultColor: 'transparent', selectedColor: 'gray' }
        });

        function renderGrid() {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            // Squares
            ctx.globalAlpha = renderingInfo.cell.opacity;
            for (let y = 0; y < gridInfo.h; y++) {
                for (let x = 0; x < gridInfo.w; x++) {
                    ctx.fillStyle = grid.value[y][x].getColor(selectedCell, renderingInfo);
                    ctx.fillRect(x_gridToCanvas(x), y_gridToCanvas(y), cellWidth, cellHeight);
                }
            }

            // Edges
            ctx.globalAlpha = 1;
            ctx.lineWidth = renderingInfo.edge.thicknessScale * cellWidth;
            for (let y = 0; y < gridInfo.h; y++) {
                for (let x = 0; x < gridInfo.w; x++) {
                    if (y === 0) drawEdge(grid.value[y][x].edges.t.getColor(selectedEdge, renderingInfo), x, y, 1, 0);
                    if (x === 0) drawEdge(grid.value[y][x].edges.l.getColor(selectedEdge, renderingInfo), x, y, 0, 1);
                    drawEdge(grid.value[y][x].edges.b.getColor(selectedEdge, renderingInfo), x, y + 1, 1, 0);
                    drawEdge(grid.value[y][x].edges.r.getColor(selectedEdge, renderingInfo), x + 1, y, 0, 1);
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

        function x_gridToCanvas(x) {
            return cellWidth * (x + 1);
        }

        function y_gridToCanvas(y) {
            return cellHeight * (y + 1);
        }

        function drawEdge(color, x, y, horizontal, vertical) {
            ctx.beginPath();
            ctx.moveTo(x_gridToCanvas(x), y_gridToCanvas(y));
            ctx.lineTo(x_gridToCanvas(x + horizontal), y_gridToCanvas(y + vertical));
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        function canvasToGrid(cx, cy) {
            const res = {
                x: cx / cellWidth - gridInfo.pad,
                y: cy / cellHeight - gridInfo.pad
            };
            res.rx = Math.floor(res.x);
            res.ry = Math.floor(res.y);
            return res;
        }

        document.addEventListener('mousemove', (e) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const cx = (e.pageX - rect.left) / rect.width * canvas.width;
            const cy = (e.pageY - rect.top) / rect.height * canvas.height;

            const { x, y, rx, ry } = canvasToGrid(cx, cy);
            let newSelectedCell = null;

            if (rx >= 0 && rx < gridInfo.w && ry >= 0 && ry < gridInfo.h) {
                newSelectedCell = grid.value[ry][rx];
            }

            if (newSelectedCell !== selectedCell.value) {
                selectedCell.value = newSelectedCell;
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

        onMounted(() => {
            canvas = document.querySelector("#renderer");
            ctx = canvas.getContext("2d");
            canvas.width = 1000;
            canvas.height = 1000;

            cellWidth = canvas.width / (gridInfo.w + gridInfo.pad * 2);
            cellHeight = canvas.height / (gridInfo.h + gridInfo.pad * 2);

            createGrid();
            renderGrid();
        });

        return {
            createGrid,
        };
    },
};
</script>

<template>
    <div>
        <p>test</p>
        <div id="container">
            <div class="layer row">
                <canvas id="renderer"></canvas>
            </div>
        </div>
    </div>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    font-family: 'Trebuchet MS';
}

.row, .column{
    display: flex;
    justify-content: center;
    align-items: center;
}

.row{flex-direction: row;}
.column{flex-direction: column;}

body, #container{
    width: 100vw;
    height: 100vh;
}

#container{
    position: relative;
    background: #223;
}

#container .layer{
    position: absolute;
    inset: 0;
}

#renderer{
    /* border: solid white 1px; */

    max-width: calc(100% - 2em);
    max-height: calc(100% - 2em);
    aspect-ratio: 1;
    flex: 1;
}
</style>
