/**
 * Action Types
 */
export enum MessagesTypes {
    SUCCESS = '@Messages/SUCCES',
    FAILURE = '@Messages/FAILURE',
    WARNING = '@Messages/WARNING',
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