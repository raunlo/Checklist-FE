export default class StatisticsController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
    }

    run(){
        this.isRunning = true;
        this.viewContainer.innerHTML = 'LEADERBOARD';
        this.viewContainer.style.fontFamily = 'Courier New, monospace';
        this.viewContainer.style.fontSize = '200%';

        this.model.scoreBoard.sort((a, b) => (a.score > b.score) ? -1 : 1)

        let labels = ['Name', 'Score'];
        this.buildTable(labels, this.model.scoreBoard, this.viewContainer);
        this.viewContainer.firstElementChild.style.border = "1px solid black";
        this.viewContainer.firstElementChild.style.backgroundColor = "#f3c489";
        this.viewContainer.firstElementChild.style.marginLeft = "auto";
        this.viewContainer.firstElementChild.style.marginRight = "auto";

        this.viewContainer.style.textAlign = "center";
        this.viewContainer.style.padding = "20m";

        document.body.style.backgroundColor = "#f0eaa1";
    }

    stop(){
        this.isRunning = false;
    }

    buildTable(labels, objects, container) {
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
          for (let k = 0; k < labels.length; k++) {
            let tbodyTd = document.createElement('td');
            tbodyTd.innerHTML = objects[j][labels[k].toLowerCase()];
            tbodyTr.appendChild(tbodyTd);
          }
          tbody.appendChild(tbodyTr);
        }
        table.appendChild(tbody);
      
        container.appendChild(table);
      }

}
 