import { HttpClient } from "aurelia";
import { ITodoCategoryType } from "../../domain/ITodoCategoryType";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class TodoCategoryIndex {
    private service: BaseService<ITodoCategoryType> = 
        new BaseService<ITodoCategoryType>("https://taltech.akaver.com/api/v1/TodoCategories", this.httpClient, this.state.token);
         
    private data: ITodoCategoryType[] = [];

    constructor (protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {

        let response = await this.service.getAll();
        if (response.data) {
            this.data = response.data;
        }
    }
}