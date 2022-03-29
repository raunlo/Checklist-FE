import { createStore } from 'vuex'
import axios from 'axios'

export interface IState {
    token: string | null;
    firstname: string;
    lastname: string;
}

export const initialState: IState = {
    token: null,
    firstname: '',
    lastname: '',
}

export interface IJwtResponse {
    token: string;
    firstName: string;
    lastName: string;
}

export interface ILoginInfo {
    email: string;
    password: string;
}

export interface IRegisterInfo {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export default createStore({
    state: initialState,
    mutations: {
        logOut: (state: IState) => {
            state.token = null;
            state.firstname = '';
            state.lastname = '';
        },
        logIn: (state: IState, jwtResponse: IJwtResponse) => {
            state.token = jwtResponse.token;
            state.firstname = jwtResponse.firstName;
            state.lastname = jwtResponse.lastName;
        },
    },
    actions: {
        async logIn(context, login: ILoginInfo): Promise<void> {
            const loginDataStr = JSON.stringify(login);
            const response = await axios.post(
                'https://taltech.akaver.com/api/v1/Account/Login',
                loginDataStr,
                { headers: { 'Content-type': 'application/json' } }
            );
            if (response.status === 200) {
                context.commit('logIn', response.data);
            }
        },
        async register(context, register: IRegisterInfo): Promise<void> {
            const registerDataStr = JSON.stringify(register);
            const response = await axios.post(
                'https://taltech.akaver.com/api/v1/Account/Register',
                registerDataStr,
                { headers: { 'Content-type': 'application/json' } }
            );
            if (response.status === 200) {
                context.commit('logIn', response.data);
            }
        }
    },
    getters: {
    },
    modules: {
    }
})
