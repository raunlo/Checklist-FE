import React, { useContext, useState } from "react";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router";


const TodoCategoryCreate = () => {
    const appState = useContext(AppContext);

    const [categoryData, setCategoryData] = useState({ categoryName: "", categorySort: ""});
    const [alertMessage, setAlertMessage] = useState("");

    const history = useHistory();

    const createClicked = async (e: Event) => {
        e.preventDefault();
        if (categoryData.categoryName === "" || categoryData.categorySort === "") {
            setAlertMessage("Empty category name or category sort!");
        } else {
            const objToSave: ITodoCategory = {
                categoryName: categoryData.categoryName!,
                categorySort: Number(categoryData.categorySort!),
            };

            let result = await BaseService.post<ITodoCategory>("/TodoCategories/", objToSave, appState.token);
            if (result.ok) {
                setAlertMessage("");
                history.replace("/TodoCategories");
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
                    <h4>Todo category</h4>
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ""} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="CategoryName">Category name *</label>
                                <input
                                    value={categoryData.categoryName}
                                    onChange={(e) => setCategoryData({ ...categoryData, categoryName: e.target.value })}
                                    className="form-control"
                                    type="text"
                                    id="CategoryName"
                                    name="Input.CategoryName"
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="CategorySort">Category Sort *</label>
                                <input
                                    value={categoryData.categorySort}
                                    onChange={(e) => setCategoryData({ ...categoryData, categorySort: e.target.value })}
                                    className="form-control"
                                    type="text"
                                    id="CategorySort"
                                    name="Input.CategorySort"
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

export default TodoCategoryCreate;
