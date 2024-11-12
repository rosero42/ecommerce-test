import {createSelector} from 'reselect'

const selectCategoryReducer = (state) => state.categories

//Gets back categories array
export const selectCategories = createSelector(
  //input selector
  [selectCategoryReducer],
  //output selector
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const {title, items} = category
    acc[title.toLowerCase()] = items
    return acc
  }, {})
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)