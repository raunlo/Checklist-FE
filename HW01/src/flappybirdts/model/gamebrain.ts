export class GameScore {
  name = "";
  score = 0;
}

export const gameCellPath = 0;
export const gameCellUp = -1;
export const gameCellDown = 1;

export default class gameBrain {

  public rowCount;
  public colCount;
  public defaultPathPostision;
  PATH_WIDTH = 15;
  scoreBoard: Array<GameScore> = []; 
  board: any = [];
  public gameStartDate: number | undefined;
  public gameScore: GameScore | undefined;

  constructor(rowCount = 30, colCount = 21, defaultPathPostision = 7) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.defaultPathPostision = defaultPathPostision;
    
    this.addSomeDefaultGamescores();
    this.intializeBoard();
  }

  addSomeDefaultGamescores() {
    this.addDefaultScoreToGameScores("Carlos", 36);
    this.addDefaultScoreToGameScores("Rafael", 178);
    this.addDefaultScoreToGameScores("Luna", 1);
    this.addDefaultScoreToGameScores("Isabella Sofia", 155);
  }

  addDefaultScoreToGameScores(name: string, score: number) {
    let gameScore = new GameScore();
    gameScore.name = name;
    gameScore.score = score;
    this.scoreBoard.push(gameScore);
  }

  isBirdAlive(birdDataset: any) {
    return birdDataset.isTunnel;
  }

  startGame() {
    this.gameScore = new GameScore();
    this.gameStartDate = Date.now();
  }

  stopGame() {
    this.gameScore!.score =  Math.floor((Date.now() - this.gameStartDate!)/1000);
    this.gameStartDate = undefined;
  }

  createGameColumn(pathPosition: number, pathWidth: number) {
    const res = [];
    for (let index = 0; index < this.rowCount; index++) {
      switch (true) {
        case index < pathPosition:
          res.push(gameCellUp);
          break;
        case index >= pathPosition + pathWidth:
          res.push(gameCellDown);
          break;
        default:
          res.push(gameCellPath);
          break;
      }
    }
    return res;
  }

  intializeBoard() {
    for (let index = 0; index < this.colCount; index++) {
      this.board.push(this.createGameColumn(this.defaultPathPostision, this.PATH_WIDTH));
    }
  }

  getGameBoard() {
    return this.board;
  }

  getDefaultPathPosition() {
    return this.defaultPathPostision;
  }

  getPathWidth() {
    return this.PATH_WIDTH;
  }

  gameCellPath() {
    return gameCellPath;
  }
  gameCellUp() {
    return gameCellUp;
  }
  gameCellDown() {
    return gameCellDown;
  }

  getGameScore() {
    return this.gameScore!.score;
  }

  submitScore(playerName: string) {
    this.gameScore!.name = playerName;
    this.scoreBoard.push(this.gameScore!);
    this.cleanScore();
  }

  cleanScore() {this.gameScore = undefined;}

  generateNewColumnData(child: HTMLDivElement, pathPosition = 7) {
    if (child) {
      pathPosition = Number(child.dataset.pathPosition);
      const rand = Math.random() < 0.5;
      let pathChange = Math.random() * (this.PATH_WIDTH - 2)-5;
      pathChange = Math.ceil(Math.random() * 2 - 1.5) * pathChange;

      if (pathPosition + pathChange > 0 && pathPosition + pathChange < this.PATH_WIDTH - 7) {
        if (rand) {
            pathPosition = pathPosition + pathChange;
        } else {
            pathPosition = pathPosition - pathChange;
        }
      }
    }
    return this.createGameColumn(pathPosition, this.PATH_WIDTH);
  }

}
