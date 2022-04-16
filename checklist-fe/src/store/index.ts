import { createStore } from 'vuex'

export interface IState {
    apiKey: string;
}

export const initialState: IState = {
    apiKey: '801cd192-025f-495e-8c32-1316ba780c0e'
}

export default createStore({
    state: initialState,
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
