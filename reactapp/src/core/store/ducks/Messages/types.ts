/**
 * Action Types
 */
export enum MessagesTypes {
    SUCCESS = '@Messages/SUCCESS',
    FAILURE = '@Messages/FAILURE',
    WARNING = '@Messages/WARNING',
    DISMISS = '@Messages/DISMISS',
};

/**
 * Data Types
 */
export enum Variant {
    SUCCESS = 'success',
    FAILURE = 'danger',
    WARNING = 'warning',
    EMPTY = '',
};

export interface Message {
    id: number;
    message: string;
    type: Variant;
}

/**
 * State Types
 */
export interface MessagesState {
    readonly messages: Message[];
};