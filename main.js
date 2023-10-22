//Variables
let mouseDown = false;
let color = "#000000";
let gridSize = 25;

//Selectors
const gridContainer = document.querySelector(".grid-container");
const resetButton = document.querySelector("#reset-button");
const eraserButton = document.querySelector("#eraser-button");
const gridColorInput = document.querySelector("#grid-color-input");
const gridSizeInput = document.querySelector("#grid-size-input");
const gridSizeLabel = document.querySelector("#grid-size-label")

//Event-Listeners
gridContainer.addEventListener("mousedown", () => {mouseDown = true});
// we bind mouse up to container so that when the mouse leaves and re-enters the grid 
// we can't just color by hovering.
document.addEventListener("mouseup", () => {mouseDown = false});
gridContainer.addEventListener("mousedown", changeColour);
gridContainer.addEventListener("mouseover", changeColour);
gridSizeInput.addEventListener("input", resizeGrid);
gridColorInput.addEventListener("input", e => {color = e.target.value})
eraserButton.addEventListener("click", toggleEraser);
resetButton.addEventListener("click", resetGrid);


//Functions

//Drawing, erasing, coloring
function changeColour(e){
    //Prevent drag behavior
    e.preventDefault();
    target = e.target;
    if((e.type === 'mouseover' && (!mouseDown))) return;
    target.style.backgroundColor = color;
    target.style.borderColor = color;
    if(color === "#FFFFFF"){
        target.style.border = "1px solid rgb(226, 226, 226)";
    }
    
}
function toggleEraser(){
    eraserButton.classList.toggle("eraserButton");
    if(eraserButton.classList.contains("eraserButton")){
        color = "#FFFFFF";
    }
    else{
        color = gridColorInput.value;
    }
}
//Setting up the grid
function resizeGrid(e){
    gridSize = e.target.value;
    gridSizeLabel.innerText = `${gridSize} × ${gridSize}`
}
function resetGrid(){
    gridContainer.replaceChildren();
    setUpGrid()
}
function setUpGrid(){
    gridSizeLabel.innerText = `${gridSize} × ${gridSize}`;
    if(eraserButton.classList.contains("eraserButton")){
        eraserButton.classList.toggle("eraserButton");
        color = gridColorInput.value;
    }
    for(let i=0; i<(gridSize**2); i++){
        let cell = document.createElement("div");
        gridContainer.style.setProperty("--grid-size", gridSize);
        gridContainer.appendChild(cell).classList.add("grid-item");
    }
}
setUpGrid();
