export default function mainView(eventHandler: (e: Event) => void, elementHeight: Number) {

    let control = document.createElement('div');
    control.id = "control";
    control.style.maxHeight = elementHeight + "px"; 
    control.style.minHeight = elementHeight + "px"; 

    let statisticsButton = document.createElement('button');
    statisticsButton.id = "statistics";
    statisticsButton.innerText="Statistics";

    let gameButton = document.createElement('button');
    gameButton.id = "game";
    gameButton.innerText="Play game"

    control.append(statisticsButton);
    control.append(gameButton);

    statisticsButton.addEventListener('click', eventHandler);
    gameButton.addEventListener('click', eventHandler);

    styleButton(statisticsButton);
    styleButton(gameButton);

    return control;
}

function styleButton(button: HTMLButtonElement) {
    button.style.backgroundColor = "#e86101";
    button.style.border = "1px solid #f0eaa1";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0px 0px 20px 1px #f0eaa1 inset";
    button.style.margin = "0px 0px 0px 5px";
    button.style.borderRadius = "7px"
    button.style.padding = "2px";
}