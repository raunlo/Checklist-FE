import { HttpClient, inject } from 'aurelia';
import { IJoke } from "../domain/IJoke";

@inject()
export class JokeService {

    constructor(private httpClient: HttpClient) {
        
    }

    async getJokesByCategory(catergory: string): Promise<IJoke[]> {
        let jokes: any = [];
        for (let index = 0; index < 15; index++) {
            const element = (await this.getOneJokeFromGivenCategory(catergory))[0];
            if (!jokes.includes(element) && jokes.length < 5) {
                jokes.push(element);
            }
        }
        return jokes;
    }

    getOneJokeFromGivenCategory(catergory: string): Promise<IJoke[]> {
        return this.httpClient
        .get("https://api.chucknorris.io/jokes/random?category=" + catergory, {cache: "no-store"})
        .then(response => {
            return response.json();
        })
        .then(data => {
            return [(data["value"]) as IJoke];
        })
        .catch(error => []);
    }

}