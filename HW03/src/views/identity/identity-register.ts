import { HttpClient, IRouter } from "aurelia";
import { AccountService } from "../../services/account.service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";

export class IdentityRegister {
    
    private service: AccountService = 
    new AccountService("https://taltech.akaver.com/api/v1/Account/Register", this.httpClient);

    private email: string = "string";
    private password: string = "String2.";
    private firstname: string = "first";
    private lastname: string = "last";

   constructor (
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient
       ) {
   }
   

   async registerClicked(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    let response = await this.service.register(this.email, this.password, this.firstname, this.lastname);  

    if (response.statusCode == 200 && response.data ) {
        this.state.token = (response.data as IJwt).token;
        this.state.firstname = (response.data as IJwt).firstname;
        this.state.lastname = (response.data as IJwt).lastname;

        await this.router.load('/home-index');
    }

   }
}