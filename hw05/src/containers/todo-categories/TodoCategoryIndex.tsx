import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ITodoCategory } from "../../dto/ITodoCategory";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { AppContext } from "../../context/AppContext";
import { TableContainer } from "../../components/TableContainer";
import { ITableHeader } from '../../types/ITableHeader'

const TodoCategoryIndex = () => {
    const appState = useContext(AppContext);

    const [todoCategories, setTodoCategories] = useState([] as ITodoCategory[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const columns: ITableHeader[] = [
        { header: "Category Name", propertyName: "name" },
        { header: "Category Sort", propertyName: "sort" },
    ];

    const createData = (todoCategories: ITodoCategory[]): Array<{[key: string]: string}> => {
        return todoCategories.map((category) => {
            return { name: category.categoryName, sort: String(category.categorySort), id: category.id!};
        });
    };

    const loadData = async () => {
        let result = await BaseService.getAll<ITodoCategory>("/TodoCategories", appState.token);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setTodoCategories(result.data);
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
                <Link to="/todocategories/create/" className="btn btn-dark" role="button">
                    Create new category
                </Link>
            </div>
            <br />
            <h1>Todo Categories</h1>
            <TableContainer data={createData(todoCategories)} columns={columns} objectBaseUrl="todocategories"/>
        </>
    );
};

export default TodoCategoryIndex;
