import React, { useContext, useState } from "react";
import { ITodoPriority } from "../../dto/ITodoPriority";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router";


const  TodoPriorityCreate = () => {
    const appState = useContext(AppContext);

    const [priorityData, setPriorityData] = useState({ priorityName: "", prioritySort: ""});
    const [alertMessage, setAlertMessage] = useState("");

    const history = useHistory();

    const createClicked = async (e: Event) => {
        e.preventDefault();
        if (priorityData.priorityName === "" || priorityData.prioritySort === "") {
            setAlertMessage("Empty priority name or priority sort!");
        } else {
            const objToSave: ITodoPriority = {
                priorityName: priorityData.priorityName!,
                prioritySort: Number(priorityData.prioritySort!),
            };

            let result = await BaseService.post<ITodoPriority>("/TodoPriorities/", objToSave, appState.token);
            if (result.ok) {
                setAlertMessage("");
                history.replace("/TodoPriorities");
            } else {
                setAlertMessage("");
            }
        }
        
    };

    return (
        <>
            <form onSubmit={(e) => createClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-sm-1 col-md-3"></div>
                    <div className="col-sm-10 col-md-6">
                    <h1>Create</h1>
                    <h4>Todo priority</h4>
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ""} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="PriorityName">Priority name *</label>
                                <input
                                    value={priorityData.priorityName}
                                    onChange={(e) => setPriorityData({ ...priorityData, priorityName: e.target.value })}
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
                                    value={priorityData.prioritySort}
                                    onChange={(e) => setPriorityData({ ...priorityData, prioritySort: e.target.value })}
                                    className="form-control"
                                    type="text"
                                    id="PrioritySort"
                                    name="Input.PrioritySort"
                                />
                            </div>
                            <br/>
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

export default  TodoPriorityCreate;
