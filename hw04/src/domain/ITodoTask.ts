export interface ITodoTask {
    id?: string;
    taskName: string;
    taskSort: number;
    todoCategoryId: string;
    todoCategoryName?: string;
    todoPriorityId: string;
    todoPriorityName?: string;
}
