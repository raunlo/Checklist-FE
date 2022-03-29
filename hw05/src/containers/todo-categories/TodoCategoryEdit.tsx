import React, { useContext, useEffect, useState } from "react";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";


const TodoCategoryEdit = () => {
    const {id} = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [alertMessage, setAlertMessage] = useState("");

    const history = useHistory();

    const [todoCategory, setTodoCategory] = useState({} as ITodoCategory);

    const saveClicked = async (e: Event) => {
        e.preventDefault();
        if (todoCategory.categoryName === "" || todoCategory.categorySort === 0) {
            setAlertMessage("Empty category name or category sort!");
        } else {
            const objToSave: ITodoCategory = {
                id: id,
                categoryName: todoCategory.categoryName!,
                categorySort: Number(todoCategory.categorySort!),
            };

            let result = await BaseService.put<ITodoCategory>("/TodoCategories/", id, objToSave, appState.token);
            if (result.ok) {
                setAlertMessage("");
                history.replace("/TodoCategories");
            } else {
                setAlertMessage("");
            }
        } 
    };

    const loadData = async () => {
        let result = await BaseService.get<ITodoCategory>("/TodoCategories/", id, appState.token);
        if (result.ok && result.data) {
            setTodoCategory(result.data);
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
                    <h4>Todo category</h4>
                    <h6>(ID: {id})</h6>
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ""} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="CategoryName">Category name *</label>
                                <input
                                    value={todoCategory.categoryName}
                                    onChange={(e) => setTodoCategory({ ...todoCategory, categoryName: e.target.value })}
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
                                    value={todoCategory.categorySort}
                                    onChange={(e) => setTodoCategory({ ...todoCategory, categorySort: Number(e.target.value) })}
                                    className="form-control"
                                    type="text"
                                    id="CategorySort"
                                    name="Input.CategorySort"
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
                                <Link to={"/todocategories"} className="link-secondary">Back to List</Link>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
};

export default TodoCategoryEdit;
