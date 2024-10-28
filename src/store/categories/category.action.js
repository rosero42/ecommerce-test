import { createAction } from "../../util/reducer/reducer.util";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray)