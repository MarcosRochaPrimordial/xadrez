import { action } from 'typesafe-actions';
import { MessagesTypes } from './types';

export const alertSuccess = (message: string) => action(MessagesTypes.SUCCESS, message);
export const alertFailure = (message: string) => action(MessagesTypes.FAILURE, message);
export const alertWarning = (message: string) => action(MessagesTypes.WARNING, message);