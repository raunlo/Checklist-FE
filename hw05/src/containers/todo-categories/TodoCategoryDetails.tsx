import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import React, { useContext, useEffect, useState } from "react";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { BaseService } from "../../services/base-service";
import { AppContext } from "../../context/AppContext";
import { EPageStatus } from "../../types/EPageStatus";
import Loader from "../../components/Loader";

const TodoCategoryDetails = () => {
    const { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);

    const [todoCategory, setTodoCategory] = useState({} as ITodoCategory);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

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

    return (
        <>
            <Loader {...pageStatus} />
            <h1>Details</h1>

            <div>
                <h4>Todo category</h4>
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

            <div>
               <Link to={"/todocategories"} className="link-secondary">Back to List</Link>
            </div>
        </>
    );
};

export default TodoCategoryDetails;
