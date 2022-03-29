import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ITodoPriority } from "../../dto/ITodoPriority";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { AppContext } from "../../context/AppContext";
import { TableContainer } from "../../components/TableContainer";
import { ITableHeader } from '../../types/ITableHeader'

const TodoPriorityIndex = () => {
    const appState = useContext(AppContext);

    const [todoPriorities, setTodoPriorities] = useState([] as ITodoPriority[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const columns: ITableHeader[] = [
        { header: "Priority Name", propertyName: "name" },
        { header: "Priority Sort", propertyName: "sort" },
    ];

    const createData = (todoPriorities: ITodoPriority[]): Array<{[key: string]: string}> => {
        return todoPriorities.map((priority) => {
            return { name: priority.priorityName, sort: String(priority.prioritySort), id: priority.id!};
        });
    };

    const loadData = async () => {
        let result = await BaseService.getAll<ITodoPriority>("/TodoPriorities", appState.token);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setTodoPriorities(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Loader {...pageStatus} />
            <div className="form-group">
                <Link to="/todopriorities/create/" className="btn btn-dark" role="button">
                    Create new priority
                </Link>
            </div>
            <br />
            <h1>Todo Priorities</h1>
            <TableContainer data={createData(todoPriorities)} columns={columns} objectBaseUrl="todopriorities"/>
        </>
    );
};

export default TodoPriorityIndex;
