import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ITodoTask } from "../../dto/ITodoTask";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { AppContext } from "../../context/AppContext";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { ITodoPriority } from "../../dto/ITodoPriority";
import { TableContainer } from "../../components/TableContainer";
import { ITableHeader } from '../../types/ITableHeader'

const TodoTaskIndex = () => {
    const appState = useContext(AppContext);
    const [todoTasks, setTodoTasks] = useState([] as ITodoTask[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const columns: ITableHeader[] = [
        { header: "Task Name", propertyName: "name" },
        { header: "Task Sort", propertyName: "sort" },
        { header: "Task Category", propertyName: "taskCategory" },
        { header: "Task Priority", propertyName: "taskPriority" },
    ];

    const createData = (todoTasks: ITodoTask[]): Array<{[key: string]: string}> => {
        return todoTasks.map((task) => {
            return { name: task.taskName, sort: String(task.taskSort), id: task.id!, taskCategory: task.todoCategoryName!, taskPriority: task.todoPriorityName!, isCompleted: String(task.isCompleted)};
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let todoTasksList: ITodoTask[] = [];

        const setCategoryAndPriorityNameForTask = async (task: ITodoTask): Promise<ITodoTask> => {
            let categoryResult = await BaseService.get<ITodoCategory>(
                "/TodoCategories/",
                task.todoCategoryId,
                appState.token
            );
            if (categoryResult.ok && categoryResult.data) {
                task.todoCategoryName = categoryResult.data.categoryName;
            } else {
                setPageStatus({ pageStatus: EPageStatus.Error, statusCode: categoryResult.statusCode });
            }

            let priorityResult = await BaseService.get<ITodoPriority>(
                "/TodoPriorities/",
                task.todoPriorityId,
                appState.token
            );
            if (priorityResult.ok && priorityResult.data) {
                task.todoPriorityName = priorityResult.data.priorityName;
            } else {
                setPageStatus({ pageStatus: EPageStatus.Error, statusCode: priorityResult.statusCode });
            }
            return task;
        };

        let result = await BaseService.getAll<ITodoTask>("/TodoTasks", appState.token);
        if (result.ok && result.data) {
            todoTasksList = result.data;
            setTodoTasks(await Promise.all(todoTasksList.map(async (task) => setCategoryAndPriorityNameForTask(task))));
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    };

    return (
        <>
            <Loader {...pageStatus} />
            <div className="form-group">
                <Link to="/todotasks/create/" className="btn btn-dark" role="button">
                    Create new task
                </Link>
            </div>
            <br />
            <h1>Todo Tasks</h1>
            <TableContainer data={createData(todoTasks)} columns={columns} objectBaseUrl="todotasks"/>
        </>
    );
};

export default TodoTaskIndex;
