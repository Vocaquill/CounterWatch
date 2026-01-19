export interface ServerError {
    status: number;
    data: {
        status: number;
        errors: Record<string, string[]>;
    };
}

export interface IBaseSearch {
    page: number;
    itemPerPage: number;
}

export interface IPagedResult<T> {
    items: T[];
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
}