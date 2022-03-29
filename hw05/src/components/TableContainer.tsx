import { Link } from "react-router-dom";
import { ITableHeader } from "../types/ITableHeader";

export type objectBaseUrl = "todocategories" | "todotasks" | "todopriorities";

const TableContainer = (props: {
    columns: Array<ITableHeader>;
    data: Array<{ [key: string]: string }>;
    objectBaseUrl: objectBaseUrl;
}) => {
    const RowDisplay = (props: {
        todoObject: { [key: string]: string };
        columns: Array<ITableHeader>;
        objectBaseUrl: objectBaseUrl;
    }) => {
        const isTaskAndCompleted = (todoObject: { [key: string]: string }): boolean => {
            const isCompleted = todoObject["isCompleted"];
            return isCompleted && isCompleted === "true" ? true : false;
        };

        const LinkSeperator = () => {
            return <> | </>;
        };

        return (
            <tr className={`${isTaskAndCompleted(props.todoObject) ? "text-secondary strikeout" : ""}`}>
                {props.columns.map((column, index) => {
                    return <td key={index + column.header}>{props.todoObject[column.propertyName]}</td>;
                })}
                <td>
                    <Link to={`/${props.objectBaseUrl}/${props.todoObject.id}`} className="link-dark">
                        Details
                    </Link>
                    <LinkSeperator />
                    <Link to={`/${props.objectBaseUrl}/edit/${props.todoObject.id}`} className="link-dark">
                        Edit
                    </Link>
                    <LinkSeperator />
                    <Link to={`/${props.objectBaseUrl}/delete/${props.todoObject.id}`} className="link-dark">
                        Delete
                    </Link>
                </td>
            </tr>
        );
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {props.columns.map((header) => {
                            return <th key={header.header}>{header.header}</th>;
                        })}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((dataObject: { [key: string]: string }) => (
                        <RowDisplay
                            objectBaseUrl={props.objectBaseUrl}
                            columns={props.columns}
                            todoObject={dataObject}
                            key={dataObject["id"]}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export { TableContainer };
