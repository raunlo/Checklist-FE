import { IJoke } from "../domain/IJoke";
import { JokeService } from "../services/joke-service";
import { AppState } from "../state/app-state";

export class ScienceView {
    private data: IJoke[] = [];

    constructor(
        private jokeService: JokeService,
        private appState: AppState) {
        document.getElementById("container").style.backgroundColor = "#b0adb0";
    }

    async attached() {
        for (let index = 0; index < this.appState.recentNewScienceJokes.length; index++) {
            this.appState.addJokeToAlreadySeenJokes(this.appState.recentNewScienceJokes[index], "science");
        }
        this.appState.recentNewScienceJokes = [];

        this.data = await this.jokeService.getJokesByCategory("science"); 
        document.getElementById("loading-image").remove();
        
        this.data.forEach(element => {
            if (!this.appState.isAlreadyInList(element, "science")) {
                this.appState.addJokeToRecentNewJokes(element, "science");
            }
        });
    }

}
