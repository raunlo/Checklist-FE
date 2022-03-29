import { IJoke } from "../domain/IJoke";
import { JokeService } from "../services/joke-service";
import { AppState } from "../state/app-state";

export class DevView {
    private data: IJoke[] = [];

    constructor(
        private jokeService: JokeService,
        private appState: AppState) {
        document.getElementById("container").style.backgroundColor = "#9eb5d1";
    }

    async attached() {
        for (let index = 0; index < this.appState.recentNewDevJokes.length; index++) {
            this.appState.addJokeToAlreadySeenJokes(this.appState.recentNewDevJokes[index], "dev");
        }
        this.appState.recentNewDevJokes = [];

        this.data = await this.jokeService.getJokesByCategory("dev"); 
        document.getElementById("loading-image").remove();
        
        this.data.forEach(element => {
            if (!this.appState.isAlreadyInList(element, "dev")) {
                this.appState.addJokeToRecentNewJokes(element, "dev");
            }
        });
    }

}
