import mainView from "./views/mainview";
import controlView from "./views/controlview";
import gameView from "./views/gameview";

import GameBrain from "./model/gamebrain";
import GameController from "./controllers/game-controller";
import StatisticsController from "./controllers/statistics-controller";
const controlViewheight = 22;
const brain = new GameBrain();
const game_view = gameView();
let gameController = new GameController(brain, game_view, controlViewheight);
let statisticsController = new StatisticsController(brain, game_view);

let view = mainView();
document.body.append(view);
let ctrl_view = controlView(gameControlClick, controlViewheight);
view.append(ctrl_view);
view.append(game_view);

function gameControlClick(e: Event) {
  switch ((e.target as HTMLButtonElement).id) {
    case "game":
      statisticsController.stop();
      gameController.run();
      break;
    case "statistics":
      gameController.stop();
      statisticsController.run();
      break;
    default:
      break;
  }
}

statisticsController.run();  

window.addEventListener("resize", () => {
  gameController.resizeUi();
});
