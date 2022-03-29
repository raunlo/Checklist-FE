import { HttpClient, IRouter } from "aurelia";
import { AccountService } from "../../services/account.service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";

export class IdentityLogin {
    
    private service: AccountService = 
    new AccountService("https://taltech.akaver.com/api/v1/Account/Login", this.httpClient);

    private email: string = "string";
    private password: string = "String2.";

   constructor (
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient
       ) {
       
   }
   
   async loginClicked(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    let response = await this.service.login(this.email, this.password);  

    if (response.statusCode == 200 && response.data ) {
        this.state.token = (response.data as IJwt).token;
        this.state.firstname = (response.data as IJwt).firstname;
        this.state.lastname = (response.data as IJwt).lastname;

        await this.router.load('/home-index');
    }

   }

}