import { takeLatest, all, call, put } from 'redux-saga/effects'
import { getCategoriesAndDocuments } from '../../util/firebase/firebase.utils'
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action'
import { CATEGORIES_ACTION_TYPE } from './category.types'


export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories')
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }
}

export function* onFetchCategories(){
    // takeLatest means take latest from action
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    // All is an effect that runs everything inside and only completes when done
    yield all([call(onFetchCategories)])
}