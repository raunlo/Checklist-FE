import React, { useContext, useState, useEffect } from "react";
import { ITodoTask } from "../../dto/ITodoTask";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { ITodoPriority } from "../../dto/ITodoPriority";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router";

const TodoTaskCreate = () => {
    const appState = useContext(AppContext);

    const [todoCategories, setTodoCategories] = useState([] as ITodoCategory[]);
    const [todoPriorities, setTodoPriorities] = useState([] as ITodoPriority[]);
    
    const [taskData, setTaskData] = useState({ taskName: "", taskSort: "", todoCategoryId: "", todoPriorityId: "" });
    const [alertMessage, setAlertMessage] = useState("");

    const history = useHistory();

    const createClicked = async (e: Event) => {
        e.preventDefault();
        if (
            taskData.taskName === "" ||
            taskData.taskSort === "" ||
            taskData.todoCategoryId === "" ||
            taskData.todoPriorityId === ""
        ) {
            setAlertMessage("Empty fields!");
        } else {
            const objToSave: ITodoTask = {
                taskName: taskData.taskName!,
                taskSort: Number(taskData.taskSort!),
                todoCategoryId: taskData.todoCategoryId!,
                todoPriorityId: taskData.todoPriorityId!,
                isCompleted: false
            };

            let result = await BaseService.post<ITodoTask>("/TodoTasks/", objToSave, appState.token);
            if (result.ok) {
                setAlertMessage("");
                history.replace("/TodoTasks");
            } else {
                setAlertMessage("");
            }
        }
    };

    const loadData = async () => {
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
            <form onSubmit={(e) => createClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-sm-1 col-md-3"></div>
                    <div className="col-sm-10 col-md-6">
                        <h1>Create</h1>
                        <h4>Todo task</h4>
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ""} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="TaskName">Task name *</label>
                                <input
                                    value={taskData.taskName}
                                    onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
                                    className="form-control"
                                    type="text"
                                    id="TaskName"
                                    name="Input.TaskName"
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="TaskSort">Task sort *</label>
                                <input
                                    value={taskData.taskSort}
                                    onChange={(e) => setTaskData({ ...taskData, taskSort: e.target.value })}
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
                                    onChange={(e) => setTaskData({ ...taskData, todoCategoryId: e.target.value })}
                                >
                                    <option value="" selected disabled>
                                        Select category
                                    </option>
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
                                    onChange={(e) => setTaskData({ ...taskData, todoPriorityId: e.target.value })}
                                >
                                    <option value="" selected disabled >
                                        Select priority
                                    </option>
                                    {todoPriorities.map((priority) => (
                                        <option key={priority.id} value={priority.id}>
                                            {priority.priorityName}
                                        </option>
                                    ))}
                                    ;
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <button
                                    onClick={(e) => createClicked(e.nativeEvent)}
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Create
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
};

export default TodoTaskCreate;
