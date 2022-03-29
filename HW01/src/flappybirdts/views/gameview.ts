export default function gameView(): HTMLDivElement {
    
    let content = document.createElement('div');
    content.id = "view-container";
    content.innerText = "CONTAINER";

    return content;
}