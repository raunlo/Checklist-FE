import { IJoke} from "../domain/IJoke";

export class AppState {
    public alreadySeenDevJokes: readonly IJoke[] = [];
    public recentNewDevJokes: readonly IJoke[] = [];
    
    public alreadySeenScienceJokes: readonly IJoke[] = [];
    public recentNewScienceJokes: readonly IJoke[] = [];
    
    public alreadySeenTravelJokes: readonly IJoke[] = [];
    public recentNewTravelJokes: readonly IJoke[] = [];


    addJokeToRecentNewJokes(joke: IJoke, category: string): void {
        if (category === "dev") this.recentNewDevJokes = [...this.recentNewDevJokes, joke]; 
        if (category === "science") this.recentNewScienceJokes = [...this.recentNewScienceJokes, joke];
        if (category === "travel") this.recentNewTravelJokes = [...this.recentNewTravelJokes, joke];
    }

    addJokeToAlreadySeenJokes(joke: IJoke, category: string): void {
        if (category === "dev") this.alreadySeenDevJokes = [...this.alreadySeenDevJokes, joke];
        if (category === "science") this.alreadySeenScienceJokes = [...this.alreadySeenScienceJokes, joke];
        if (category === "travel") this.alreadySeenTravelJokes = [...this.alreadySeenTravelJokes, joke];
    }

    isAlreadyInList(joke: IJoke, category: string): boolean {
        if (category === "dev") return this.alreadySeenDevJokes.includes(joke);
        if (category === "science") return this.alreadySeenScienceJokes.includes(joke);
        if (category === "travel") return this.alreadySeenTravelJokes.includes(joke);
    }

}