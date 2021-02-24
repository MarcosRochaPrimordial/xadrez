import { action } from 'typesafe-actions';
import { PromptModalTypes } from './types';

export const modalShow = (
    message: string,
    buttonPrimaryLabel: string,
    buttonSecondaryLabel: string,
    buttonPrimaryAction: any,
    buttonSecondaryAction: any
) => action(PromptModalTypes.SHOW, {
    message,
    buttonPrimaryLabel,
    buttonSecondaryLabel,
    buttonPrimaryAction,
    buttonSecondaryAction,
});
export const modalHide = () => action(PromptModalTypes.HIDE);