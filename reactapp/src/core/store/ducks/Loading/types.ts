/**
 * Action Type
 */
export enum LoadingTypes {
    SHOW = '@Loding/show',
    HIDE = '@Loading/hide',
};

/**
 * State Types
 */
export interface LoadingState {
    readonly show: boolean;
};