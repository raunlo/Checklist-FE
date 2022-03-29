export default class GameController {

  constructor(model, viewContainer, elementOffset) {
    this.viewContainer = viewContainer;
    this.model = model; 
    this.isRunning = false;
    this.gameHeight = window.innerHeight - elementOffset;
    this.rowHeight = Math.floor(this.gameHeight / this.model.rowCount);
    this.colWidth = Math.floor(window.innerWidth / this.model.colCount);

    this.birdCol; 
    this.birdRow;
    this.bird; 
  }

  run() {
    this.isRunning = true;
    this.viewContainer.innerHTML = "";
    this.viewContainer.append(this.getBoardHtml(this.model));

    this.birdCol = Math.floor(this.model.colCount / 2); 
    this.birdRow = this.model.defaultPathPostision + Math.floor(this.model.PATH_WIDTH / 2);
    document.addEventListener('keyup', this.handleKey.bind(this));

    this.model.startGame()
    this.animate(this.viewContainer.lastElementChild, this.model);
  }

  stop() {
    this.isRunning = false;
  }

  resizeUi() {
    if (this.isRunning) {
      this.viewContainer.innerHTML = "";
      this.gameHeight = window.innerHeight - this.viewContainer.offsetTop;
      this.rowHeight = Math.floor(this.gameHeight / this.model.rowCount);
      this.colWidth = Math.floor(window.innerWidth / this.model.colCount);
      this.viewContainer.append(this.getBoardHtml(this.model));
    }
  }

  getBoardHtml(gameBrain) {
    let content = document.createElement("div");
    content.id = "gameboard";
    content.style.maxHeight = this.gameHeight + "px";

    gameBrain.getGameBoard().forEach((rowData) => {
      const rowElem = this.generateNewColumn(rowData, gameBrain);
      rowElem.dataset.pathPosition = this.model.getDefaultPathPosition();
      content.append(rowElem);
    });

    return content;
  }

  generateNewColumn(rowData, gameBrain) {
    let rowElem = document.createElement("div");
    rowElem.style.display = "inline-block";
    rowElem.style.minWidth = this.colWidth + "px";
    rowElem.style.maxWidth = this.colWidth + "px";
    rowElem.dataset.pathPosition = this.model.getDefaultPathPosition();

    rowData.forEach((colData) => {
      let colElem = document.createElement("div");
      if (colData === gameBrain.gameCellUp()) {
        colElem.style.backgroundColor = "#73bf2e";
      } else if (colData === gameBrain.gameCellDown()) {
        colElem.style.backgroundColor = "#558022";
      } else {
        colElem.style.backgroundColor = "#70c5ce";
        colElem.dataset.isTunnel = true;
       }

      colElem.style.minHeight = this.rowHeight + "px";
      colElem.style.maxHeight = this.rowHeight + "px";
      
      rowElem.append(colElem);
    });

    return rowElem;
  }

  animate(content, gameBrain, isBirdAlive=true) {
    setTimeout(() => {
      this.bird = content.childNodes[this.birdCol].childNodes[this.birdRow];
      this.bird.style.backgroundImage = "none";
      
      isBirdAlive = this.model.isBirdAlive(this.bird.dataset);
      if (!isBirdAlive) {
          this.birdCol--;
          this.model.stopGame();
      } 
      
      let child = content.firstElementChild;

      if (child) {
        let newColumn = this.generateNewColumn(this.model.generateNewColumnData(content.lastElementChild), gameBrain);
        child.remove();
        content.append(newColumn);
  
        this.bird = content.childNodes[this.birdCol].childNodes[this.birdRow];
        this.styleBirdElem(isBirdAlive);
       
        if (isBirdAlive) {
          this.animate(content, gameBrain);
        } else {
          const playerName = prompt("         GAME OVER!\n         Your score: " + this.model.getGameScore() + "s\nPlease enter your name: ", "guest");
          this.model.submitScore(playerName);
        }
      }

    }, 50);
  }

  styleBirdElem(isBirdAlive) {
    if (isBirdAlive) {
      this.bird.style.backgroundImage = "url('https://res.cloudinary.com/practicaldev/image/fetch/s--iMqLw9ix--/c_imagga_scale,f_auto,fl_progressive,h_420,q_66,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/d4sfv1jes6dt4s4083vq.gif')";
    } else {
      this.bird.style.backgroundImage = "url('https://media0.giphy.com/media/W1eYa3FHESfTL33LJ3/giphy.gif')";
    }
    this.bird.style.backgroundRepeat = "no-repeat";
    this.bird.style.backgroundSize = "contain";
    this.bird.style.backgroundPosition = "center";
  }

  handleKey (e) {
    if (e.type !== "keyup") return;
    
    switch (e.key) {
        case "ArrowDown":
            this.birdRow++;
            break;
        case "ArrowUp":
            this.birdRow--;
            break; 

    }
    this.bird.style.backgroundImage = "none";
  }

}
