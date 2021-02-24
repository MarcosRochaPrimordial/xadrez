/**
 * Action Types
 */
export enum PromptModalTypes {
    SHOW = '@PromptModal/SHOW',
    HIDE = '@PromptModal/HIDE',
};

/**
 * Data Types
 */
export interface PromptModalInfo {
    show: boolean;
    message: string;
    buttonPrimaryLabel: string;
    buttonSecondaryLabel?: string;
    buttonPrimaryAction: any;
    buttonSecondaryAction?: any;
};

/**
 * State Types
 */
export interface PromptModalState {
    readonly promptModal: PromptModalInfo;
}