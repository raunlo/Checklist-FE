import { HttpClient, IRouter, IRouteViewModel } from "aurelia";
import { ITodoCategoryType } from "../../domain/ITodoCategoryType";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class TodoCategoryDelete implements IRouteViewModel {

    private service: BaseService<ITodoCategoryType> =
        new BaseService<ITodoCategoryType>("https://taltech.akaver.com/api/v1/TodoCategories", this.httpClient, this.state.token);

    private data: ITodoCategoryType;

    constructor(
        @IRouter private router: IRouter, 
        protected httpClient: HttpClient, 
        private state: AppState) {

    }

    async attached() {
        console.log("attached");
    }

    async load(parameters) {
        let response = await this.service.get(parameters[0]); 
        
        if (response.data) {
            this.data = response.data;
        }

    }

    async deleteClicked(event: Event): Promise<void> {
        
        let objToDelete: ITodoCategoryType = { 
            id: this.data.id, 
            categoryName: this.data.categoryName,
            categorySort: this.data.categorySort
        };

        let response = await this.service.delete(objToDelete);  

        if (response.statusCode == 204) {
            await this.router.load('/todo-category-index');
        } 
    }



}