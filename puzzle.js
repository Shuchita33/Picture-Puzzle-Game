var rows = 3;
var columns = 3;

var currTile; //this variable would be reference to the tile clicked to drag 
var otherTile;// the tile to swap with 

var turns = 0; // declaring a variable named turns so it will keep track of the number of turns and we start with zero

window.onload = function() {
    //initialize the 3x3 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
           
            let tile = document.createElement("img");
            tile.src = "Assets/blank.jpg";
            
            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);// the images are append
        }
    }

    //pieces
    // The names of all images used are stored in an array
    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "9" into the array which corresponds to (puzzle images names)
    }
    
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j]; //image at ith index swapped with image at jth index
        pieces[j] = tmp;
    }
    
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
       
        tile.src = "Assets/" + pieces[i] + ".jpg";
     
        //DRAG FUNCTIONALITY

        tile.addEventListener("dragstart", dragStart); //when an image is clicked to drag
        tile.addEventListener("dragover", dragOver);   //while the image is being clicked and moves with tha mouse is drag over
        tile.addEventListener("dragenter", dragEnter); //to drag an image into another one 
        tile.addEventListener("dragleave", dragLeave); //drag an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one 
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop when drag end occurs the two images are swapped

// this occurs for every pair of images to be swapped.
        document.getElementById("pieces").append(tile); 
    }
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}