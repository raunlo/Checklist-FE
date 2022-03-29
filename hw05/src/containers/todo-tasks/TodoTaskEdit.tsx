import React, { useContext, useEffect, useState } from "react";
import { ITodoTask } from "../../dto/ITodoTask";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { ITodoPriority } from "../../dto/ITodoPriority";

const TodoTaskEdit = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [alertMessage, setAlertMessage] = useState("");

    const history = useHistory();

    const [todoTask, setTodoTask] = useState({} as ITodoTask);
    const [todoCategories, setTodoCategories] = useState([] as ITodoCategory[]);
    const [todoPriorities, setTodoPriorities] = useState([] as ITodoPriority[]);

    const saveClicked = async (e: Event) => {
        e.preventDefault();
        if (
            todoTask.taskName === "" ||
            todoTask.taskSort === 0 ||
            todoTask.todoCategoryId === "" ||
            todoTask.todoPriorityId === ""
        ) {
            setAlertMessage("Empty fields!");
        } else {
            const objToSave: ITodoTask = {
                id: id,
                taskName: todoTask.taskName!,
                taskSort: Number(todoTask.taskSort!),
                todoCategoryId: todoTask.todoCategoryId!,
                todoPriorityId: todoTask.todoPriorityId!,
                isCompleted: todoTask.isCompleted!,
            };

            let result = await BaseService.put<ITodoTask>("/TodoTasks/", id, objToSave, appState.token);
            if (result.ok) {
                setAlertMessage("");
                history.replace("/TodoTasks");
            } else {
                setAlertMessage("");
            }
        }
    };

    const loadData = async () => {
        let result = await BaseService.get<ITodoTask>("/TodoTasks/", id, appState.token);
        if (result.ok && result.data) {
            setTodoTask(result.data);
        }

        let categoryResult = await BaseService.getAll<ITodoCategory>("/TodoCategories", appState.token);
        if (categoryResult.ok && categoryResult.data) {
            setTodoCategories(categoryResult.data);
        }

        let priorityResult = await BaseService.getAll<ITodoPriority>("/TodoPriorities", appState.token);
        if (priorityResult.ok && priorityResult.data) {
            setTodoPriorities(priorityResult.data);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <form onSubmit={(e) => saveClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-sm-1 col-md-3"></div>
                    <div className="col-sm-10 col-md-6">
                        <h1>Edit</h1>
                        <h4>Todo task</h4>
                        <h6>(ID: {id})</h6>
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ""} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="TaskName">Task name *</label>
                                <input
                                    value={todoTask.taskName}
                                    onChange={(e) => setTodoTask({ ...todoTask, taskName: e.target.value })}
                                    className="form-control"
                                    type="text"
                                    id="TaskName"
                                    name="Input.TaskName"
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="TaskSort">Task Sort *</label>
                                <input
                                    value={todoTask.taskSort}
                                    onChange={(e) => setTodoTask({ ...todoTask, taskSort: Number(e.target.value) })}
                                    className="form-control"
                                    type="text"
                                    id="TaskSort"
                                    name="Input.TaskSort"
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="TaskCategory">Task category *</label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setTodoTask({ ...todoTask, todoCategoryId: e.target.value })}
                                    value={todoTask.todoCategoryId}
                                >
                                    {todoCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                    ;
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="TaskPriority">Task priority *</label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setTodoTask({ ...todoTask, todoPriorityId: e.target.value })}
                                    value={todoTask.todoPriorityId}
                                >
                                    {todoPriorities.map((priority) => (
                                        <option key={priority.id} value={priority.id}>
                                            {priority.priorityName}
                                        </option>
                                    ))}
                                    ;
                                </select>
                            </div>
                            <br />
                            <div className="form-group form-check">
                                <label className="form-check-label" htmlFor="formInputCheckBox">
                                    Is completed? 
                                </label>
                                <input
                                    checked={todoTask.isCompleted}
                                    onChange={(e) => setTodoTask({ ...todoTask, isCompleted: e.target.checked }) }
                                    type="checkbox"
                                    className="form-check-input"
                                    id="formInputCheckBox"
                                />
                            </div>

                            <br />
                            <div className="form-group">
                                <button
                                    onClick={(e) => saveClicked(e.nativeEvent)}
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Save
                                </button>
                            </div>
                            <br />
                            <div>
                                <Link to={"/todotasks"} className="link-secondary">
                                    Back to List
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
};

export default TodoTaskEdit;
