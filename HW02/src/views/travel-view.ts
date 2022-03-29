import { IJoke } from "../domain/IJoke";
import { JokeService } from "../services/joke-service";
import { AppState } from "../state/app-state";

export class TravelView {
    private data: IJoke[] = [];

    constructor( 
        private jokeService: JokeService,
        private appState: AppState) {
        document.getElementById("container").style.backgroundColor = "#fcc38b";
    }

    async attached() {
        for (let index = 0; index < this.appState.recentNewTravelJokes.length; index++) {
            this.appState.addJokeToAlreadySeenJokes(this.appState.recentNewTravelJokes[index], "travel");
        }
        this.appState.recentNewTravelJokes = [];

        this.data = await this.jokeService.getJokesByCategory("travel"); 
        document.getElementById("loading-image").remove();
        
        this.data.forEach(element => {
            if (!this.appState.isAlreadyInList(element, "travel")) {
                this.appState.addJokeToRecentNewJokes(element, "travel");
            }
        });
    }

}
