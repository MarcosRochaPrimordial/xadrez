import { action } from 'typesafe-actions';
import { AlertModalTypes } from './types';

export const modalShow = (
    message: string,
    buttonPrimaryLabel: string,
    buttonSecondaryLabel: string,
    buttonPrimaryAction: any,
    buttonSecondaryAction: any
) => action(AlertModalTypes.SHOW, {
    message,
    buttonPrimaryLabel,
    buttonSecondaryLabel,
    buttonPrimaryAction,
    buttonSecondaryAction,
});

export const promptShow = (
    message: string,
    buttonPrimaryLabel: string,
    buttonSecondaryLabel: string,
    buttonPrimaryAction: any,
    buttonSecondaryAction: any
) => action(AlertModalTypes.PROMPT, {
    message,
    buttonPrimaryLabel,
    buttonSecondaryLabel,
    buttonPrimaryAction,
    buttonSecondaryAction,
});

export const modalHide = () => action(AlertModalTypes.HIDE);