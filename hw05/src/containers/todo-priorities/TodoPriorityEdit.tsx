import React, { useContext, useEffect, useState } from "react";
import { ITodoPriority } from "../../dto/ITodoPriority";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";


const TodoPriorityEdit = () => {
    const {id} = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [alertMessage, setAlertMessage] = useState("");

    const history = useHistory();

    const [todoPriority, setTodoPriority] = useState({} as ITodoPriority);

    const saveClicked = async (e: Event) => {
        e.preventDefault();
        if (todoPriority.priorityName === "" || todoPriority.prioritySort === 0) {
            setAlertMessage("Empty priority name or priority sort!");
        } else {
            const objToSave: ITodoPriority = {
                id: id,
                priorityName: todoPriority.priorityName!,
                prioritySort: Number(todoPriority.prioritySort!),
            };

            let result = await BaseService.put<ITodoPriority>("/TodoPriorities/", id, objToSave, appState.token);
            if (result.ok) {
                setAlertMessage("");
                history.replace("/TodoPriorities");
            } else {
                setAlertMessage("");
            }
        } 
    };

    const loadData = async () => {
        let result = await BaseService.get<ITodoPriority>("/TodoPriorities/", id, appState.token);
        if (result.ok && result.data) {
            setTodoPriority(result.data);
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
                    <h4>Todo priority</h4>
                    <h6>(ID: {id})</h6>
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ""} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="PriorityName">Priority name *</label>
                                <input
                                    value={todoPriority.priorityName}
                                    onChange={(e) => setTodoPriority({ ...todoPriority, priorityName: e.target.value })}
                                    className="form-control"
                                    type="text"
                                    id="PriorityName"
                                    name="Input.PriorityName"
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="PrioritySort">Priority Sort *</label>
                                <input
                                    value={todoPriority.prioritySort}
                                    onChange={(e) => setTodoPriority({ ...todoPriority, prioritySort: Number(e.target.value) })}
                                    className="form-control"
                                    type="text"
                                    id="PrioritySort"
                                    name="Input.PrioritySort"
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <button
                                    onClick={(e) => saveClicked(e.nativeEvent)}
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Save
                                </button>
                            </div>
                            <br/>
                            <div>
                                <Link to={"/todopriorities"} className="link-secondary">Back to List</Link>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
};

export default TodoPriorityEdit;

