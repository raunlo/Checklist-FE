import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import React, { useContext, useEffect, useState } from "react";
import { ITodoPriority } from "../../dto/ITodoPriority";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import { EPageStatus } from "../../types/EPageStatus";
import Loader from "../../components/Loader";

const TodoPriorityDetails = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [todoPriority, setTodoPriority] = useState({} as ITodoPriority);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let result = await BaseService.get<ITodoPriority>("/TodoPriorities/", id, appState.token);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setTodoPriority(result.data);
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
            <h1>Details</h1>

            <div>
                <h4>Todo priority</h4>
                <hr />
                <dl className="row">
                    <dt className="col-sm-4">Id</dt>
                    <dd className="col-sm-8">{id}</dd>
                    <dt className="col-sm-4">Priority Name</dt>
                    <dd className="col-sm-8">{todoPriority.priorityName}</dd>
                    <dt className="col-sm-4">Priority Sort</dt>
                    <dd className="col-sm-8">{todoPriority.prioritySort}</dd>
                </dl>
            </div>

            <div>
               <Link to={"/todopriorities"} className="link-secondary">Back to List</Link>
            </div>
        </>
    );
};

export default TodoPriorityDetails;
