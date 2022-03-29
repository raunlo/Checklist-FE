(()=>{"use strict";function e(e){e.style.backgroundColor="#e86101",e.style.border="1px solid #f0eaa1",e.style.cursor="pointer",e.style.boxShadow="0px 0px 20px 1px #f0eaa1 inset",e.style.margin="0px 0px 0px 5px",e.style.borderRadius="7px",e.style.padding="2px"}class t{constructor(){this.name="",this.score=0}}let i=new class{constructor(e=30,t=21,i=7){this.rowCount=e,this.colCount=t,this.PATH_WIDTH=15,this.scoreBoard=[],this.board=[],this.defaultPathPostision=i,this.addSomeDefaultGamescores(),this.intializeBoard(),this.gameStartDate,this.gameScore}addSomeDefaultGamescores(){this.addDefaultScoreToGameScores("Carlos",36),this.addDefaultScoreToGameScores("Rafael",178),this.addDefaultScoreToGameScores("Luna",1),this.addDefaultScoreToGameScores("Isabella Sofia",155)}addDefaultScoreToGameScores(e,i){let o=new t;o.name=e,o.score=i,this.scoreBoard.push(o)}isBirdAlive(e){return e.isTunnel}startGame(){this.gameScore=new t,this.gameStartDate=Date.now()}stopGame(){this.gameScore.score=Math.floor((Date.now()-this.gameStartDate)/1e3),this.gameStartDate=null}createGameColumn(e,t){const i=[];for(let o=0;o<this.rowCount;o++)switch(!0){case o<e:i.push(-1);break;case o>=e+t:i.push(1);break;default:i.push(0)}return i}intializeBoard(){for(let e=0;e<this.colCount;e++)this.board.push(this.createGameColumn(this.defaultPathPostision,this.PATH_WIDTH))}getGameBoard(){return this.board}getDefaultPathPosition(){return this.defaultPathPostision}getPathWidth(){return this.PATH_WIDTH}gameCellPath(){return 0}gameCellUp(){return-1}gameCellDown(){return 1}getGameScore(){return this.gameScore.score}submitScore(e){this.gameScore.name=e,this.scoreBoard.push(this.gameScore),this.cleanScore()}cleanScore(){this.gameScore=null}generateNewColumnData(e,t=7){if(e){t=Number(e.dataset.pathPosition);const i=Math.random()<.5;let o=Math.random()*(this.PATH_WIDTH-2)-5;o=Math.ceil(2*Math.random()-1.5)*o,t+o>0&&t+o<this.PATH_WIDTH-7&&(i?t+=o:t-=o)}return this.createGameColumn(t,this.PATH_WIDTH)}},o=function(){let e=document.createElement("div");return e.id="view-container",e.innerText="CONTAINER",e}(),s=new class{constructor(e,t,i){this.viewContainer=t,this.model=e,this.isRunning=!1,this.gameHeight=window.innerHeight-i,this.rowHeight=Math.floor(this.gameHeight/this.model.rowCount),this.colWidth=Math.floor(window.innerWidth/this.model.colCount),this.birdCol,this.birdRow,this.bird}run(){this.isRunning=!0,this.viewContainer.innerHTML="",this.viewContainer.append(this.getBoardHtml(this.model)),this.birdCol=Math.floor(this.model.colCount/2),this.birdRow=this.model.defaultPathPostision+Math.floor(this.model.PATH_WIDTH/2),document.addEventListener("keyup",this.handleKey.bind(this)),this.model.startGame(),this.animate(this.viewContainer.lastElementChild,this.model)}stop(){this.isRunning=!1}resizeUi(){this.isRunning&&(this.viewContainer.innerHTML="",this.gameHeight=window.innerHeight-this.viewContainer.offsetTop,this.rowHeight=Math.floor(this.gameHeight/this.model.rowCount),this.colWidth=Math.floor(window.innerWidth/this.model.colCount),this.viewContainer.append(this.getBoardHtml(this.model)))}getBoardHtml(e){let t=document.createElement("div");return t.id="gameboard",t.style.maxHeight=this.gameHeight+"px",e.getGameBoard().forEach((i=>{const o=this.generateNewColumn(i,e);o.dataset.pathPosition=this.model.getDefaultPathPosition(),t.append(o)})),t}generateNewColumn(e,t){let i=document.createElement("div");return i.style.display="inline-block",i.style.minWidth=this.colWidth+"px",i.style.maxWidth=this.colWidth+"px",i.dataset.pathPosition=this.model.getDefaultPathPosition(),e.forEach((e=>{let o=document.createElement("div");e===t.gameCellUp()?o.style.backgroundColor="#73bf2e":e===t.gameCellDown()?o.style.backgroundColor="#558022":(o.style.backgroundColor="#70c5ce",o.dataset.isTunnel=!0),o.style.minHeight=this.rowHeight+"px",o.style.maxHeight=this.rowHeight+"px",i.append(o)})),i}animate(e,t,i=!0){setTimeout((()=>{this.bird=e.childNodes[this.birdCol].childNodes[this.birdRow],this.bird.style.backgroundImage="none",(i=this.model.isBirdAlive(this.bird.dataset))||(this.birdCol--,this.model.stopGame());let o=e.firstElementChild;if(o){let s=this.generateNewColumn(this.model.generateNewColumnData(e.lastElementChild),t);if(o.remove(),e.append(s),this.bird=e.childNodes[this.birdCol].childNodes[this.birdRow],this.styleBirdElem(i),i)this.animate(e,t);else{const e=prompt("         GAME OVER!\n         Your score: "+this.model.getGameScore()+"s\nPlease enter your name: ","guest");this.model.submitScore(e)}}}),50)}styleBirdElem(e){this.bird.style.backgroundImage=e?"url('https://res.cloudinary.com/practicaldev/image/fetch/s--iMqLw9ix--/c_imagga_scale,f_auto,fl_progressive,h_420,q_66,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/d4sfv1jes6dt4s4083vq.gif')":"url('https://media0.giphy.com/media/W1eYa3FHESfTL33LJ3/giphy.gif')",this.bird.style.backgroundRepeat="no-repeat",this.bird.style.backgroundSize="contain",this.bird.style.backgroundPosition="center"}handleKey(e){if("keyup"===e.type){switch(e.key){case"ArrowDown":this.birdRow++;break;case"ArrowUp":this.birdRow--}this.bird.style.backgroundImage="none"}}}(i,o,22),n=new class{constructor(e,t){this.viewContainer=t,this.model=e,this.isRunning=!1}run(){this.isRunning=!0,this.viewContainer.innerHTML="LEADERBOARD",this.viewContainer.style.fontFamily="Courier New, monospace",this.viewContainer.style.fontSize="200%",this.model.scoreBoard.sort(((e,t)=>e.score>t.score?-1:1)),this.buildTable(["Name","Score"],this.model.scoreBoard,this.viewContainer),this.viewContainer.firstElementChild.style.border="1px solid black",this.viewContainer.firstElementChild.style.backgroundColor="#f3c489",this.viewContainer.firstElementChild.style.marginLeft="auto",this.viewContainer.firstElementChild.style.marginRight="auto",this.viewContainer.style.textAlign="center",this.viewContainer.style.padding="20m",document.body.style.backgroundColor="#f0eaa1"}stop(){this.isRunning=!1}buildTable(e,t,i){let o=document.createElement("table"),s=document.createElement("thead"),n=document.createElement("tbody"),a=document.createElement("tr");for(let t=0;t<e.length;t++){let i=document.createElement("th");i.innerHTML=e[t],a.appendChild(i)}s.appendChild(a),o.appendChild(s);for(let i=0;i<t.length;i++){let o=document.createElement("tr");for(let s=0;s<e.length;s++){let n=document.createElement("td");n.innerHTML=t[i][e[s].toLowerCase()],o.appendChild(n)}n.appendChild(o)}o.appendChild(n),i.appendChild(o)}}(i,o),a=function(){let e=document.createElement("div");return e.id="main",e}();document.body.append(a);let r=function(t,i){let o=document.createElement("div");o.id="control",o.style.maxHeight="22px",o.style.minHeight="22px";let s=document.createElement("button");s.id="statistics",s.innerText="Statistics";let n=document.createElement("button");return n.id="game",n.innerText="Play game",o.append(s),o.append(n),s.addEventListener("click",t),n.addEventListener("click",t),e(s),e(n),o}((function(e){switch(e.target.id){case"game":n.stop(),s.run();break;case"statistics":s.stop(),n.run()}}));a.append(r),a.append(o),n.run(),window.addEventListener("resize",(()=>{s.resizeUi()}))})();