/**
 * Action Types
 */
export enum AlertModalTypes {
    SHOW = '@AlertModal/SHOW',
    HIDE = '@AlertModal/HIDE',
    PROMPT = '@AlertModal/PROMPT',
};

/**
 * Data Types
 */
export interface AlertModalInfo {
    show: boolean;
    message: string;
    prompt?: boolean;
    buttonPrimaryLabel: string;
    buttonSecondaryLabel?: string;
    buttonPrimaryAction: any;
    buttonSecondaryAction?: any;
};

/**
 * State Types
 */
export interface AlertModalState {
    readonly alertModal: AlertModalInfo;
}