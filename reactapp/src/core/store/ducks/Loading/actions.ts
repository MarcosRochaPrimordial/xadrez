import { action } from 'typesafe-actions';
import { LoadingTypes } from './types';

export const showLoading = () => action(LoadingTypes.SHOW);
export const hideLoading = () => action(LoadingTypes.HIDE);
