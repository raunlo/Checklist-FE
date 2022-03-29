export interface ITodoTask {
    id?: string;
    taskName: string;
    taskSort: number;
    todoCategoryId: string;
    todoCategoryName?: string | null;
    todoPriorityId: string;
    todoPriorityName?: string | null;
    isCompleted: boolean;
}
