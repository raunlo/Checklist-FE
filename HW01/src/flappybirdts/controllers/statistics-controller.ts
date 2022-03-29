import gameBrain, { GameScore } from "../model/gamebrain";

export default class StatisticsController {
    private viewContainer: HTMLDivElement;
    private model;  
    private isRunning = false;

    constructor(model: gameBrain, viewContainer: HTMLDivElement) {
        this.viewContainer = viewContainer;
        this.model = model;
    }

    run(){
        this.isRunning = true;
        this.viewContainer.innerHTML = 'LEADERBOARD';
        this.viewContainer.style.fontFamily = 'Courier New, monospace';
        this.viewContainer.style.fontSize = '200%';

        this.model.scoreBoard.sort((a, b) => (a.score > b.score) ? -1 : 1)

        let labels = ['Name', 'Score'];
        let table = this.buildTable(labels, this.model.scoreBoard);
        table.style.border = "1px solid black";
        table.style.backgroundColor = "#f3c489";
        table.style.marginLeft = "auto";
        table.style.marginRight = "auto";
        this.viewContainer.appendChild(table);

        this.viewContainer.style.textAlign = "center";
        this.viewContainer.style.padding = "20m";

        document.body.style.backgroundColor = "#f0eaa1";
    }

    stop(){
        this.isRunning = false;
    }

    buildTable(labels: Array<string>, objects: Array<GameScore>) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
      
        let theadTr = document.createElement('tr');
        for (let i = 0; i < labels.length; i++) {
          let theadTh = document.createElement('th');
          theadTh.innerHTML = labels[i];
          theadTr.appendChild(theadTh);
        }
        thead.appendChild(theadTr);
        table.appendChild(thead);
      
        for (let j = 0; j < objects.length; j++) {
          let tbodyTr = document.createElement('tr');

          let tbodyTdName = document.createElement('td');
          tbodyTdName.innerHTML = objects[j].name;
          tbodyTr.appendChild(tbodyTdName);

          let tbodyTdScore = document.createElement('td');
          tbodyTdScore.innerHTML = objects[j].score.toString();
          tbodyTr.appendChild(tbodyTdScore);

          tbody.appendChild(tbodyTr);
        }
        table.appendChild(tbody);
      
        return table;
      }

}
 