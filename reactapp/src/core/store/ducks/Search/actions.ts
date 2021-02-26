import { action } from "typesafe-actions";
import { SearchTypes } from "./types";

export const searchAction = (searchWord: string) => action(SearchTypes.SEARCH, searchWord);
export const paginateAction = (pageStart: number, pageEnd: number) => action(SearchTypes.PAGINATE, { pageStart, pageEnd });