/**
 * Action types
 */
export enum SearchTypes {
    SEARCH = '@Search/SEARCH',
    PAGINATE = '@Search/PAGINATE',
};

/**
 * Data types
 */
export interface Search {
    searchWord: string;
    pageStart: number;
    pageEnd: number;
}

/**
 * State types
 */
export interface SearchState {
    readonly search: Search;
};