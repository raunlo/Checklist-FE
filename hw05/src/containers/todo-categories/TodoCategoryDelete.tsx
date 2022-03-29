import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import React, { useContext, useEffect, useState } from "react";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import { EPageStatus } from "../../types/EPageStatus";
import Loader from "../../components/Loader";
import { useHistory } from "react-router";

const TodoCategoryDelete = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [todoCategory, setTodoCategory] = useState({} as ITodoCategory);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const history = useHistory();

    const loadData = async () => {
        let result = await BaseService.get<ITodoCategory>("/TodoCategories/", id, appState.token);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setTodoCategory(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteClicked = async (e: Event) => {
        let result = await BaseService.delete<ITodoCategory>("/TodoCategories/", id, appState.token);

        if (result.ok) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            history.replace("/TodoCategories");
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    };

    return (
        <>
            <Loader {...pageStatus} />
            <h1>Delete this todo category?</h1>

            <div>
                <h4>Details</h4>
                <hr />
                <dl className="row">
                    <dt className="col-sm-4">Id</dt>
                    <dd className="col-sm-8">{id}</dd>
                    <dt className="col-sm-4">Category Name</dt>
                    <dd className="col-sm-8">{todoCategory.categoryName}</dd>
                    <dt className="col-sm-4">Category Sort</dt>
                    <dd className="col-sm-8">{todoCategory.categorySort}</dd>
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
                <Link to={"/todocategories"} className="link-secondary">
                    No, back to List
                </Link>
            </div>
        </>
    );
};

export default TodoCategoryDelete;
