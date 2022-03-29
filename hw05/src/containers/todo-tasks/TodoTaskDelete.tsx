import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import React, { useContext, useEffect, useState } from "react";
import { ITodoTask } from "../../dto/ITodoTask";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { ITodoPriority } from "../../dto/ITodoPriority";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import { EPageStatus } from "../../types/EPageStatus";
import Loader from "../../components/Loader";
import { useHistory } from "react-router";

const TodoTaskDelete = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [todoTask, setTodoTask] = useState({} as ITodoTask);
    const [todoCategory, setTodoCategory] = useState({} as ITodoCategory);
    const [todoPriority, setTodoPriority] = useState({} as ITodoPriority);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const history = useHistory();

    const loadData = async () => {
        let todoCategoryId = "";
        let todoPriorityId = "";

        let taskResult = await BaseService.get<ITodoTask>("/TodoTasks/", id, appState.token);
        if (taskResult.ok && taskResult.data) {
            todoCategoryId = taskResult.data.todoCategoryId;
            todoPriorityId = taskResult.data.todoPriorityId;
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setTodoTask(taskResult.data);

            let categoryResult = await BaseService.get<ITodoCategory>(
                "/TodoCategories/",
                todoCategoryId,
                appState.token
            );
            if (categoryResult.ok && categoryResult.data) {
                setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
                setTodoCategory(categoryResult.data);
            } else {
                setPageStatus({ pageStatus: EPageStatus.Error, statusCode: categoryResult.statusCode });
            }
    
            let priorityResult = await BaseService.get<ITodoPriority>(
                "/TodoPriorities/",
                todoPriorityId,
                appState.token
            );
            if (priorityResult.ok && priorityResult.data) {
                setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
                setTodoPriority(priorityResult.data);
            } else {
                setPageStatus({ pageStatus: EPageStatus.Error, statusCode: priorityResult.statusCode });
            }

        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: taskResult.statusCode });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteClicked = async (e: Event) => {
        let result = await BaseService.delete<ITodoTask>("/TodoTasks/", id, appState.token);

        if (result.ok) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            history.replace("/TodoTasks");
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    };

    return (
        <>
            <Loader {...pageStatus} />
            <h1>Delete this todo task?</h1>

            <div>
                <h4>Details</h4>
                <hr />
                <dl className="row">
                    <dt className="col-sm-4">Id</dt>
                    <dd className="col-sm-8">{id}</dd>
                    <dt className="col-sm-4">Task Name</dt>
                    <dd className="col-sm-8">{todoTask.taskName}</dd>
                    <dt className="col-sm-4">Task Sort</dt>
                    <dd className="col-sm-8">{todoTask.taskSort}</dd>
                    <dt className="col-sm-4">Task Category</dt>
                    <dd className="col-sm-8">{todoCategory.categoryName}</dd>
                    <dt className="col-sm-4">Task Priority</dt>
                    <dd className="col-sm-8">{todoPriority.priorityName}</dd>
                    <dt className="col-sm-4">Is completed</dt>
                    <dd className="col-sm-8">{todoTask.isCompleted ? 'Yes' : 'No'}</dd>
                </dl>
            </div>

            <br />

            <div className="form-group">
                <button onClick={(e) => deleteClicked(e.nativeEvent)} type="submit" className="btn btn-danger">
                    Yes, delete
                </button>
            </div>
            <br />
            <div>
                <Link to={"/todotasks"} className="link-secondary">
                    No, back to List
                </Link>
            </div>
        </>
    );
};

export default TodoTaskDelete;
