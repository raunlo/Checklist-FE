import { HttpClient, IRouter, IRouteViewModel } from "aurelia";
import { ITodoCategoryType } from "../../domain/ITodoCategoryType";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class TodoCategoryCreate {
   
    private service: BaseService<ITodoCategoryType> = 
    new BaseService<ITodoCategoryType>("https://taltech.akaver.com/api/v1/TodoCategories", this.httpClient, this.state.token);

    private data: ITodoCategoryType;

   constructor (
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient
       ) {
       
   }

   async saveChanges(event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    let response = await this.service.create(this.data.categoryName, this.data.categorySort);  

    if (response.statusCode == 201 && response.data ) {
        await this.router.load('/todo-category-index');
    }
    
   }
   

}


