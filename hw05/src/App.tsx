import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

import TodoCategoryCreate from './containers/todo-categories/TodoCategoryCreate';
import TodoCategoryDelete from './containers/todo-categories/TodoCategoryDelete';
import TodoCategoryDetails from './containers/todo-categories/TodoCategoryDetails';
import TodoCategoryEdit from './containers/todo-categories/TodoCategoryEdit';
import TodoCategoryIndex from './containers/todo-categories/TodoCategoryIndex';

import TodoPriorityCreate from './containers/todo-priorities/TodoPriorityCreate';
import TodoPriorityDelete from './containers/todo-priorities/TodoPriorityDelete';
import TodoPriorityDetails from './containers/todo-priorities/TodoPriorityDetails';
import TodoPriorityEdit from './containers/todo-priorities/TodoPriorityEdit';
import TodoPriorityIndex from './containers/todo-priorities/TodoPriorityIndex';

import TodoTaskCreate from './containers/todo-tasks/TodoTaskCreate';
import TodoTaskDelete from './containers/todo-tasks/TodoTaskDelete';
import TodoTaskDetails from './containers/todo-tasks/TodoTaskDetails';
import TodoTaskEdit from './containers/todo-tasks/TodoTaskEdit';
import TodoTaskIndex from './containers/todo-tasks/TodoTaskIndex';

import HomeIndex from './containers/home/HomeIndex';
import Login from './containers/identity/Login';
import Register from './containers/identity/Register';
import Page404 from './containers/Page404';
import { AppContextProvider, initialAppState } from './context/AppContext';

function App() {
    const setAuthInfo = (token: string | null, firstName: string, lastName: string): void => {
        setAppState({...appState, token, firstName, lastName});
    }

    const [appState, setAppState] = useState({...initialAppState, setAuthInfo });

    return (
        <>
            <AppContextProvider value={appState} >
                
                <Header />
                <div className="container">
                    <main role="main" className="pb-3">
                        <Switch>
                            <Route exact path="/" component={HomeIndex} />

                            <Route path="/identity/login" component={Login} />
                            <Route path="/identity/register" component={Register} />

                            <Route path="/todocategories/create" component={TodoCategoryCreate} />
                            <Route path="/todocategories/edit/:id" component={TodoCategoryEdit} />
                            <Route path="/todocategories/delete/:id" component={TodoCategoryDelete} />
                            <Route path="/todocategories/:id" component={TodoCategoryDetails} />
                            <Route path="/todocategories" component={TodoCategoryIndex} />

                            <Route path="/todopriorities/create" component={TodoPriorityCreate} />
                            <Route path="/todopriorities/edit/:id" component={TodoPriorityEdit} />
                            <Route path="/todopriorities/delete/:id" component={TodoPriorityDelete} />
                            <Route path="/todopriorities/:id" component={TodoPriorityDetails} />
                            <Route path="/todopriorities" component={TodoPriorityIndex} />

                            <Route path="/todotasks/create" component={TodoTaskCreate} />
                            <Route path="/todotasks/edit/:id" component={TodoTaskEdit} />
                            <Route path="/todotasks/delete/:id" component={TodoTaskDelete} />
                            <Route path="/todotasks/:id" component={TodoTaskDetails} />
                            <Route path="/todotasks" component={TodoTaskIndex} />

                            <Route component={Page404} />
                        </Switch>
                    </main>
                </div>
                <Footer />
            </AppContextProvider>
        </>
    );
}

export default App;
